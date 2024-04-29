<script>
	import { set_order_status } from '../server/firebaseClient';
	import StatusCard from './statusCard.svelte';
	//expecting a full fledged order object including status array
	export let order = {
		order_id: '',
		status: [],
		comments: '',
		tracking_number: '',
		shipping_carrier: '',
		shipping_date: '',
		link: '',
		update_time: ''
	};
	export let editable = false; //for managing the order status

	let newStatusInfo = {
		order_id: order.order_id,
		comments: '',
		status: '',
		tracking_number: '',
		shipping_carrier: '',
		shipping_date: '',
		link: '',
		update_time: ''
	};

	async function handleUpdate() {
		// Call your helper function here to update the order status
		// Example: updateOrderStatus(orderData);
		await set_order_status(order);
	}
</script>

<div>
	{#if editable}
	<h2>Update Status</h2>
		<form on:submit|preventDefault={handleUpdate}>
			<label for="status">Status:</label>
			<input type="text" id="status" bind:value={newStatusInfo.status} required />
			<label for="tracking_number">Tracking Number:</label>
			<input type="text" id="tracking_number" bind:value={newStatusInfo.tracking_number} required />
			<label for="shipping_comments">Comments:</label>
			<textarea id="shipping_comments" bind:value={newStatusInfo.comments} />
			<label for="shipping_carrier">Shipping Carrier:</label>
			<input type="text" id="shipping_carrier" bind:value={newStatusInfo.shipping_carrier} required />
			<label for="shipping_date">Shipping Date:</label>
			<input type="date" id="shipping_date" bind:value={newStatusInfo.shipping_date} required />
			<button type="submit">Update</button>
		</form>
		<hr />
		<StatusCard statusArray={order.status} />
	{:else}
		<StatusCard statusArray={order.status} />
	{/if}
</div>

<style>
	/* Add your custom styles here */
</style>
