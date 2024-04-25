<script>
	// @ts-nocheck
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import StoreItems from '../global/allItems';

	export let data //get the async data from our server file

	let {
		title,
		description,
		backgroundColor,
		primaryColor,
		secondaryColor,
		tirciaryColor,
		textColor,
		contactInfo,
		shippingRate,
		taxRate,
	} = data.siteData;

	const siteDataWritable = writable({
		title: title,
		description: description,
		backgroundColor: backgroundColor,
		primaryColor: primaryColor,
		secondaryColor: secondaryColor,
		tirciaryColor: tirciaryColor,
		textColor: textColor,
		contactInfo: contactInfo,
		shippingRate: shippingRate,
		taxRate: taxRate,
	});

	setContext('siteData', siteDataWritable);
	StoreItems.update((items) => [...items, ...data.productData]);
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
