<script>
	// @ts-nocheck
	import { onMount, getContext } from 'svelte';
	import { get_order_details } from '../../../server/backendUtils';
	import OrderStatus from '../../../components/orderStatus.svelte';
	import { page } from '$app/stores';
	const siteData = getContext('siteData');
	let orderDetails = null;
	const orderNum = $page.data.orderNum;

	async function getOrder(orderNum) {
		orderDetails = await get_order_details(orderNum);
        console.log(orderDetails);
		//  {
		//     "orderData": {
		//         "city": "Edmonton",
		//         "customerEmail": "@gmail.com",
		//         "customerName": "Braydon",
		//         "inPersonPickup": false,
		//         "items": [
		//             {
		//                 "cart_quantity": 1,
		//                 "category": [
		//                     "tall-socks"
		//                 ],
		//                 "description": "These solid color socks are a versatile choice for everyday wear.",
		//                 "featured": false,
		//                 "id": 3,
		//                 "name": "Solid Color Socks",
		//                 "price": 8.99,
		//                 "product_id": "Solid Color Socks8ujlei"
		//             }
		//         ],
		//         "postalCode": "k6K 3b2",
		//         "shippingAddress": "1234 W NW",
		//         "totals": {
		//             "shipping": 10.8,
		//             "subtotal": 8.99,
		//             "tax": 0.7192000000000001,
		//             "taxRate": 0.08,
		//             "total": 20.5092
		//         }
		//     },
		//     "order_id": "Braydon -e3nldg",
		//     "status": [
		//         {
		//             "comments": "order has been submitted",
		//             "link": "",
		//             "order_id": "Braydon -e3nldg",
		//             "shipping_carrier": "",
		//             "shipping_date": "",
		//             "status": "payment pending",
		//             "tracking_number": "",
		//             "update_time": "2024-05-08T03:26:36.845Z"
		//         }
		//     ]
		// }
	}

	onMount(async () => {
		await getOrder(orderNum);
	});
</script>

<div class="container" style="background-color: {$siteData.backgroundColor};">
	{#if orderDetails}
		<h1>Order Instructions</h1>
		<h3>Order Number: {orderDetails.order_id}</h3>
		<p>
			below is a copy of your order, please use your order number ("{orderDetails.order_id}") as a
			comment for the e-transfer to {$siteData.contact.paymentEmail} so we can update your order accordingly!
		</p>
		<p>
			when you want to check the status of your order, please use the order number and email address
			to check the status of your order. in the <a href="/orders">"orders"</a> section at the top of
			the page.
		</p>

		<h2>Order Details</h2>
		<table style="border: 1px solid black; border-collapse: collapse;">
			<thead style="background-color:lightgray;">
				<tr>
					<th>Item</th>
					<th>Quantity x Price</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{#each orderDetails.orderData.items as item}
					<tr>
						<th style="border: 1px solid black; padding: 8px 10px;">{item.name}</th>
						<td style="border: 1px solid black; padding: 8px 10px;"
							>{item.cart_quantity} x ${item.price}</td
						>
						<td style="border: 1px solid black; padding: 8px 10px;">{item.description}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>Total: {orderDetails.orderData.totals.total}</tfoot>
		</table>
		<p>Order Number: {orderDetails.order_id}</p>
		<p>Customer Name: {orderDetails.orderData.customerName}</p>
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
