<script>
	// @ts-nocheck
	import cartItems from '../global/cartItems';
	import ImgCarousel from './imgCarousel.svelte';

	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	export let product;

	let cart_quantity = product.cart_quantity;

	// Remove the product from the cart on button click
	function removeFromCart() {
		cartItems.update((items) => items.filter((item) => item.product_id !== product.product_id));
	}

	function adjustQuantity(adjquantity) {
		if (adjquantity === -1 && cart_quantity === 1) {
			removeFromCart();
		} else {
			cart_quantity += adjquantity;
			// Update the quantity of the product in the cart
			cartItems.update((items) =>
				items.map((item) => {
					if (item.id === product.id) {
						item.cart_quantity = cart_quantity;
					}
					return item;
				})
			);
		}
	}
</script>

<div class="checkout-item" style="background-color: {$siteData.secondaryColor}; ">
	<div class="checkout-item-image">
		<ImgCarousel images={product.image} />
	</div>
	<div class="checkout-item-details">
		<h2>{product.name}</h2>
		<p>${product.price}</p>
	</div>
	<div class="checkout-item-details">
		<h2>Quantity</h2>
		<p>{cart_quantity}</p>
		<button
			style="color: {$siteData.textColor}; background-color: {$siteData.tirciaryColor};"
			on:click={() => adjustQuantity(1)}
			disabled={cart_quantity == product.inventory}>Add</button
		>
		<button
			style="color: {$siteData.textColor}; background-color: {$siteData.tirciaryColor};"
			on:click={() => adjustQuantity(-1)}>Remove</button
		>
	</div>
	<div class="checkout-item-remove">
		<button on:click={removeFromCart}>Delete</button>
	</div>
</div>

<style>
	.checkout-item {
		display: flex;
		align-items: center;
		margin: 1rem;
		padding: 1rem;
		border-radius: 2rem;
	}
	@media (max-width: 750px) {
		.checkout-item {
			flex-direction: column;
		}
	}

	.checkout-item-image {
		height: 15rem;
		width: min(15rem, 40vw);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.checkout-item-details {
		flex-grow: 1;
	}

	.checkout-item-details h2 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.checkout-item-remove {
		width: 5rem;
	}
	button {
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 1rem;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.checkout-item-remove button {
		font-size: 1rem;
		padding: 0.5rem;
		background-color: #300f0f;
		color: #d70505;
		border: 1px solid;
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.2s ease-in-out;
	}

	.checkout-item-remove button:hover {
		background-color: #333;
		color: #fff;
	}
</style>
