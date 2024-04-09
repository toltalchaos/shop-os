<script>
  // @ts-nocheck

  import { onMount } from 'svelte';
  import cartItems from '../global/cartItems';
  import { getContext } from 'svelte';
  const siteData = getContext('siteData');
  export let product;
  export let editable = false;

  // Add the product to the cart on button click
  function addToCart() {
    const isDuplicate = $cartItems.some(item => item.id === product.id);
    if (!isDuplicate) {
      cartItems.update(items => [...items, product]);
    }
  }
</script>

<div class="product-card" style= "background-color: {$siteData.tirciaryColor}; ">
  <img src={product.image} alt={product.name} />
  <h2>{product.name}</h2>
  <p style="color: {$siteData.textColor};" >${product.price}</p>
    {#if editable}
      <!-- Form code here -->
      <p>EDITABLE FORM WILL GO HERE</p>
    {:else}
      <button 
        class:disabled={$cartItems.some(item => item.id === product.id)}
        on:click={addToCart}>
        {$cartItems.some(item => item.id === product.id) ? 'Already in Cart' : 'Add to Cart'}
      </button>
    {/if}
</div>

<style>
  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 1.5rem;
    background-color: #fff;
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
    color: #999;
    margin-bottom: 1rem;
  }

  .product-card button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .product-card button:hover {
    background-color: #444;
  }

  .product-card button.disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>
