<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import cartItems from '../global/cartItems';
	import { getContext } from 'svelte';
	import ImgCarousel from './imgCarousel.svelte';
	const siteData = getContext('siteData');
	export let product;
	export let editable = false;

  //add functionality to make the selected card larger by seeing if it has "focus"?
  let selected = false;

	// Add the product to the cart on button click
	function addToCart() {
		const isDuplicate = $cartItems.some((item) => item.id === product.id);
		if (!isDuplicate) {
			cartItems.update((items) => [...items, product]);
		}
	}
</script>

<div class="product-card" style="background-color: {$siteData.secondaryColor}; ">
	<ImgCarousel images={product.image} interval=5000 />
	<h2>{product.name}</h2>
	<p style="color: {$siteData.textColor};">${product.price}</p>
	{#if editable}
		<!-- Form code here -->
		<p>EDITABLE FORM WILL GO HERE</p>
	{:else}
		<button
			style="color: {$siteData.textColor}; background-color: {$siteData.tirciaryColor};"
			class:disabled={$cartItems.some((item) => item.id === product.id)}
			on:click={addToCart}
		>
			{$cartItems.some((item) => item.id === product.id) ? 'Already in Cart' : 'Add to Cart'}
		</button>
	{/if}
</div>

<style>
	.product-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 300px;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}

	.product-card img {
		width: 100%;
		margin-bottom: 1rem;
	}

	.product-card h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.product-card p {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	.product-card button {
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 1rem;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.product-card button:hover {
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
	}

	.product-card button.disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
</style>
