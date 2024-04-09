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

<div>
  <h2>Cart Items:</h2>
  {#each items as item}
    <Checkoutitem product={item} />
  {/each}
  <a href="/checkout"><button>Proceed to Checkout</button></a>
</div>
