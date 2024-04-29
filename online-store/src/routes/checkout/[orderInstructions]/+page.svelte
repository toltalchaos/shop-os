<script>
	// @ts-nocheck
    import { onMount } from 'svelte';
    import { get_order_details } from '../../../server/firebaseClient';
    import OrderStatus from '../../../components/orderStatus.svelte';
    import { page } from '$app/stores';
    let orderDetails = null;
    const orderNum = $page.data.orderNum;
    async function getOrder(orderNum) {
         orderDetails = await get_order_details(orderNum);
    }

    onMount(async () => {
        if (!orderNum) {
             await getOrder(1); //todo: remove this. This is just for testing
        } else {
            await getOrder(orderNum);
        }
    });


</script>

<div class="container">
    {#if orderDetails}
    <h1>Order Instructions</h1>
    <h3>Order Number: {orderDetails.order_id}</h3>
    <p>
        below is a copy of your order, please use your order number ("{orderDetails.order_id}") as a comment for the e-transfer so we
        can update your order accordingly!
    </p>
    
    <h2>Order Details</h2>
        <p>Order Number: {orderDetails.order_id}</p>
        <p>Customer Name: {orderDetails.customerName}</p>
        <OrderStatus order={orderDetails} />
    
    {:else}
        <p>Loading order details...</p>
    {/if}
</div>


<style>
    .container {
        margin: 0 auto;
        padding: 1rem;
        max-width: 800px;
    }
    h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    h3 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }
    p {
        margin-bottom: 1rem;
        border-top: 1px solid #ccc;
        padding-top: 1rem;
    }

</style>