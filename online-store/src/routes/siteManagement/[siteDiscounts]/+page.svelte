<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { get_discounts, set_discount, delete_discount } from '../../../server/backendUtils';
    import { v4 } from 'uuid';
    // {
    //     discount_id: uuidv4(),
    //     name: "10% off",
    //     type: "percentage",
    //     amount: 10
    // }

	let discounts = null;
	let activeDiscount = null;

	onMount(async () => {
		if (!localStorage.getItem('username') || !localStorage.getItem('password')) {
			window.location.href = '/login';
		}
		// Check if the user has been logged in for more than an hour
		if(localStorage.getItem('loginTime') < new Date().getTime() - 3600000){
			window.location.href = '/login';
			localStorage.clear();
		}
        discounts = await get_discounts();
	});

    async function saveDiscount(event) {
        event.preventDefault();
        await set_discount(activeDiscount, localStorage.getItem('username'), localStorage.getItem('password'));
        activeDiscount = null;
    }
    async function deleteDiscount() {
         await delete_discount(activeDiscount, localStorage.getItem('username'), localStorage.getItem('password'));
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
				<label for="discountName">Discount Name:</label>
				<input type="text" id="discountName" bind:value={activeDiscount.name} required />
				<label for="discountType">Discount Type:</label>
				<select id="discountType" bind:value={activeDiscount.type} required>
					<option value="percentage">Percentage</option>
					<option value="fixed">Fixed</option>
				</select>
				<label for="discountAmount">Discount Amount:</label>
				<input type="number" id="discountAmount" bind:value={activeDiscount.amount} required />
				<button type="submit" on:click={saveDiscount}>Save</button>
			</form>
		{/if}

		{#if discounts}
			{#each discounts as discount}
				<div class="discount">
					<h2>{discount.name}</h2>
					<p>Discount Type: {discount.type}</p>
					<p>Discount Amount: {discount.amount}</p>
					<button
						on:click={() => {
							activeDiscount = discount;
						}}>Edit</button
					>
					<!-- button to edit the discount by setting THIS discount to the activeDiscounts -->
					<button on:click={deleteDiscount}>Delete</button>
				</div>
			{/each}
		{/if}
	</div>
</div>
