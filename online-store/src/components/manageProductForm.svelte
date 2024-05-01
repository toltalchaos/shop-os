<script>
	// @ts-nocheck
	// Add your script logic here
	import { update_product } from '../server/backendUtils';
	import { writable } from 'svelte/store';
	import CategoryEditDdl from './categoryEditDDL.svelte';
	import ItemImageManager from './itemImageManager.svelte';
	export let product = null;
	const origionalProduct = JSON.parse(JSON.stringify(product));
	let newProduct = false;
	//stores let us offload the logic of managing the state of our data to svelte
	let productCategoryStore = writable([]);
	let itemImageStore = writable([]);
	//if there is no product being passed in, create a new product
	if (!product) {
		newProduct = true;
		product = {
			name: '',
			invintory: 0,
			price: 0.0,
			image: [],
			description: '',
			featured: false,
			category: []
		};
	} else {
		//if there is a product being passed in, set the value of the writable stores to the value of the product
		itemImageStore = writable([product.image]);
		productCategoryStore = writable([...product.category]);
	}
		
	function handleProductSubmit() {
		product.category = $productCategoryStore;
		product.image = [...$itemImageStore];
		update_product(product, origionalProduct);
	}

	function deleteItem() {
		product.category = $productCategoryStore;
		product.image = $itemImageStore;
		update_product(product, true);
	}
</script>

<h2>Products</h2>
<form on:submit|preventDefault={handleProductSubmit} class="new-product-form">
	<div>
		<label for="productName">Product Name:</label>
		<input type="text" id="productName" bind:value={product.name} />
	</div>

	<div>
		<label for="productPrice">Product Price:</label>
		<input type="number" id="productPrice" step="0.01" bind:value={product.price} />
	</div>
	<div>
		<label for="productInvintory">Product Invintory:</label>
		<input type="number" id="productInvintory" bind:value={product.invintory} />
	</div>
	<div>
		<ItemImageManager bind:imageArray={itemImageStore} />
	</div>
	<div>
		<label for="productDescription">Product Description:</label>
		<textarea id="productDescription" bind:value={product.description} />
	</div>
	<div>
		<label for="featured">Featured:</label>
		<input type="checkbox" id="featured" bind:checked={product.featured} />
	</div>
	<div>
		<label for="productCategory">Product Category:</label>
		<CategoryEditDdl bind:categoryArray={productCategoryStore} />
	</div>
	<button type="submit">Submit Product</button>
	{#if !newProduct}
	<button type="submit" on:click={deleteItem}>Delete Product</button>
	{/if}
</form>

<style>
	.new-product-form {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		padding:1rem;
		gap:1rem;
		border: 2px solid black;
		border-radius: 0.5rem;
	}
</style>
