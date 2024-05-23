<script>
	// @ts-nocheck
	import { getContext } from 'svelte';
	const siteData = getContext('siteData');
	//incoming image array store object from parent component
	export let imageArray;
	let newImageInput = null;
	let newimagefile = null;

	const acceptedFileTypes = [
		'image/apng',
		'image/bmp',
		'image/gif',
		'image/jpeg',
		'image/pjpeg',
		'image/png',
		'image/svg+xml',
		'image/tiff',
		'image/webp',
		'image/x-icon'
	];

	function validateFileType(imageFile) {
		return acceptedFileTypes.includes(imageFile.type);
	}

	function addNewImageFile(event) {
		event.preventDefault();
		let fileObject = newimagefile[0] // this will be the file object

		if (!validateFileType(fileObject)) {
			alert('Invalid file type. Please upload an image file.');
			return;
		}
		// parse the file into binary data
		const reader = new FileReader();
		reader.onload = (event) => {
			const image = event.target.result;
			addNewImage(image);
		};
		reader.readAsDataURL(fileObject);
		// clear the file input
		newimagefile = null;
	}

	function addNewImage(imageUrl) {
		imageArray.update((value) => {
			value.push(imageUrl);
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
		<input type="file" accept="image/*" bind:files={newimagefile} />
		<button on:click|preventDefault={addNewImageFile}> Add New Image to Item</button>
	</div>
	<div class="new-image">
		<input type="text" bind:value={newImageInput} />
		<button on:click|preventDefault={addNewImage(newImageInput)}>
			Add New Image to Item (URL link)</button
		>
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
		gap: 1rem;
	}
	.new-image {
		display: flex;
		flex-direction: row;
	}
	.image-boxes {
		gap: 1rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
