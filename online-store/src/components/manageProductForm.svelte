<script>
	// @ts-nocheck
	// Add your script logic here
	import { update_product } from '../server/backendUtils';
	import { writable } from 'svelte/store';
	import CategoryEditDdl from './categoryEditDDL.svelte';
	import ItemImageManager from './itemImageManager.svelte';
	let selected = false;
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
			product_id: null,
			name: '',
			inventory: 0,
			price: 0.0,
			image: [],
			description: '',
			featured: false,
			category: []
		};
	} else {
		//if there is a product being passed in, set the value of the writable stores to the value of the product
		itemImageStore = writable([...product.image]);
		productCategoryStore = writable([...product.category]);
	}

	async function handleProductSubmit() {
		product.category = $productCategoryStore;
		product.image = $itemImageStore;
		let resp = await update_product(
			product,
			origionalProduct,
			false,
			localStorage.getItem('username'),
			localStorage.getItem('password')
		);
		if(resp == 'ERROR'){
			alert('Error updating product');
		}else{
			if (confirm('item successfully updated')) {
					window.location.reload();
				}
		}
	}

	async function deleteItem() {
		let resp = update_product(
			origionalProduct,
			null,
			true,
			localStorage.getItem('username'),
			localStorage.getItem('password')
		);
		if(resp == 'ERROR'){
			alert('Error deleting product');
		}else{
		window.location.reload();
		}
	}
</script>

<h2>Product Details</h2>
{#if selected}
<button on:click={()=>{selected = !selected}}>Click to collapse</button>
<br/>

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
		<label for="productinventory">Product inventory:</label>
		<input type="number" id="productinventory" bind:value={product.inventory} />
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
		<button type="button" on:click={deleteItem}>Delete Product</button>
	{/if}
</form>
{:else}
<button on:click={()=>{selected = !selected}}>Click to edit</button>
{/if}

<style>
	.new-product-form {
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
		border: 2px solid black;
		border-radius: 0.5rem;
	}
</style>
