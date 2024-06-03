<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';

	export let images;
	
	// Convert single item to array in the case that there is only one image
	if (!Array.isArray(images)) {
		images = [images];
	}
	let currentIndex = 0;
	let timer;

	function nextImage() {
		currentIndex = (currentIndex + 1) % images.length;
	}

	
</script>

<div>
	<!-- would like to add functionality to click through the images -->
	{#if Array.isArray(images) && images.length > 1}
		{#each images as image, index}
				<img
				on:click={nextImage} on:keydown={nextImage}
					src={image}
					alt="rotating Carousel product images"
					class="carousel-image {index === currentIndex ? 'active' : 'inactive'}"
				/>
		{/each}
	{:else}
		<img src={Array.isArray(images) ? images[0] : images} alt="product images" />
	{/if}
</div>

<style>
	.inactive {
		transition: opacity 0.3s ease-in-out;
		opacity: 0;
	}
	.active{
		transition: opacity 0.3s ease-in-out;
		opacity: 1;
	}
	.carousel-image {
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: opacity 0.3s ease-in-out;
	}
	div {
		height: 15rem;
		width: min(15rem, 40vw);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
