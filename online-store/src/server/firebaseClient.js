	// @ts-nocheck
import productData from '../static/socks.json';
// create a client to connect and send/recieve requests to firebase

//operations needed.

    // get site data
async function get_site_data(){
    console.log('getting site data')
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
    return default_settings
}
    // get products
async function get_all_products(){
    console.log('getting all products')
    //make call here
    return productData.socks
}

    // get order status
async function get_order_status(){
    console.log('getting order status')
}

    // update site data
async function update_site_data(siteData){
    console.log('updating site data')
}

    // update products -> 
async function update_products(productData, isDelete=false){
    if(!Array.isArray(productData)){
        console.log('product data is not an array', 'updating products')
        return
    }
    console.log('updating products')
    return 
}

    // update order status
async function update_order_status(orderData){
    console.log('updating order status')
}

    // authenticate user
async function authenticate_user(user){
    console.log('authenticating user')
    return true;
}


export {get_site_data, get_all_products, get_order_status, update_site_data, update_products, update_order_status, authenticate_user}