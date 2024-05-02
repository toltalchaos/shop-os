// @ts-nocheck
import { assign } from 'svelte/internal';
import productData from '../static/socks.json';
import { manageInvintoryAndCartCount, sanitizeCartData } from './utils';
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
		contactInfo: 'stuff',
		shippingRate: 10,
		taxRate: 0.05,
		contact: { email: 'someEmail' }
	};
	return default_settings;
}
async function set_site_data(newSiteData) {
	console.log('setting site data', newSiteData);
	//this function to set all the site data and return the required json content to our webpage
	//this will be used to update the site data in the database
	//make call here
	newSiteData = await fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'entity': 'site_data'
		},
		body: JSON.stringify(newSiteData)
	});
	return newSiteData;
}

//product operations
async function get_all_products() {
//wireframe nonsense for testing	
	return productData.socks;
}
async function get_single_product(product_id) {
	//get the product by the product_id
	console.log('getting product by id', product_id);
	//make call here - if nothing return empty array
	const response = await fetch('/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'entity': 'product'
		},
		body: JSON.stringify({ product_id: product_id })
	});
	return productData.socks[0];
}
async function update_product(newproductData, origionalproductData, isDelete = false) {
	//this function will update the products in the database
	//if isDelete is true, then the product will be deleted
	//get the existing products, look for the product to update, update the product, and then set the products
	//if there is no product to update, then add the product to the list, and then set the products
	if (isDelete) {
		//delete the product
		await fetch('/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'entity': 'product'
			},
			body: JSON.stringify(newproductData)
		});
	}
	if (origionalproductData === newproductData) {
		//update the product
		await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'entity': 'product'
			},
			body: JSON.stringify(newproductData)
		});
	}
	else {
	//assign the product a new ID
	let product_id = newproductData.name + Math.random().toString(36).substring(7);
	newproductData.product_id = product_id;
	//add the product
	await fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'entity': 'product'
		},
		body: JSON.stringify(newproductData)
	});
}

}

//order operations
async function create_order(orderInfo) {
	try {
		const newID = orderInfo.customerName + '-' + Math.random().toString(36).substring(7);
		let order = {
			order_id: newID,
			orderData: { ...orderInfo },
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
		//update the product invintory
		const updatedItems = manageInvintoryAndCartCount(orderInfo.items);
		const sanitizedProducts = sanitizeCartData(orderInfo.items);

		for (const item in updatedItems) {
			update_product(updatedItems[item], sanitizedProducts[item], false);
		}
		//make call to firestore to make the order here...
		//first call to create order
		await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'entity': 'order'
			},
			body: JSON.stringify(order)
		});
		//then call to update the product invintory
		//email the user the order confirmation...
		await fetch('/emails/newOrder', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(order)
		});
		return order;
	} catch (err) {
		console.error('Failed to submit order:', err);
	}
}
async function get_order_details(order_id) {
		const orderResponse = await fetch('/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'entity': 'order',
				'order_id': order_id,
			},
		});
		return await orderResponse.json();
}
async function set_order_status(orderData) {
	//we want to update the order status of the order that was placed given the order_id
	//this will add a new item to the array of statuses on the order
	await fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'entity': 'order'
		},
		body: JSON.stringify(orderData)
	});
	//this should also send an email to the user with the updated status
	await fetch('/emails/orderUpdate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(orderData)
	});
}

// authenticate user
async function authenticate_user(user) {
	console.log('authenticating user');
	return true;
}

export {
	get_site_data,
	set_site_data,
	get_all_products,
	get_single_product,
	update_product,
	create_order,
	get_order_details,
	set_order_status,
	authenticate_user
};
