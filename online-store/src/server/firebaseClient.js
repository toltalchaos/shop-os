// @ts-nocheck
import productData from '../static/socks.json';
// create a client to connect and send/recieve requests to firebase

//operations needed.

// get site data
async function get_site_data() {
	console.log('getting site data');
	//this function to get all the site data and return the required json content to our webpage
	const default_settings = {
		title: 'SHOP_OS',
		description: 'Welcome to the future of e-commerce for small business',
		backgroundColor: 'white',
		primaryColor: 'tan',
		secondaryColor: 'cornsilk',
		tirciaryColor: '#A9A9',
		textColor: 'brown',
		contactInfo: 'stuff'
	};

	//make call to firestore here...
	return default_settings;
}
async function set_site_data(newSiteData) {
    console.log('setting site data', newSiteData);
    //this function to set all the site data and return the required json content to our webpage
}

// get products
async function get_all_products() {
	console.log('getting all products');
	//make call here
	return productData.socks;
}
async function create_order(orderData) {
	try {
		console.log('creating order', orderData);
		//make call to firestore here...
		//return order_id
		return 1;
	} catch (err) {
		console.error('Failed to submit order:', err);
	}
}
// get order status
async function get_order_status(order_id) {
	//we want to get the most recent order status update of the order that was placed given the order_id
	//the idea is to have an array associated to a given ID that contains all the order status updates ordered by date
	console.log('getting order status');
	return {
		order_id: 1,
		status: 'shipped',
		comments: 'order has been shipped',
		tracking_number: '1234567890',
		shipping_carrier: 'USPS',
		shipping_date: '2021-01-01',
		link: 'https://www.usps.com/1234567890',
		update_time: '2021-01-01'
	};
}
// update order status
async function set_order_status(orderData) {
	//we want to update the order status of the order that was placed given the order_id
	//this will add a new item to the array of orders by the associated ID
	console.log('updating order status', orderData);
}

// update site data
async function update_site_data(siteData) {
	console.log('updating site data', siteData);
}

// update products ->
async function update_products(productData, isDelete = false) {
	//this function will update the products in the database
	//if isDelete is true, then the product will be deleted
	//get the existing products, look for the product to update, update the product, and then set the products
	//if there is no product to update, then add the product to the list, and then set the products
	console.log('updating products', productData, isDelete);
	return;
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
	create_order,
	get_order_status,
	set_order_status,
	update_site_data,
	update_products,
	authenticate_user
};
