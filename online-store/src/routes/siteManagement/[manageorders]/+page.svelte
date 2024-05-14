<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	import OrderStatus from '../../../components/orderStatus.svelte';
	import { get_order_details } from '../../../server/backendUtils';
	let orderData = null;
	let orderNumber = '';

	async function handleSubmit() {
		// Call your helper function here to perform the lookup based on the order number
		// and populate the data variable with the order status
		// Example: data = lookupOrderStatus(orderNumber);
		orderData = await get_order_details(orderNumber);
	}
	onMount(async () => {
		if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
			window.location.href = '/login';
		}
		// Check if the user has been logged in for more than an hour
		if(localStorage.getItem('loginTime') < new Date().getTime() - 3600000){
			window.location.href = '/login';
			localStorage.clear();
		}
	});

</script>

<main>
	<h1>Order Lookup</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<label for="orderNumber">Order Number:</label>
		<input type="text" id="orderNumber" bind:value={orderNumber} required />
		<button type="submit">Lookup</button>
	</form>
		{#if orderData}
			<OrderStatus order={orderData} editable={true}/>
		{/if}
</main>

<style>
	/* Add your custom styles here */
</style>
