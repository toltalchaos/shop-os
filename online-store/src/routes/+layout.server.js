// @ts-nocheck
import { get_site_data, get_all_products } from '../server/backendUtils';
import {
	PRIVATE_FIREBASE_API_KEY,
	PRIVATE_FIREBASE_AUTH_DOMAIN,
	PRIVATE_FIREBASE_PROJECT_ID,
	PRIVATE_FIREBASE_STORAGE_BUCKET,
	PRIVATE_FIREBASE_MESSAGING_SENDER_ID,
	PRIVATE_FIREBASE_APP_ID,
	PRIVATE_FIREBASE_MEASUREMENT_ID
} from '$env/static/private';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
	apiKey: PRIVATE_FIREBASE_API_KEY,
	authDomain: PRIVATE_FIREBASE_AUTH_DOMAIN,
	projectId: PRIVATE_FIREBASE_PROJECT_ID,
	storageBucket: PRIVATE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PRIVATE_FIREBASE_MESSAGING_SENDER_ID,
	appId: PRIVATE_FIREBASE_APP_ID,
	measurementId: PRIVATE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbref = ref(db);


export async function load() {
    let productData = await get(child(dbref, 'products'));
    if (productData.exists()) {
        productData = JSON.stringify(productData.val()), { status: 200 };
    } else {
        productData = get_all_products();
    };
    let siteData = await get(child(dbref, 'site_data'));
    if (siteData.exists()) {
        siteData = JSON.stringify(siteData.val()), { status: 200 };
    } else {
        siteData = get_site_data();
    };;
  
    // const orderData =
    return {
         productData,
         siteData
    };
}
