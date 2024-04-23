<script>
	// @ts-nocheck
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	//incoming image array store object from parent component
	export let imageArray;
	let newImageInput = null;
	let newimagefile = null;
	function addNewImage(image) {
		imageArray.update((value) => {
				value.push(image);
				value = [...new Set(value)];
			return value;
		});
	}

	function removeImage(image) {
		imageArray.update((value) => {
			value = value.filter((current_val) => current_val !== image);
			return value;
		});
	}
</script>

<div class="container">
	<div class="new-image">
		<input type="file" bind:value={newimagefile} />
		<button on:click|preventDefault={()=>{addNewImage(newimagefile)}}> Add New Image to Item</button>
	</div>
	<div class="new-image">
		<input type="text" bind:value={newImageInput} />
		<button on:click|preventDefault={addNewImage(newImageInput)}> Add New Image to Item (URL link)</button>
	</div>
	<div class="image-boxes">
		{#each $imageArray as image}
		<div>
			<img src={image} alt="product Photos" />
			<button on:click={() => removeImage(image)}>Delete Image</button>
		</div>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap:1rem;
	}
	.new-image {
		display: flex;
		flex-direction: row;
	}
	.image-boxes{
		gap:1rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		}

</style>
