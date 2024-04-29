import { get_site_data, get_all_products } from '../server/firebaseClient';

export async function load() {
    const productData = await get_all_products();
    const siteData = await get_site_data();
  
    // const orderData =
    return {
         productData,
         siteData
    };
}