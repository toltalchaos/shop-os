<script>
  // @ts-nocheck
  import { navigate } from "svelte-routing";
  import Checkoutitem from "../../components/checkoutitem.svelte";
  import cartItems from "../../global/cartItems";
  import { getContext } from 'svelte';
  const siteData = getContext('siteData');
  
  let items = [];

  // Subscribe to the cartItems store and update the `items` variable
  // whenever the store value changes
  cartItems.subscribe((value) => {
    items = value;
  });

</script>

<div class="cart">
  <h2>Cart Items:</h2>
  {#each items as item}
  <hr>
    <Checkoutitem product={item} />
  {/each}
  <a href="/checkout"><button>Proceed to Checkout</button></a>
</div>

<style>
  .cart{
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: center;
    padding: 3rem;
    text-align: center;
    font-family: 'Retro', sans-serif;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
  button:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  }

</style>
