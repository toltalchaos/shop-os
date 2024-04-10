<script>
	// @ts-nocheck
    import { getExistingCategories } from '../lib/productHelpers';
	import ProductCard from './ProductCard.svelte';
    import { getContext } from 'svelte';
  const siteData = getContext('siteData');
	export let products;

	let categoryFilter = '';
    let displayedProducts = products;
    let productsByCategory = getExistingCategories(products);

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
