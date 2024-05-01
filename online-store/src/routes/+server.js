// @ts-nocheck
import {
	PRIVATE_FIREBASE_API_KEY,
	PRIVATE_FIREBASE_AUTH_DOMAIN,
	PRIVATE_FIREBASE_PROJECT_ID,
	PRIVATE_FIREBASE_STORAGE_BUCKET,
	PRIVATE_FIREBASE_MESSAGING_SENDER_ID,
	PRIVATE_FIREBASE_APP_ID,
	PRIVATE_FIREBASE_MEASUREMENT_ID
} from '$env/static/private';
//here is our internal reference to the database we expect all internal api calls to be made through this server
//this is the server that will handle all the internal api calls
//we expect in the headers to recieve what storage entity we want to interact with (products, orders, etc)
//we expect in the body to recieve the data we want to interact with
//we expect in the method to recieve the action we want to take (GET, POST, PUT, DELETE)

//we will use private env settings to make the connections so it will not be exposed to the client
// svelekit docs on private settings in the server here: https://learn.svelte.dev/tutorial/env-static-private

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getDatabase, ref, set, child, get } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: PRIVATE_FIREBASE_API_KEY,
	authDomain: PRIVATE_FIREBASE_AUTH_DOMAIN,
	projectId: PRIVATE_FIREBASE_PROJECT_ID,
	storageBucket: PRIVATE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PRIVATE_FIREBASE_MESSAGING_SENDER_ID,
	appId: PRIVATE_FIREBASE_APP_ID,
	measurementId: PRIVATE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestoreApp = getFirestore(app);
const db = getDatabase(app);

export async function POST(requestEvent) {
	const entity = await requestEvent.request.headers.get('entity');
	switch (entity) {
		case 'order':
			const order = await requestEvent.request.json();
			console.log('order to be submitted', order);
			set(ref(db, 'orders/' + order.order_id), order);
			return new Response('Order created', { status: 200 });
		default:
			return new Response('Invalid entity', { status: 400 });
	}
}

export async function GET(requestEvent) {
	const entity = await requestEvent.request.headers.get('entity');
    const dbref = ref(db)
	switch (entity) {
		case 'order':
			const order_id = await requestEvent.request.headers.get('order_id');
			const email = await requestEvent.request.headers.get('email');
			const order = await get(child(dbref, 'orders/' + order_id));
            if(order.exists()){
                return new Response(JSON.stringify(order.val()), { status: 200 });
            } else {
                return new Response('Order not found', { status: 404 });
            }
	}
}

export async function DELETE(requestEvent) {}
