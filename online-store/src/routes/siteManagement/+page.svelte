<script>
	// @ts-nocheck
	import ProductCard from '../../components/ProductCard.svelte';
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
				textColor
			};
		});
	}

	let productName = '';
	let productDescription = '';
	let productPrice = '';
	let productImage = '';
	let featured = false;

	function handleProductSubmit() {
		// Handle form submission here
		// You can access the updated values using the variables above
	}
</script>

<main>
	<h1>Site Management</h1>
	<!-- form to manage basic site settings -->
	<form on:submit|preventDefault={handleSiteManagmentSubmit} class="site-form">
		<label for="title">Title:</label>
		<input type="text" id="title" bind:value={title} />

		<label for="description">Description:</label>
		<textarea id="description" bind:value={description} />

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

		<label for="contactInfo">Contact Information:</label>
		<textarea id="contactInfo" bind:value={contactInfo} />

		<button type="submit">Save</button>
	</form>

	<hr />

	<!-- form to manage products -->
	<h2>Products</h2>
	<form on:submit|preventDefault={handleProductSubmit} class="new-product-form">
		<div>
			<label for="productName">Product Name:</label>
			<input type="text" id="productName" bind:value={productName} />
		</div>

		<div>
			<label for="productPrice">Product Price:</label>
			<input type="number" id="productPrice" bind:value={productPrice} />
		</div>
		<div>
			<label for="productImage">Product Image:</label>
			<input type="file" id="productImage" bind:value={productImage} />
		</div>
		<div>
			<label for="productDescription">Product Description:</label>
			<textarea id="productDescription" bind:value={productDescription} />
		</div>
		<div>
			<label for="featured">Featured:</label>
			<input type="checkbox" id="featured" bind:checked={featured} />
		</div>
		<button type="submit">Add Product</button>
	</form>
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
	/* Add your custom styles here */
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
	.new-product-form {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
        padding: 2rem;
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
