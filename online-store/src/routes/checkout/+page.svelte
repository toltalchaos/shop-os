<script>
	// @ts-nocheck
  import { create_order } from '../../server/firebaseClient';
	import Invoice from '../../components/invoice.svelte';
	import cartItems from '../../global/cartItems';
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	let items = [];
	// Subscribe to the cartItems store and update the `items` variable
	// whenever the store value changes
	cartItems.subscribe((value) => {
		items = value;
	});

	let customerName = '';
	let customerEmail = '';
	let shippingAddress = '';
	let billingAddress = '';
	let cardNumber = '';
	let expDate = '';
	let cvv = '';
	let subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
	let taxRate = 0.07;
	let tax = subtotal * (taxRate + 1);
	let shipping = $siteData.shippingRate * (taxRate + 1); // Default shipping cost is $10
	let total = subtotal + shipping + tax;
	let totals = { subtotal, shipping, tax, taxRate, total };

	// Handle form submission
	async function handleSubmit(event) {
		event.preventDefault();
		if (!validateForm()) return;
    console.log('Submitting order data...');
    let orderData = {
       //items includes the existing invintory at this time. this is not helpful for the order it should be a separate collection
      items,
      customerName,
      customerEmail,
      shippingAddress,
      billingAddress,
      cardNumber,
      expDate,
      cvv,
      totals,
    };
    await create_order(orderData);

	}

	function validateForm() {
		// Add your form validation logic here
    return true;
	}

  function toggleInPersonPickup() {
    shipping = (shipping === 0 ? 10 : 0) * (taxRate + 1);
    //re-calculate totals
    total = subtotal + shipping + tax;
	  totals = { subtotal, shipping, tax, taxRate, total };
  }
</script>

<div class="checkout-page" style="background-color: {$siteData.backgroundColor};">
	<h2>Checkout</h2>
  
	<Invoice {items} {totals} />
  
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
			<textarea id="shippingAddress" bind:value={shippingAddress} required={shipping == 0 ? true : false} disabled={shipping == 0 ? true : false} />
      <div>
        <!-- toggle switch  -->
        <label class="switch" >
          <input type="checkbox" on:click={toggleInPersonPickup}>
          <span class="slider"></span>
        </label> In Person Pickup
      </div>
		</div>
		<div class="form-row">
			<label for="billingAddress">Billing Address:</label>
			<textarea id="billingAddress" bind:value={billingAddress} required />
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
			<input type="text" id="total" value={total.toFixed(2)} disabled />
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

	input[type='text'],
	textarea,
	input[type='email'] {
		border-radius: 0.5rem;
		padding: 0.5rem;
		font-size: 1.2rem;
		margin-top: 0.5rem;
	}

	input[type='text']:focus,
	textarea:focus,
	input[type='email']:focus {
		outline: none;
	}

	button[type='submit'] {
		background-color: #0f0;
		color: #000;
		border: none;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		margin-top: 1.5rem;
		cursor: pointer;
	}

	button[type='submit']:hover {
		background-color: #0c0;
	}

  /* toggle switch styles */
  .switch input
{
  display: none;
}

.switch 
{
  display: inline-block;
  width: 60px; /*=w*/
  height: 30px; /*=h*/
  margin: 4px;
  transform: translateY(50%);
  position: relative;
}

.slider
{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 30px;
  box-shadow: 0 0 0 2px #777, 0 0 4px #777;
  cursor: pointer;
  border: 4px solid transparent;
  overflow: hidden;
  transition: 0.2s;
}

.slider:before
{
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background-color: #777;
  border-radius: 30px;
  transform: translateX(-30px); /*translateX(-(w-h))*/
  transition: 0.2s;
}

input:checked + .slider:before
{
  transform: translateX(30px); /*translateX(w-h)*/
  background-color: limeGreen;
}

input:checked + .slider
{
  box-shadow: 0 0 0 2px limeGreen, 0 0 8px limeGreen;
}

</style>
