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
		const isDuplicate = $cartItems.some((item) => item.id === product.id);
		if (!isDuplicate) {
			product.cart_quantity = 1;
			cartItems.update((items) => [...items, product]);
		}
	}

	function flop(event) {
		if(!selected){
			event.target.focus();
		}else{
			event.target.blur();}
		selected = !selected;
	}
</script>

<div
	class="product-card"
	style="background-color: {$siteData.secondaryColor}; "
	on:click={flop}
	on:keydown={flop}
	tabindex="-1"
>
	<ImgCarousel images={product.image} interval="5000" />
	<h2>{product.name}</h2>
	<p style="color: {$siteData.textColor};">${product.price}</p>
	{#if selected}
		<p style="color: {$siteData.textColor};">{product.description}</p>
	{/if}
	{#if editable}
		<!-- Form code here -->
		<ManageProductForm {product} />
	{:else if product.invintory > 0}
		<button
			style="color: {$siteData.textColor}; background-color: {$siteData.tirciaryColor};"
			class:disabled={$cartItems.some((item) => item.id === product.id)}
			on:click={addToCart}
		>
			{$cartItems.some((item) => item.id === product.id) ? 'Already in Cart' : 'Add to Cart'}
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

	.product-card:focus{
		transform: scale(1.1);
		z-index: 10;
	}
</style>
