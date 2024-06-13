<!-- newOrder.svelte -->
<script>
    import { Button, Hr, Html, Text, Heading } from 'svelte-email';
    //https://svelte-email.vercel.app/docs/getting-started/installation

    export let orderNumber;
    export let status;
</script>

<style>
    /* Add your custom styles here */
</style>

<Html lang="en">
    <Heading as="h1">Order Update!</Heading>
    <Text>Your order ({orderNumber}) has been updated.</Text>
    <Text>{#each Object.keys(status) as key}
        {key}: {status[key]}
        <br>
    {/each}
    </Text>
    <Text>If you have any questions, please feel free to contact us!</Text>
</Html>