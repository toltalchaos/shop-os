<script>
	// @ts-nocheck
	import ProductCard from './ProductCard.svelte';
    import { getContext } from 'svelte';
  const siteData = getContext('siteData');
	export let products;

	let categoryFilter = '';
    let displayedProducts = products;

	function checkArrayItems(accArray, categoryArray) {
		//if the accumulator array is empty, return the category array
		if (!accArray) {
			return categoryArray;
		}
		// check if the category array has items belonging to the accumulator array
		let items = categoryArray.filter((item) => {
			return accArray.includes(item);
		});
		//remove the items from the category array rhe belong to the accumulator array
		let newCategoryArray = categoryArray.filter((item) => {
			return !items.includes(item);
		});
		//return the new category array
		return newCategoryArray;
	}

	//sort the products by product.category into individual arrays of products by the category as a key
	let productsByCategory = products.reduce((acc, product) => {
		//check if the category on this product exists in the accumulator
		product.category = product.category ? product.category : []; //handling undefined category
		let newCategories = checkArrayItems(Object.keys(acc), product.category);
		for (let category of newCategories) {
			acc[category] = [];
		}
		if (newCategories) {
			//if it doesn't exist, create an array with the category as the key
			for (let category of newCategories) {
				acc[category] = [];
			}
		}
		//push the product into the array with the category as the key
		for (let category of product.category) {
			acc[category].push(product);
		}
		delete acc.undefined; //keep undefined from being a category
		return acc;
	}, {});

	function onCategoryClick(category) {
		if (category === categoryFilter) {
			categoryFilter = '';
			displayedProducts = products;
			return;
		}
		categoryFilter = category;
		displayedProducts = productsByCategory[category];
	}
</script>

<div class="container">
	<div class="category-buttons">
		{#each Object.keys(productsByCategory) as category}
			<button
				on:click={() => onCategoryClick(category)}
                style= "color: {$siteData.textColor}; background-color: {$siteData.primaryColor}; {categoryFilter === category ? 'opacity: 0.5' : ''}"
			>
				<h2>{category}</h2>
			</button>
		{/each}
      
	</div>
    {#if categoryFilter}
	<div class="product-list">
		{#each displayedProducts as product}
			<ProductCard {product} />
		{/each}
	</div>
    {/if}
</div>

<style>
    .category-buttons {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .category-buttons button{
        width: 100%;
    }
	.container {
        margin-top: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
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
