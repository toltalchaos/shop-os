<!-- newOrder.svelte -->
<script>
    import { Button, Hr, Html, Text, Heading, Container } from 'svelte-email';
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
        <Text>E-transfer us with your order number at {paymentEmail} so we can confirm payment and send you updates accordingly!</Text>
        <Hr />
        <Text>Please check the "orders" tab with your order number and email for the most up-to-date information on your order!</Text>
        <Text>If you have any questions or if the following information is incorrect, please feel free to contact us!</Text>
    </Container>
    <Container>
        <Text>the new order number is: {orderNumber}</Text>
        <Text>{#each Object.keys(orderData) as key}
            {key}: {JSON.stringify(orderData[key])}
            <br>
        {/each}
        </Text>
    
        <Hr />
        <Heading as="h2">Items</Heading>
        {#each items as item}
        <Text>{item.name} - {item.cart_quantity} x {item.price}</Text>
        {/each}
    
        <Hr />
        <Heading as="h2">Customer</Heading>
        <Text>{customer}</Text>
        <Text>{email}</Text>
        <Text>{inPersonPickup ? 'In Person Pickup' : 'Shipping'}</Text>
        {#if !inPersonPickup}
        <Text>{shippingAddress}</Text>
        <Text>{postalCode}</Text>
        <Text>{city}</Text>
        <Text>{province}</Text>
        {/if}
    
    
        <Hr />
        <Heading as="h2">Totals</Heading>
        <Text>Subtotal: ${totals.subtotal}</Text>
        <Text>Shipping: ${totals.shipping}</Text>
        <Text>Tax: ${totals.tax}</Text>
        <Text>Total: ${totals.total}</Text>
    </Container>
</Html>