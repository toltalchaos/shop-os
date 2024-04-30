<script>
// @ts-nocheck
    export let statusArray = [];
    

    
    
</script>



<div class="container">
    {#each statusArray as status}
    <div class="card">
        <h3>Order Status as of {status.update_time}</h3>
        <!-- <p>Order ID: {status.order_id}</p> -->
        <p>Status: {status.status}</p>
        <p>Comments: {status.comments}</p>
        <!-- <p>Tracking Number: {status.tracking_number}</p>
        <p>Shipping Carrier: {status.shipping_carrier}</p>
        <p>Shipping Date: {status.shipping_date}</p>
        <a href={status.link} target="_blank" rel="noopener noreferrer">Track Order</a> -->
    </div>
{/each}
</div>

<style>
    .container {
        display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		max-width: 300px;
		padding: 1rem;
        margin: 1rem;
		border-radius: 1rem;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
</style>

