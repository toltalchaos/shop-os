<script>
import { set_order_status } from "../server/firebaseClient";

export let order = {
		order_id: 0,
		status: '',
		comments: '',
		tracking_number: '',
		shipping_carrier: '',
		shipping_date: '',
		link: '',
		update_time: ''
	};
	export let editable = false; //for managing the order status


    async function handleUpdate() {
		// Call your helper function here to update the order status
		// Example: updateOrderStatus(orderData);
		await set_order_status(order);
	}
</script>

<div>
	{#if editable}
		<form on:submit|preventDefault={handleUpdate}>
			<label for="status">Status:</label>
			<input type="text" id="status" bind:value={order.status} required />
			<label for="tracking_number">Tracking Number:</label>
			<input type="text" id="tracking_number" bind:value={order.tracking_number} required />
			<label for="shipping_comments">Comments:</label>
			<textarea id="shipping_comments" bind:value={order.comments}></textarea>
			<label for="shipping_carrier">Shipping Carrier:</label>
			<input type="text" id="shipping_carrier" bind:value={order.shipping_carrier} required />
			<label for="shipping_date">Shipping Date:</label>
			<input type="date" id="shipping_date" bind:value={order.shipping_date} required />
			<button type="submit">Update</button>
		</form>
	{:else}
		<h1>Order Status as of {order.update_time}</h1>
		<p>Order ID: {order.order_id}</p>
		<p>Status: {order.status}</p>
		<p>Comments: {order.comments}</p>
		<p>Tracking Number: {order.tracking_number}</p>
		<p>Shipping Carrier: {order.shipping_carrier}</p>
		<p>Shipping Date: {order.shipping_date}</p>
		<a href={order.link} target="_blank" rel="noopener noreferrer">Track Order</a>
	{/if}
</div>

<style>
	/* Add your custom styles here */
</style>
