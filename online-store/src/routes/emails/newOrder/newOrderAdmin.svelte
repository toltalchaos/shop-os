<!-- newOrder.svelte -->
<script>
    import { Button, Hr, Html, Text, Heading } from 'svelte-email';
    //https://svelte-email.vercel.app/docs/getting-started/installation

    export let orderNumber;
    export let orderData;
</script>

<style>
    /* Add your custom styles here */
</style>

<Html lang="en">
    <Heading as="h1">New Order Received</Heading>
    <Text>the new order number is: {orderNumber}</Text>
    <Text>{#each Object.keys(orderData) as key}
        {key}: {orderData[key]}
        <br>
    {/each}
    </Text>
</Html>