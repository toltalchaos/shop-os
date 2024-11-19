<script>
	// @ts-nocheck
	import { create_order, lookup_discount } from '../../server/backendUtils';
	import Invoice from '../../components/invoice.svelte';
	import cartItems from '../../global/cartItems';
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import AccordionItem from '../../components/accordionItem.svelte';
	let chosenPayment = writable('etransfer');

	const siteData = getContext('siteData');
	let items = [];
	// Subscribe to the cartItems store and update the `items` variable
	// whenever the store value changes
	cartItems.subscribe((value) => {
		items = value;
	});

	let customerName = '';
	let customerEmail = '';
	let shippingAddress = null;
	let postalCode = null;
	let city = null;
	let province = null;
	let inPersonPickup = false;
	let discount_id = '';
	let discount = null;
	let subtotal = items.reduce((acc, item) => acc + item.price * item.cart_quantity, 0);
	let taxRate = $siteData.taxRate;
	let tax = subtotal * taxRate;
	let shipping = $siteData.shippingRate * (taxRate + 1); // Default shipping cost is $10
	let total = subtotal + shipping + tax;
	//anything being put into the totals object should be fixed to 2 decimal places
	let totals = calculateTotals();

	// Handle form submission
	async function handleEtransferSubmit(event) {
		event.preventDefault();
		let isValid = validateForm();
		console.log('customerName:', customerName);
		if (!isValid) {
			alert('Please fill out all required fields accurately before submitting the order.');
		} else {
			if (confirm('Are you sure you want to submit the order? This action cannot be undone.')) {
				console.log('Submitting order data...');

				let orderData = {
					items,
					customerName,
					customerEmail,
					inPersonPickup,
					shippingAddress,
					postalCode,
					city,
					province,
					discount,
					totals
				};
				let newOrder = await create_order(orderData, $siteData.contact.paymentEmail);
				console.log('newOrder:', newOrder);
				if (newOrder == 'ERROR') {
					console.log('Error submitting order. Please try again later.');
					alert('Error submitting order. Please try again later.');
				} else {
					alert('Order submitted successfully!', 'Order ID: ' + newOrder.order_id);
					//clear cart
					clearCart();
					//redirect to order payment instructions page
					goto('/checkout/orderInstructions?orderNum=' + newOrder.order_id);
				}
			}
		}
	}
	function clearCart() {
		//clear local storage
		localStorage.setItem('cartItems', JSON.stringify([]));
		//clear global store
		cartItems.update((items) => []);
	}
	function validateForm() {
		customerName = customerName.replace(/[.#$\[\]]/g, '');
		if (
			items.length == 0 ||
			!customerName ||
			!customerEmail ||
			(!inPersonPickup && (!shippingAddress || !postalCode || !city || !province))
		) {
			return false;
		}
		return true;
	}

	function toggleInPersonPickup() {
		shipping = (inPersonPickup ? $siteData.shippingRate : 0) * (taxRate + 1);
		//re-calculate totals
		total = subtotal + shipping + tax;
		//anything being put into the totals object should be fixed to 2 decimal places
		totals = calculateTotals();

		inPersonPickup = !inPersonPickup;
	}

	async function lookupDiscount() {
		if (!discount || discount.discount_id != discount_id) {
			discount = null;
			//lookup discount by discount_id
			discount = await lookup_discount(discount_id);
			if (discount != 'ERROR') {
				//apply discount to total
				if (discount.type == 'percentage') {
					total = (subtotal + shipping + tax) * (1 - discount.amount / 100);
				} else if (discount.type == 'fixed') {
					total = subtotal + shipping + tax - discount.amount;
				}
				//anything being put into the totals object should be fixed to 2 decimal places
				totals = calculateTotals();
			} else {
				alert('Discount not found. Please check the discount code and try again.');
				discount = null;
			}
		} else {
			alert('Discount already applied.');
		}
	}

	function calculateTotals() {
		return {
			discount: discount,
			subtotal: subtotal.toFixed(2),
			shipping: shipping.toFixed(2),
			tax: tax.toFixed(2),
			taxRate: taxRate.toFixed(2),
			total: total.toFixed(2)
		};
	}


</script>

<div class="checkout-page" style="background-color: {$siteData.backgroundColor};">
	<h2>Checkout</h2>

	<Invoice {items} {totals} {discount} />
	<AccordionItem open>
		<div slot="head">E-transfer Payment</div>
		<div slot="details">
			<form on:submit={handleEtransferSubmit}>
				<div class="form-row">
					<label for="customerName">Name:</label>
					<input type="text" id="customerName" bind:value={customerName} required />
				</div>
				<div class="form-row">
					<label for="customerEmail">Email:</label>
					<input type="email" id="customerEmail" bind:value={customerEmail} required />
				</div>
				<div class="form-row">
					<div class="shipping-info">
						<label for="city"
							>City:
							<input
								id="city"
								type="city"
								bind:value={city}
								required={!inPersonPickup}
								disabled={inPersonPickup}
							/></label
						>
						<label for="province"
							>Province/State:
							<input
								id="province"
								type="province"
								bind:value={province}
								required={!inPersonPickup}
								disabled={inPersonPickup}
							/></label
						><label for="shippingAddress"
							>Street Address:
							<input
								id="shippingAddress"
								type="address"
								bind:value={shippingAddress}
								required={!inPersonPickup}
								disabled={inPersonPickup}
							/></label
						>
						<label for="postalCode"
							>Postal Code (ZIP code):
							<input
								id="postalCode"
								type="zip"
								bind:value={postalCode}
								required={!inPersonPickup}
								disabled={inPersonPickup}
							/></label
						>
					</div>
					<div class="dicounts">
						<!-- text input to input a discount_id and an "apply" button to call a discount lookup function -->
						<label for="discount"
							>Discount Code:
							<input type="text" id="discount" bind:value={discount_id} />
							<button type="button" on:click={lookupDiscount}>Apply</button>
						</label>
						{#if discount}
							<p>Discount applied: {discount.name}</p>
						{/if}
					</div>
					<div>
						<!-- toggle switch  -->
						<label class="switch">
							<input type="checkbox" on:click={toggleInPersonPickup} />
							<span class="slider" />
						</label>
						In Person Pickup
						<aside><p>Store location: {$siteData.storeLocation}</p></aside>
					</div>
				</div>
				<div class="form-row">
					<label for="total">Total:</label>
					<input type="text" id="total" value={total.toFixed(2)} disabled />
				</div>
				<button type="submit">Order Now</button>
			</form>
		</div>
	</AccordionItem>
	<AccordionItem>
		<div slot="head">Credit Card Payment</div>
		<div slot="details">
			<p>Coming soon...</p>
		</div>
	</AccordionItem>
	
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
	input {
		border-radius: 0.5rem;
		padding: 0.5rem;
		font-size: 1.2rem;
		margin-top: 0.5rem;
	}

	input[type='text']:focus,
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
	.shipping-info {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	/* toggle switch styles */
	.switch input {
		display: none;
	}

	.switch {
		display: inline-block;
		width: 60px; /*=w*/
		height: 30px; /*=h*/
		margin: 4px;
		transform: translateY(50%);
		position: relative;
	}

	.slider {
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

	.slider:before {
		position: absolute;
		content: '';
		width: 100%;
		height: 100%;
		background-color: #777;
		border-radius: 30px;
		transform: translateX(-30px); /*translateX(-(w-h))*/
		transition: 0.2s;
	}

	input:checked + .slider:before {
		transform: translateX(30px); /*translateX(w-h)*/
		background-color: limeGreen;
	}

	input:checked + .slider {
		box-shadow: 0 0 0 2px limeGreen, 0 0 8px limeGreen;
	}
</style>
