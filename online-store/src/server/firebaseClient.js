
import productData from '../static/socks.json';
// create a client to connect and send/recieve requests to firebase

//operations needed.

    // get site data
async function get_site_data(){
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
    //make call here
    return productData.socks
}

    // get order status

    // update site data

    // update products -> 

    // update order status

    // authenticate user


export {get_site_data, get_all_products}