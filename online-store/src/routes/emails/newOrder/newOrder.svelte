<!-- newOrder.svelte -->
<script>
	import { Section, Hr, Html, Text, Heading, Container } from 'svelte-email';
	//https://svelte-email.vercel.app/docs/getting-started/installation

	export let orderNumber;
	export let orderData;
	export let paymentEmail;
	const items = orderData.items;
	const customer = orderData.customerName;
	const email = orderData.customerEmail;
	const inPersonPickup = orderData.inPersonPickup;
	const shippingAddress = orderData.shippingAddress;
	const postalCode = orderData.postalCode;
	const city = orderData.city;
	const province = orderData.province;
	const totals = orderData.totals;
</script>

<Html lang="en">
	<Container>
		<Heading as="h1">New Order Received</Heading>
		<Text>Thank you for your order! Your order number is: {orderNumber}</Text>
		<Heading as="h2">Whats next?</Heading>
		<Text
			>E-transfer us with your order number at {paymentEmail} so we can confirm payment and send you
			updates accordingly!</Text
		>
		<Hr />
		<Text
			>Please check the "orders" tab with your order number and email for the most up-to-date
			information on your order!</Text
		>
		<Text
			>If you have any questions or if the following information is incorrect in any way, please feel free to
			contact us!</Text
		>
	</Container>
	<Container>
		<Text>the new order number is: {orderNumber}</Text>
		<Hr />
		<Heading as="h2">Items</Heading>
		<Section>
			<table style="border: 1px solid black; border-collapse: collapse;">
                <thead style="background-color:lightgray;">
                    <tr>
                        <th>Item</th>
                        <th>Quantity x Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
				<tbody>
					{#each items as item}
						<tr>
							<th style="border: 1px solid black; padding: 8px 10px;">{item.name}</th>
							<td style="border: 1px solid black; padding: 8px 10px;">{item.cart_quantity} x ${item.price}</td>
                            <td style="border: 1px solid black; padding: 8px 10px;">{item.description}</td>
						</tr>
					{/each}
                    </tbody>
                <tfoot>Total: {totals.total}</tfoot>
			</table>
		</Section>
		<Hr />
		<Heading as="h2">Customer</Heading>
		<Text>{customer}</Text>
		<Text>{email}</Text>
		<Text>shipped or pickup? "{inPersonPickup ? 'In Person Pickup' : 'Shipping'}" selected!</Text>
		{#if !inPersonPickup}
			<Text>Shipping Address: {shippingAddress}</Text>
			<Text>Postal Code: {postalCode}</Text>
			<Text>City: {city}</Text>
			<Text>Province: {province}</Text>
		{/if}

		<Hr />
		<Heading as="h2">Totals Breakdown:</Heading>
		<Text>Subtotal: ${totals.subtotal}</Text>
		<Text>Shipping: ${totals.shipping}</Text>
		<Text>Tax: ${totals.tax}</Text>
		<Text>Total: ${totals.total}</Text>
	</Container>
</Html>
