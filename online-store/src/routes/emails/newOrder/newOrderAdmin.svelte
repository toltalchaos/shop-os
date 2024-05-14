<!-- newOrder.svelte -->
<script>
    import { Button, Hr, Html, Text, Heading, Container } from 'svelte-email';
    //https://svelte-email.vercel.app/docs/getting-started/installation

    export let orderNumber;
    export let orderData;
    export let senderEmail;

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
        <Text>Ta new order recieved! The new order number is: {orderNumber}</Text>
        <Heading as="h2">Whats next?</Heading>
        <Text>The customer has been instructed to send an E-transfer with their order number at {senderEmail} for an amount of ${totals.total}. once this has been recieved the shop admin can confirm payment via the order management portal and the updates will be automatically sent!</Text>
        <Hr />
    </Container>
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
    <Text>Subtotal: {totals.subtotal}</Text>
    <Text>Shipping: {totals.shipping}</Text>
    <Text>Tax: {totals.tax}</Text>
    <Text>Total: {totals.total}</Text>

</Html>