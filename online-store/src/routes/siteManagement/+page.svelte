<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import ProductCard from '../../components/ProductCard.svelte';
	import { set_site_data } from '../../server/backendUtils';
	import ManageProductForm from '../../components/manageProductForm.svelte';
	import allSocks from '../../global/allItems';
	import { getContext } from 'svelte';
	import SiteDiscounts from './siteDiscounts.svelte';
	const siteData = getContext('siteData');
	let products = [];
	let username = null;
	let password = null;

	allSocks.subscribe((value) => {
		products = value;
	});
	let searchValue = '';
	let displayedProducts = products;

	function handleSearch(event) {
		searchValue = event.target.value.toLowerCase();
		displayedProducts = filterProducts(products);
	}

	function filterProducts(products) {
		return products.filter((product) => {
			const productName = product.name.toLowerCase().includes(searchValue);
			return productName;
		});
	}

	let title = $siteData.title;
	let description = $siteData.description;
	let primaryColor = $siteData.primaryColor;
	let secondaryColor = $siteData.secondaryColor;
	let tirciaryColor = $siteData.tirciaryColor;
	let backgroundColor = $siteData.backgroundColor;
	// let contactInfo = $siteData.contactInfo;
	let textColor = $siteData.textColor;
	let shippingRate = $siteData.shippingRate;
	let taxRate = $siteData.taxRate;
	let emailContact = $siteData.contact.email;
	let paymentEmail = $siteData.contact.paymentEmail;
	let storeLocation = $siteData.storeLocation;

	function handleSiteManagmentSubmit() {
		// Update the siteData context with the new values
		siteData.update((data) => {
			return {
				title,
				description,
				primaryColor,
				secondaryColor,
				tirciaryColor,
				backgroundColor,
				// contactInfo,
				textColor,
				shippingRate,
				taxRate,
				contact: {
					email: emailContact,
					paymentEmail: paymentEmail
				},
				storeLocation
			};
		});
		let resp = set_site_data($siteData, username, password);
		if (resp == 'ERROR') {
			alert('Error saving site settings');
			return;
		}
		alert('Site settings saved');
	}

	onMount(async () => {
		if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
			window.location.href = '/login';
		}
		// Check if the user has been logged in for more than an hour
		if (localStorage.getItem('loginTime') < new Date().getTime() - 3600000) {
			window.location.href = '/login';
			localStorage.clear();
		} else {
			username = localStorage.getItem('username');
			password = localStorage.getItem('password');
		}
	});
</script>

<main>
	<h1>Site Management</h1>
	<div class="management-btns">
		<a href="/siteManagement/manageorders">Manage Orders</a>
	</div>
	<!-- form to manage basic site settings -->
	<form on:submit|preventDefault={handleSiteManagmentSubmit} class="site-form">
		<label for="title">Title:</label>
		<input type="text" id="title" bind:value={title} />

		<label for="description">Description:</label>
		<textarea id="description" bind:value={description} />

		<label for="storeLocation">Store Location:</label>
		<input
			type="text"
			id="storeLocation"
			bind:value={storeLocation}
			placeholder="Anytown, Canada"
		/>

		<label for="backgroundColor">Background Color:</label>
		<input type="color" id="primaryColor" bind:value={backgroundColor} />

		<label for="primaryColor">Primary Color(header background):</label>
		<input type="color" id="primaryColor" bind:value={primaryColor} />

		<label for="secondaryColor">Secondary Color (banners + cards):</label>
		<input type="color" id="secondaryColor" bind:value={secondaryColor} />

		<label for="tirciaryColor">TirciaryColor Color (buttons):</label>
		<input type="color" id="tirciaryColor" bind:value={tirciaryColor} />

		<label for="textColor">Text Color:</label>
		<input type="color" id="textColor" bind:value={textColor} />

		<label for="shippingRate"
			>Shipping Rate (standard flat rate shipping in a $ amount to be calculated at checkout):</label
		>
		<input type="number" step="0.01" id="shippingRate" bind:value={shippingRate} />

		<label for="taxRate">Tax Rate, per $1:</label>
		<input type="number" step="0.01" id="taxRate" bind:value={taxRate} />
		<!-- 
		<label for="contactInfo">Contact Information:</label>
		<textarea id="contactInfo" bind:value={contactInfo} /> -->

		<p>
			the following E-mail is for contact purposes and can be the same as payment or the automatic
			emailing system if you wish. currently the automatic emailing system is sending emails from {env.PUBLIC_SENDER_GMAIL}
		</p>
		<label for="email">Contact email
		<input type="email" id="email" bind:value={emailContact} /></label>

		<p>the following E-mail is the address the users will be instructed to E-transfer</p>
		<label for="paymentEmail">Payment email
		<input type="email" id="paymentEmail" bind:value={paymentEmail} /></label>
		<button type="submit">Save Site Settings</button>
	</form>

	<hr />
	<!-- site discounts component -->
	<SiteDiscounts {username} {password} />
	<hr />
	<!-- form to manage products -->
	 <h2>Add New Product</h2>
	<ManageProductForm />
	<hr />
	<!-- search bar -->
	<input type="text" placeholder="Search products" on:input={handleSearch} />
	<div class="product-list">
		{#each displayedProducts as product}
			<ProductCard {product} editable={true} />
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}
	.site-form {
		margin-bottom: 2rem;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border: 2px solid black;
		border-radius: 0.5rem;
	}

	.product-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		margin-top: 2rem;
	}
</style>
