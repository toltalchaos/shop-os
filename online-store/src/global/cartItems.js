// @ts-nocheck
import { writable } from 'svelte/store';

let storedItems = [];

if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
  // use localStorage here
  const cartItemsJSON = localStorage.getItem('cartItems');
  if (cartItemsJSON) {
    try {
      storedItems = JSON.parse(cartItemsJSON);
    } catch (e) {
      console.error('Error parsing stored cart items:', e);
    }
  }
} else {
  // localStorage is not available
}

const cartItems = writable(storedItems);

// Subscribe to the cartItems store and save the current items to localStorage
cartItems.subscribe(items => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }
});

// Export the store for other components to use
export default cartItems;
