<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import cartItems from '../global/cartItems';
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	export let product;

	let cart_quantity = product.cart_quantity;

	// Remove the product from the cart on button click
	function removeFromCart() {
		cartItems.update((items) => items.filter((item) => item.id !== product.id));
	}

	function adjustQuantity(adjquantity) {
		if (adjquantity === -1 && cart_quantity === 1) {
			removeFromCart();
		} else {
			cart_quantity += adjquantity;
      // Update the quantity of the product in the cart
      cartItems.update((items) => items.map((item) => {
      if(item.id === product.id){
        item.cart_quantity = cart_quantity;
      }
      return item;
    }));
		}
	}
</script>

<div class="checkout-item">
	<hr />
	<div class="checkout-item-image">
		<img src={product.image} alt={product.name} />
	</div>
	<div class="checkout-item-details">
		<h2>{product.name}</h2>
		<p>${product.price}</p>
	</div>
	<div class="checkout-item-details">
		<h2>Quantity</h2>
		<p>{cart_quantity}</p>
		<button on:click={() => adjustQuantity(1)} disabled={cart_quantity == product.invintory}>Add</button>
		<button on:click={() => adjustQuantity(-1)}>Remove</button>
	</div>
	<div class="checkout-item-remove">
		<button on:click={removeFromCart}>Remove</button>
	</div>
</div>

<style>
	.checkout-item {
		display: flex;
		align-items: center;
		margin: 1rem;
	}

	.checkout-item-image {
		width: 10rem;
		margin-right: 1rem;
	}

	.checkout-item-image img {
		width: 100%;
		height: auto;
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

	.checkout-item-remove button {
		font-size: 1rem;
		padding: 0.5rem;
		background-color: #fff;
		color: #333;
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
