<script>
	// @ts-nocheck
	import ProductCard from '../../components/ProductCard.svelte';
	import { set_site_data } from '../../server/backendUtils';
	import ManageProductForm from '../../components/manageProductForm.svelte';
	import allSocks from '../../global/allItems';
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	let products = [];

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
	let contactInfo = $siteData.contactInfo;
	let textColor = $siteData.textColor;
	let shippingRate = $siteData.shippingRate;
	let taxRate = $siteData.taxRate;
	let emailContact = $siteData.contact.email;

	function handleSiteManagmentSubmit() {
		// Handle form submission here
		// You can access the updated values using the variables above
		console.log('Saving site settings...');

		// call firestore to save the new site settings

		// Update the siteData context with the new values
		siteData.update((data) => {
			return {
				title,
				description,
				primaryColor,
				secondaryColor,
				tirciaryColor,
				backgroundColor,
				contactInfo,
				textColor,
				shippingRate,
				taxRate,
				contact: {
					email: emailContact,
				},
			};
		});
		set_site_data($siteData)
	}

</script>

<main>
	<h1>Site Management</h1>
	<a href="/siteManagement/manageorders">Manage Orders</a>
	<!-- form to manage basic site settings -->
	<form on:submit|preventDefault={handleSiteManagmentSubmit} class="site-form">
		<label for="title">Title:</label>
		<input type="text" id="title" bind:value={title} />

		<label for="description">Description:</label>
		<textarea id="description" bind:value={description} />

		<label for="email">Contact email</label>
		<input type="email" id="email" bind:value={emailContact} />

		<label for="backgroundColor">Background Color(header background):</label>
		<input type="color" id="primaryColor" bind:value={backgroundColor} />

		<label for="primaryColor">Primary Color(header background):</label>
		<input type="color" id="primaryColor" bind:value={primaryColor} />

		<label for="secondaryColor">Secondary Color (main-banner background):</label>
		<input type="color" id="secondaryColor" bind:value={secondaryColor} />

		<label for="tirciaryColor">TirciaryColor Color (product card background):</label>
		<input type="color" id="tirciaryColor" bind:value={tirciaryColor} />

		<label for="textColor">Text Color:</label>
		<input type="color" id="textColor" bind:value={textColor} />

		<label for="shippingRate">Shipping Rate:</label>
		<input type="number" step="0.01" id="shippingRate" bind:value={shippingRate} />

		<label for="taxRate">Tax Rate per $1:</label>
		<input type="number" step="0.01" id="taxRate" bind:value={taxRate} />

		<label for="contactInfo">Contact Information:</label>
		<textarea id="contactInfo" bind:value={contactInfo} />

		<button type="submit">Save</button>
	</form>

	<hr />

	<!-- form to manage products -->
	<ManageProductForm/>
    <hr>
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
