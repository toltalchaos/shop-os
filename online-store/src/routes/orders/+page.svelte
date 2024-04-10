<script>
// @ts-nocheck
	import OrderStatus from '../../components/orderStatus.svelte';
import { get_order_status } from '../../server/firebaseClient';
    let orderData = null;
    let orderNumber = '';

    async function handleSubmit() {
        // Call your helper function here to perform the lookup based on the order number
        // and populate the data variable with the order status
        // Example: data = lookupOrderStatus(orderNumber);
        orderData = await get_order_status(orderNumber);
    }

</script>

<main>
    <h1>Order Lookup</h1>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="orderNumber">Order Number:</label>
        <input type="text" id="orderNumber" bind:value={orderNumber} required />
        <button type="submit">Lookup</button>
    </form>

    {#if orderData}
        <OrderStatus order={orderData}/>
    {/if}
</main>

<style>
    /* Add your custom styles here */
</style>