<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import cartItems from '../global/cartItems';
	import { getContext } from 'svelte';
	import ImgCarousel from './imgCarousel.svelte';
	import ManageProductForm from './manageProductForm.svelte';
	const siteData = getContext('siteData');
	export let product;
	export let editable = false;

	//add functionality to make the selected card larger by seeing if it has "focus"?
	let selected = false;
	// Add the product to the cart on button click
	function addToCart(event) {
		flop(event);
		const isDuplicate = $cartItems.some((item) => item.product_id === product.product_id);
		if (!isDuplicate) {
			product.cart_quantity = 1;
			cartItems.update((items) => [...items, product]);
		}
	}

	function flop(event) {
		if (!editable) {
			if (!selected) {
				event.target.focus();
				selected = true;
			} else {
				if(event.target.tagName !== 'IMG'){
					event.target.blur();
					selected = false;
				}
			}
		}
	}
</script>

<div
	class="product-card"
	style="background-color: {$siteData.secondaryColor}; "
	on:click={flop}
	on:keydown={flop}
	tabindex="-1"
>
<div class="carousel">
	<ImgCarousel images={product.image} />
</div>
	<h2>{product.name}</h2>
	<p style="color: {$siteData.textColor};">${product.price}</p>
		<p class="description" style="color: {$siteData.textColor};">{product.description}</p>
	{#if editable}
		<!-- Form code here -->
		<ManageProductForm {product} />
	{:else if product.inventory > 0}
		<button
			style="color: {$siteData.textColor}; background-color: {$siteData.tirciaryColor};"
			disabled={$cartItems.some((item) => item.product_id === product.product_id)}
			on:click={addToCart}
		>
			{$cartItems.some((item) => item.product_id === product.product_id)
				? 'Already in Cart'
				: 'Add to Cart'}
		</button>
	{:else}
		<p style="color: {$siteData.textColor};">Out of Stock</p>
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
		z-index: 1;
		transition-property: transform, z-index;
		transition-duration: 0.2s;
	}
	.description {
		display: none;
	}
	.carousel {
		height: 15rem;
		width: min(15rem, 40vw);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
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

	.product-card:focus {
		transform: scale(1.5);
		z-index: 10;
		
	}
	.product-card:focus .description {
		display: block;
	}
	.product-card:focus .carousel {
		height: 20rem;
		width: min(20rem, 60vw);
	}

	button:disabled {
		background-color: gray;
		cursor: not-allowed;
	}

	button:hover {
		cursor: pointer;
	}
	button:active {
		animation: button-click 0.3s;
	}

	@keyframes button-click {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
