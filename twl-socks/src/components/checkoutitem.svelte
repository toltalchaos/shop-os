<script>
    // @ts-nocheck
  
    import { onMount } from 'svelte';
    import cartItems from '../global/cartItems';
  
    export let product;
  
    // Remove the product from the cart on button click
    function removeFromCart() {
      cartItems.update(items => items.filter(item => item.id !== product.id));
    }
  </script>
  
  <div class="checkout-item">
    <div class="checkout-item-image">
      <img src={product.image} alt={product.name} />
    </div>
    <div class="checkout-item-details">
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
    <div class="checkout-item-remove">
      <button on:click={removeFromCart}>Remove</button>
    </div>
  </div>
  
  <style>
    .checkout-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
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
  
    .checkout-item-details p {
      font-size: 1.2rem;
      color: #999;
      margin-bottom: 0.5rem;
    }
  
    .checkout-item-remove {
      width: 5rem;
    }
  
    .checkout-item-remove button {
      width: 100%;
      font-size: 1rem;
      padding: 0.5rem;
      background-color: #fff;
      color: #333;
      border: 1px solid #333;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
  
    .checkout-item-remove button:hover {
      background-color: #333;
      color: #fff;
    }
  </style>
  