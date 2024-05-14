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
import { PUBLIC_USER_EMAIL, PUBLIC_USER_PASSWORD } from '$env/static/public';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);
const auth = getAuth(app);

export async function load() {
	let productData = await signInWithEmailAndPassword(
		auth,
		PUBLIC_USER_EMAIL,
		PUBLIC_USER_PASSWORD
	).then(async (userCredential) => {
		let response = await get(child(dbref, 'products'));
		return response;
	});

	if (productData.exists()) {
		productData = Object.values(productData.val());
	} else {
		//defaults
		productData = get_all_products();
	}
	let siteData = await signInWithEmailAndPassword(
		auth,
		PUBLIC_USER_EMAIL,
		PUBLIC_USER_PASSWORD
	).then(async (userCredential) => {
		let response = await get(child(dbref, 'site_data'));
		return response;
	});

	if (siteData.exists()) {
		siteData = siteData.val();
	} else {
		//defaults
		siteData = get_site_data();
	}

	return {
		productData,
		siteData
	};
}
