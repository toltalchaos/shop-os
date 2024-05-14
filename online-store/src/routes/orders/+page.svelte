<script>
	// @ts-nocheck
	import OrderStatus from '../../components/orderStatus.svelte';
	import { get_order_details } from '../../server/backendUtils';
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	let orderData = null;
	let orderNumber = '';
	let email = '';

	async function handleSubmit() {
		// Call your helper function here to perform the lookup based on the order number
		// and populate the data variable with the order status
		// Example: data = lookupOrderStatus(orderNumber);
		orderData = await get_order_details(orderNumber);
		if (orderData == 'Order not found' || orderData?.orderData?.customerEmail !== email) {
			orderData = null;
			alert('Order not found. Please check the order number and email and try again.');
		}
	}
</script>

<div class="container" style="background-color: {$siteData.backgroundColor};">
	<h2>Order Lookup</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="orderNumber">Order Number:</label>
		<input type="text" id="orderNumber" bind:value={orderNumber} required />
		<label for="email">Email:</label>
		<input type="email" id="email" bind:value={email} required />
		<button type="submit">Lookup</button>
	</form>

	{#if orderData}
		<OrderStatus order={orderData} />
	{/if}
</div>

<style>
    h2 {
        text-align: center;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    label {
        font-size: 1.2rem;
        margin-top: 1rem;
    }
    input {
        padding: 0.5rem;
        font-size: 1rem;
        margin-top: 0.5rem;
    }
    button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        margin-top: 1rem;
        cursor: pointer;
    }
    button:hover {
        color: white;
    }
</style>
