<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { get_discounts, set_discount, delete_discount } from '../../server/backendUtils';
    import { v4 } from 'uuid';
    // {
    //     discount_id: uuidv4(),
    //     name: "10% off",
    //     type: "percentage",
    //     amount: 10
    // }

	export let username = null;
	export let password = null;
	let discounts = null;
	let activeDiscount = null;

	onMount(async () => {
		discounts = await get_discounts(username, password);
		if( discounts == 'ERROR'){
			//there is a chance this fails when there are no discounts.... we can let it fail silently
			console.log('error loading discounts');
			discounts = null;
		}
	});

    async function saveDiscount(event) {
        event.preventDefault();
        let resp = await set_discount(activeDiscount, username, password);
		if( resp != 'ERROR'){
			alert('Discount saved successfully');
			discounts = await get_discounts(username, password);
			activeDiscount = null;
		}
		else{
			alert('Error saving discount');
		}
        activeDiscount = null;
    }
    async function deleteDiscount(discount) {
        let resp = await delete_discount(discount, username, password);
		if( resp != 'ERROR'){
			alert('Discount deleted successfully');
			discounts = discounts.filter(d => d.discount_id != discount.discount_id);
		}
		else{
			alert('Error deleting discount');
		}
    }


</script>

<div class="container">
	<h1>Site Discounts</h1>
	<p>Here you can manage the discounts that are available on your site.</p>
	<p>Click on the discount to view or edit the details.</p>
	<p>Click on the "Add Discount" button to create a new discount.</p>
	<p>Click on the "Delete" button to remove a discount.</p>
	<!-- button to create a new discount -->
    <button on:click={() => {
        // create a new discount object to be used as the active discount
        activeDiscount = {
            discount_id: v4().substring(0, 7),
            name: "",
            type: "",
            amount: 0
        }
    }}>Add New Discount</button>
	<div class="existing-discounts">
		{#if activeDiscount}
			<!-- form to edit the current active discount -->
			<form>
				<label for="discountName">Discount Name:
				<input type="text" id="discountName" bind:value={activeDiscount.name} required /></label>
				<label for="discountType">Discount Type:
				<select id="discountType" bind:value={activeDiscount.type} required>
					<option value="percentage">Percentage</option>
					<option value="fixed">Fixed</option>
				</select></label>
				<label for="discountAmount">Discount Amount:
				<input type="number" id="discountAmount" bind:value={activeDiscount.amount} required /></label>
				<button type="button" on:click={saveDiscount}>Save</button>
			</form>
		{/if}

		{#if discounts}
			{#each discounts as discount}
				<div class="discount">
					<h2>{discount.name}</h2>
					<h4>"{discount.discount_id}" is the discount code</h4>
					<p>Discount Type: {discount.type}</p>
					<p>Discount Amount: {discount.amount}</p>
					<button
						on:click={() => {
							activeDiscount = discount;
						}}>Edit</button
					>
					<!-- button to edit the discount by setting THIS discount to the activeDiscounts -->
					<button on:click={() => {deleteDiscount(discount)}}>Delete</button>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 100%;
		margin: 0 auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.existing-discounts form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 1rem;

	}
	.discount {
		border: 1px solid black;
		padding: 1rem;
		margin: 1rem;
	}
</style>