<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import StoreItems from '../global/allItems';
	import productData from '../static/socks.json';

	//if no firestore exists, use the following default values
	const default_settings = {
		title: 'SHOP_OS',
		description: 'Welcome to the future of e-commerce',
		backgroundColor: 'white',
		primaryColor: 'tan',
		secondaryColor: 'grey',
		tirciaryColor: 'grey',
		textColor: 'white',
		contactInfo: 'stuff'
	};
	let title = default_settings.title;
	let description = default_settings.description;
	let backgroundColor = default_settings.backgroundColor; //main background
	let primaryColor = default_settings.primaryColor; // header background
	let secondaryColor = default_settings.secondaryColor; // hero background
	let tirciaryColor = default_settings.tirciaryColor; // product card background
	let textColor = default_settings.textColor; // text color
	let contactInfo = default_settings.contactInfo;

	console.log('initializing the site settings');
	// fetch the site information including colours, titles, descriptions, etc
	// from firestore document

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
	console.log('created writable store for site data');

	setContext('siteData', siteData);
	console.log('set site data context');

	console.log('initializing invintory');
	const products = productData.socks;
	// Update the store with the new products data from the JSON file or API
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
