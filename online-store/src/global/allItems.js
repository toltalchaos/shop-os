import { writable } from 'svelte/store';

  // Initialize an empty array to store cart items
  const cartItems = writable([]);

  // Export the store for other components to use
  export default cartItems;