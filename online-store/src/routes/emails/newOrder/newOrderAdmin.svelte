<!-- newOrder.svelte -->
<script>
    import { Button, Hr, Html, Text, Heading } from 'svelte-email';
    //https://svelte-email.vercel.app/docs/getting-started/installation

    export let orderNumber;
    export let orderData;
    console.log(orderData);
    const items = orderData.items;
    const customer = orderData.customerName;
    const email = orderData.customerEmail;
    const inPersonPickup = orderData.inPersonPickup;
    const shippingAddress = orderData.shippingAddress;
    const postalCode = orderData.postalCode;
    const city = orderData.city;
    const totals = orderData.totals;

</script>

<Html lang="en">
    <Heading as="h1">New Order Received</Heading>
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
    {/if}


    <Hr />
    <Heading as="h2">Totals</Heading>
    <Text>Subtotal: {totals.subtotal}</Text>
    <Text>Shipping: {totals.shipping}</Text>
    <Text>Tax: {totals.tax}</Text>
    <Text>Total: {totals.total}</Text>

</Html>