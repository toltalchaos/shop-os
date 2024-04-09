<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
	import Invoice from '../../components/invoice.svelte';
    import cartItems from '../../global/cartItems';
    import { getContext } from 'svelte';
  const siteData = getContext('siteData');
  
    let items = [];
  
    // Subscribe to the cartItems store and update the `items` variable
    // whenever the store value changes
    cartItems.subscribe(value => {
        items = value;
    });
  
    let customerName = '';
    let customerEmail = '';
    let shippingAddress = '';
    let billingAddress = '';
    let cardNumber = '';
    let expDate = '';
    let cvv = '';
    let total = 0;
  
    // Calculate total cost of items in the cart
    onMount(() => {
      total = items.reduce((previousValue, item) => previousValue + item.price, 0);
      
    });
  
  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch('/submit', {
        method: 'POST',
        body: JSON.stringify({
          customerName,
          customerEmail,
          shippingAddress,
          billingAddress,
          cardNumber,
          expDate,
          cvv,
          total,
          items,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const invoice = await res.json();
        console.log('Invoice:', invoice);
        // Notify seller of order
      } else {
        console.error('Failed to submit order:', res.status);
      }
    } catch (err) {
      console.error('Failed to submit order:', err);
    }
  }

  function validateForm() {
    const form = document.getElementById('checkout-form');
    const fields = Array.from(form.elements).filter((el) => el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');

    return fields.every((field) => {
      if (field.checkValidity()) {
        field.classList.remove('error');
        return true;
      } else {
        field.classList.add('error');
        return false;
      }
    });
  }
</script>
  
  <div class="checkout-page" style= "background-color: {$siteData.backgroundColor};">

    <h2>Checkout</h2>
    <Invoice {items}></Invoice>
    <form on:submit={handleSubmit}>
      <div class="form-row">
        <label for="customerName">Name:</label>
        <input type="text" id="customerName" bind:value={customerName} required />
      </div>
      <div class="form-row">
        <label for="customerEmail">Email:</label>
        <input type="email" id="customerEmail" bind:value={customerEmail} required />
      </div>
      <div class="form-row">
        <label for="shippingAddress">Shipping Address:</label>
        <textarea id="shippingAddress" bind:value={shippingAddress} required></textarea>
      </div>
      <div class="form-row">
        <label for="billingAddress">Billing Address:</label>
        <textarea id="billingAddress" bind:value={billingAddress} required></textarea>
      </div>
      <div class="form-row">
        <label for="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" bind:value={cardNumber} required />
      </div>
      <div class="form-row">
        <label for="expDate">Expiration Date:</label>
        <input type="text" id="expDate" bind:value={expDate} required />
      </div>
      <div class="form-row">
        <label for="cvv">CVV:</label>
        <input type="text" id="cvv" bind:value={cvv} required />
      </div>
      <div class="form-row">
        <label for="total">Total:</label>
        <input type="text" id="total" bind:value={total} disabled />
      </div>
      <button type="submit">Pay Now</button>
    </form>
  </div>
  
<style>
.checkout-page {
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
}

.form-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

label {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

input[type="text"],
textarea,
input[type="email"] {
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

input[type="text"]:focus,
textarea:focus,
input[type="email"]:focus {
  outline: none;
}

button[type="submit"] {
  background-color: #0f0;
  color: #000;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  margin-top: 1.5rem;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0c0;
}


</style>

