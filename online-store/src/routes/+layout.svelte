<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Footer from '../components/footer.svelte';
	import Header from '../components/header.svelte';
	import allItems from '../global/allItems';
	import productData from '../static/socks.json';

	function initSocks() {
		const products = productData.socks;
		// Or you can fetch the product data from an API using a library like axios
		// import axios from 'axios';
		// let products = [];
		// axios.get('/api/products')
		//   .then(response => {
		//     products = response.data;
		//   })
		//   .catch(error => {
		//     console.error(error);
		//   });
		allItems.update(items => [...items, ...products]);
	}

	onMount(initSocks());
</script>

<div>
	<Header />
	<slot />
	<Footer />
</div>
