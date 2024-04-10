<script>
	// @ts-nocheck
	import { getExistingCategories } from '../lib/productHelpers';
	import allSocks from '../global/allItems';
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	export let categoryArray;
	let products = [];
	allSocks.subscribe((value) => {
		products = value;
	});

	let productsByCategory = getExistingCategories(products);
	let newCategoryInput = '';

	function addCategory(item) {
		categoryArray.update((value) => {
			value.push(item);
			value = [...new Set(value)];
			return value;
		});
	}

	function updatecategoryArray(event) {
		const category = event.target.value;
		if ($categoryArray.includes(category) && event.target.checked) {
			addCategory(category);
			console.log(
				'there has been an error where we are capable of double-adding a category',
				categoryArray,
				category
			);
		} else if ($categoryArray.includes(category) && !event.target.checked) {
			categoryArray.remove(category);
		} else if (!$categoryArray.includes(category) && event.target.checked) {
			console.log('adding category', category);
			addCategory(category);
		}
	}
	function addNewCategory(event) {
		addCategory(newCategoryInput);
		productsByCategory[newCategoryInput] = [];
	}
</script>

<div class="container">
	<div class="new-category">
		<input type="text" bind:value={newCategoryInput} />
		<button on:click|preventDefault={addNewCategory}> Add New Category to Item</button>
	</div>
	<div class="checkboxes">
		{#each Object.keys(productsByCategory) as category}
			<input
				type="checkbox"
				checked={$categoryArray.includes(category)}
				value={category}
				id={category}
				on:change={updatecategoryArray}
			/>
			<label for={category}
            style="background-color: {$siteData.primaryColor}; {$categoryArray.includes(category) ? 'opacity: 0.5' : ''}"
            >{category}</label>
		{/each}
	</div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .checkboxes {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .checkboxes input {
        margin: 0.5rem;
        padding: 0.5rem;
    }
    .new-category {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
</style>
