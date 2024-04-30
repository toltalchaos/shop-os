<script>
	// @ts-nocheck
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
		status: 'Update',
		tracking_number: '',
		shipping_carrier: '',
		shipping_date: '',
		link: '',
		update_time: ''
	};

	async function handleUpdate() {
		// Add the new status to the order status array
		newStatusInfo.update_time = new Date().toISOString();
		order.status.push(newStatusInfo);
		await set_order_status(order);
	}
</script>

<div>
	{#if editable}
	<h2>Update Status</h2>
		<form on:submit|preventDefault={handleUpdate}>
			<label for="status">Status:
			<select id="status" bind:value={newStatusInfo.status} required>
				<option value="Update">Select Status</option>
				<option value="Update (please see comments)">Update - see comment</option>
				<option value="order placed">Order Placed</option>
				<option value="order confirmed">Order Confirmed (Awaiting Payment)</option>
				<option value="order processing">Order Processing</option>
				<option value="order shipped">Order Shipped</option>
				<option value="order complete">Order Complete</option>
				<!-- Add more options here -->
			</select>
		</label>
			<!-- <label for="tracking_number">Tracking Number:
			<input type="text" id="tracking_number" bind:value={newStatusInfo.tracking_number} />
		</label> -->
			<label for="shipping_comments">Comments:
			<textarea id="shipping_comments" bind:value={newStatusInfo.comments} required/>
		</label>
			<!-- <label for="shipping_carrier">Shipping Carrier:
			<input type="text" id="shipping_carrier" bind:value={newStatusInfo.shipping_carrier}  />
		</label> -->
			<!-- <label for="shipping_date"> Date:
			<input type="date" id="shipping_date" bind:value={newStatusInfo.shipping_date}  />
		</label>	 -->
			<button type="submit">Update</button>
		</form>
		<hr />
		<StatusCard statusArray={order.status} />
	{:else}
		<StatusCard statusArray={order.status} />
	{/if}
</div>

<style>
	form{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
</style>
