<script>
// @ts-nocheck
    export let statusArray = [];
    

    
    
</script>



<div class="container">
    {#each statusArray as status}
    <div class="card">
        <h3>Order Status as of {status.update_time}</h3>
        <p>Order ID: {status.order_id}</p>
        <p>Status: {status.status}</p>
        <p>Comments: {status.comments}</p>
        <p>Tracking Number: {status.tracking_number}</p>
        <p>Shipping Carrier: {status.shipping_carrier}</p>
        <p>Shipping Date: {status.shipping_date}</p>
        <a href={status.link} target="_blank" rel="noopener noreferrer">Track Order</a>
    </div>
{/each}
</div>



