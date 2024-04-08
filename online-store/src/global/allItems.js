import { writable } from 'svelte/store';

  // Initialize an empty array to store cart items
  const StoreItems = writable([]);

  // Export the complete store for other components to subscribe to and update
  //see +layout.svelte for usage
  export default StoreItems;