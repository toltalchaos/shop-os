<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import StoreItems from '../global/allItems';
	import productData from '../static/socks.json';

	//if no firestore data exists, use the following default values
	const default_settings = {//keeping this seperate in case we need to change the default values or move them
		title: 'SHOP_OS',
		description: 'Welcome to the future of e-commerce for small business',
		backgroundColor: 'white',
		primaryColor: 'tan',
		secondaryColor: 'cornsilk',
		tirciaryColor: '#A9A9',
		textColor: 'brown',
		contactInfo: 'stuff'
	};

	let {
		title,
		description,
		backgroundColor,
		primaryColor,
		secondaryColor,
		tirciaryColor,
		textColor,
		contactInfo
	} = default_settings;

	// fetch the site information including colours, titles, descriptions, etc
	// from firestore document docs here https://firebase.google.com/docs/firestore/quickstart

	// if no firestore exists, use the default values
	const siteData = writable({
		title: title,
		description: description,
		backgroundColor: backgroundColor,
		primaryColor: primaryColor,
		secondaryColor: secondaryColor,
		tirciaryColor: tirciaryColor,
		textColor: textColor,
		contactInfo: contactInfo
	});

	setContext('siteData', siteData);

	//use firebase to get the data from the RTDB or Firestore in json format (images may need special attention)
	const products = productData.socks;
	
	StoreItems.update((items) => [...items, ...products]);
</script>

<div>
	<Header />
	<slot />
	<Footer />
</div>

<style>
	/* reset css styles */
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: Arial, sans-serif;
	}
</style>
