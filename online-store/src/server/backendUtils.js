// @ts-nocheck
import productData from '../static/socks.json';
import { manageinventoryAndCartCount, sanitizeCartData, sanitizeOrderData } from './utils';
//site operations
async function get_site_data() {
	const default_settings = {
		title: 'SHOP_OS',
		description: 'Welcome to the future of e-commerce for small business',
		backgroundColor: 'cornflowerblue',
		primaryColor: 'tan',
		secondaryColor: 'cornsilk',
		tirciaryColor: '#A9A9',
		textColor: 'brown',
		// contactInfo: 'stuff',
		shippingRate: 10,
		taxRate: 0.05,
		storeLocation: '1234 Main St, Anytown, USA',
		contact: { email: 'someEmail' }
	};
	return default_settings;
}
async function set_site_data(newSiteData, username, password) {
	console.log('setting site data', newSiteData);
	//this function to set all the site data and return the required json content to our webpage
	//this will be used to update the site data in the database
	//make call here
	try {
		newSiteData = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				entity: 'site_data',
				username: username,
				password: password
			},
			body: JSON.stringify(newSiteData)
		});
		if (newSiteData.ok === true) {
			return await newSiteData.text();
		}
		return newSiteData;
	} catch (err) {
		console.error('Failed to submit order:', err);
		return 'ERROR';
	}
}

//product operations
async function get_all_products() {
	//wireframe nonsense for testing
	return productData.items;
}
async function update_product(
	newproductData,
	origionalproductData,
	isDelete = false,
	username = null,
	password = null
) {
	//this function will update the products in the database
	//if isDelete is true, then the product will be deleted
	//get the existing products, look for the product to update, update the product, and then set the products
	//if there is no product to update, then add the product to the list, and then set the products
	let updateResponse = null;
	try {
		if (isDelete) {
			console.log('deleting product', newproductData);
			//delete the product
			updateResponse = await fetch('/', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					entity: 'product',
					product_id: newproductData.product_id,
					username: username,
					password: password
				}
			});
		} else if (
			origionalproductData &&
			origionalproductData.product_id === newproductData.product_id &&
			!isDelete
		) {
			//update the product
			updateResponse = await fetch('/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					entity: 'product',
					username: username,
					password: password
				},
				body: JSON.stringify(newproductData)
			});
		} else {
			//assign the product a new ID
			let product_id = newproductData.name + Math.random().toString(36).substring(7);
			newproductData.product_id = product_id;
			//add the product
			updateResponse = await fetch('/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					entity: 'product',
					username: username,
					password: password
				},
				body: JSON.stringify(newproductData)
			});
		}
		if (!updateResponse.ok) {
			throw new Error('Failed to update product:', await updateResponse.text());
		}
	} catch (err) {
		console.error('Failed to submit order:', err);
		return 'ERROR';
	}
}

//order operations
async function create_order(orderInfo, paymentEmail) {
	try {
		//update the product inventory
		const updatedItems = manageinventoryAndCartCount(orderInfo.items);
		const sanitizedProducts = sanitizeCartData(orderInfo.items);
		//create the order object
		const newID =
			orderInfo.customerName.replace(/[.#$\[\]\s]/g, '').toUpperCase() +
			'-' +
			Math.random().toString(36).substring(7);
		let order = {
			order_id: newID,
			orderData: { ...sanitizeOrderData(orderInfo) },
			status: [
				{
					order_id: newID,
					status: 'payment pending',
					comments: 'order has been submitted',
					tracking_number: '',
					shipping_carrier: '',
					shipping_date: '',
					link: '',
					update_time: new Date().toISOString()
				}
			]
		};
		for (const item in updatedItems) {
			let productUpdate = await update_product(updatedItems[item], sanitizedProducts[item], false);
			if (productUpdate === 'ERROR') {
				throw new Error('Failed to update product:', updatedItems[item]);
			}
		}
		//make call to firestore to make the order here...
		//first call to create order
		let resp = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				entity: 'order'
			},
			body: JSON.stringify(order)
		});
		//then call to update the product inventory
		//email the user the order confirmation...
		if (resp.ok === true) {
			let email = await fetch('/emails/newOrder', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ order, paymentEmail })
			});
			if (email.ok === true) {
				return order;
			} else {
				throw new Error('Failed to send order confirmation email:', await email.text());
			}
		}
	} catch (err) {
		console.error('Failed to submit order:', err);
		return 'ERROR';
	}
}
async function get_order_details(order_id) {
	const orderResponse = await fetch('/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			entity: 'order',
			order_id: order_id
		}
	});
	const resp = await orderResponse;
	if (resp.ok === true) {
		return await resp.json();
	} else {
		return 'Order not found';
	}
}
async function set_order_status(orderData, username, password) {
	//we want to update the order status of the order that was placed given the order_id
	//this will add a new item to the array of statuses on the order
	try {
		let resp = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				entity: 'order',
				username: username,
				password: password
			},
			body: JSON.stringify(orderData)
		});
		if (resp.ok === true) {
			//this should also send an email to the user with the updated status
			let email = await fetch('/emails/orderUpdate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(orderData)
			});
			if (email.ok !== true) {
				throw new Error('Failed to send order update email:', await resp.text());
			}
		} else {
			throw new Error('Failed to update order:', await resp.text());
		}
	} catch (err) {
		console.error('Failed to submit order:', err);
		return 'ERROR';
	}
}

//discount operations
async function get_discounts(username, password) {
	//make call here
	const discounts = await fetch('/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			entity: 'discount',
			username: username,
			password: password
		}
	});
	if (discounts.ok === true) {
		return Object.values(await discounts.json());
	} else {
		console.error('Failed to get discounts:', await discounts.text());
		return 'ERROR';
	}
}
async function set_discount(discountData, username, password) {
	const newDiscount = await fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			entity: 'discount',
			username: username,
			password: password
		},
		body: JSON.stringify(discountData)
	});
	if (newDiscount.ok === true) {
		return await newDiscount.text();
	} else {
		console.error('Failed to get discounts:', await newDiscount.text());
		return 'ERROR';
	}
}
async function delete_discount(discountData, username, password) {
	const deletedDiscount = await fetch('/', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			entity: 'discount',
			discount_id: discountData.discount_id,
			username: username,
			password: password
		},
		body: JSON.stringify(discountData)
	});
	if (deletedDiscount.ok === true) {
		return await deletedDiscount.text();
	} else {
		console.error('Failed to delete discount:', await deletedDiscount.text());
		return 'ERROR';
	}
}
async function lookup_discount(discountCode) {
	//make call here
	const discount = await fetch('/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			entity: 'discount',
			discount_id: discountCode
		}
	});
	if (discount.ok === true) {
		return await discount.json();
	} else {
		console.error('Failed to get discounts:', await discount.text());
		return 'ERROR';
	}
}

export {
	get_site_data,
	set_site_data,
	get_all_products,
	update_product,
	create_order,
	get_order_details,
	set_order_status,
	get_discounts,
	set_discount,
	delete_discount,
	lookup_discount
};
