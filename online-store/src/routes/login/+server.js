// auth stuff here to get and set cookies
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
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// Import the necessary dependencies

// Define the Firebase configuration
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
// const firestoreApp = getFirestore(app);
const auth = getAuth(app);

export async function POST(requestEvent) {
    const username = await requestEvent.request.headers.get("username");
	const password = await requestEvent.request.headers.get("password");
    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password);
        const user = userCredential.user;
        return new Response(JSON.stringify(user));
    } catch (error) {
        return new Response("ERROR", { status: 500 });
    }
}