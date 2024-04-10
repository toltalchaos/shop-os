
// This page handles the cart items and provides a writable store for them.
// To use this store, assign the desired cart items to the 'cartItems' variable.
// The 'writable' function creates a writable store that can be subscribed to and updated.
// The 'storedItems' variable should contain the initial cart items to be stored.
// Example usage: cartItems = writable(storedItems);


// @ts-nocheck
import { writable } from 'svelte/store';

let storedItems = [];

const cartItems = writable(storedItems);

// Subscribe to the cartItems store and save the current items to localStorage
cartItems.subscribe(items => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
});

// Export the store for other components to use
export default cartItems;
