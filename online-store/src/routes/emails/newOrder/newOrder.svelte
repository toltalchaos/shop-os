<!-- newOrder.svelte -->
<script>
    import { Button, Hr, Html, Text, Heading } from 'svelte-email';
    //https://svelte-email.vercel.app/docs/getting-started/installation

    export let orderNumber;
</script>

<style>
    /* Add your custom styles here */
</style>

<Html lang="en">
    <Heading as="h1">New Order Received</Heading>
    <Text>Thank you for your order! Your order number is: {orderNumber}</Text>
    <Text>We will process your order and notify you once it has been shipped.</Text>
    <Text>If you have any questions, please feel free to contact our customer support.</Text>
</Html>