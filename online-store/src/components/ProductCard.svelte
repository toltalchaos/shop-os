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
		if (!editable) { // if the card is not editable
			if (!selected) { // if the card is not selected
				event.target.focus();
				selected = true;
			} else { // if the card is selected
				if (event.target.tagName !== 'IMG') { // if the target is not an image
					event.target.blur(); //currently getting the child component and blurring it...
					selected = false;
					//if the target does not have a classname of "product-card" then blur its parent element
					if (!event.target.classList.contains('product-card')) {
						event.target.parentElement.blur();
					}
				}
			}
		}
	}
</script>

<div
	class={editable? "product-card-edit" : "product-card"}
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
	.product-card-edit {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 1rem;
		max-width: 90vw;
		border-radius: 1rem;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}
	.product-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: auto;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
		transition-property: transform, z-index;
		transition-duration: 0.2s;
	}
	.description {
		display: none;
	}
	.carousel {
		min-height: 15rem;
		max-height: 80%;
		min-width: 15rem;
		max-width: 80%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.product-card h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	.product-card-edit h2 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.product-card p {
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}
	.product-card-edit p {
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
	.product-card-edit button {
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
	.product-card-edit button:hover {
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
	}
	.product-card:focus {
		position: fixed;
		padding-top: 10vh;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.4);
		max-width: 60vw;
		max-height: 60vh;
		z-index: 2;
	}
	.product-card:focus .description {
		display: block;
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
