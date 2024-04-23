<script>
	// @ts-nocheck
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	export let imageArray;
	let newImageInput = null;
	//item.target.files
	function addNewImage(event) {
		imageArray.update((value) => {
			//check the input is a file
			if (event.target.files) {
				value.push(...event.target.files);
				value = [...new Set(value)];
			}
			//check the input is a string
			else if (typeof event.target.value === 'string') {
				value.push(event.target.value);
				value = [...new Set(value)];
			}
			return value;
		});
	}

	function removeImage(image) {
		imageArray.update((value) => {
			value = value.filter((image) => image !== image);
			return value;
		});
	}
</script>

<div class="container">
	<div class="new-image">
		<input type="file" bind:value={newImageInput} />
		<button on:click|preventDefault={addNewImage}> Add New Image to Item</button>
	</div>
	<div class="new-image">
		<input type="text" bind:value={newImageInput} />
		<button on:click|preventDefault={addNewImage}> Add New Image to Item (URL link)</button>
	</div>

	<!-- display all existing images -->
	<div class="image-boxes">
		{#each $imageArray as image}
			<img src={image} alt="product Photos" />
			<button on:click={() => removeImage(image)}>Delete Image</button>
		{/each}
	</div>
</div>

<style>
</style>
