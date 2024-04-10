<script>
	// @ts-nocheck
	import { onMount, onDestroy } from 'svelte';

	export let images;
	// Convert single item to array in the case that there is only one image
	if (!Array.isArray(images)) {
		images = [images];
	}
	export let interval = 3000; // 3 seconds
	let currentIndex = 0;
	let timer;

	function startCarousel() {
		timer = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, interval);
	}

	function stopCarousel() {
		clearInterval(timer);
	}

	onMount(() => {
		startCarousel();
	});

	onDestroy(() => {
		stopCarousel();
	});
</script>

<div>
    <!-- would like to add functionality to click through the images -->
    {#if images.length > 1}
        <img src={images[currentIndex]} alt="rotating Carousel product images" class="carousel-image"/>
        {:else}
        <img src={images[currentIndex]} alt="rotating Carousel product images"/>
    {/if}
</div>

<style>
    /* would be nice to provide sliders for this... but its fine for now */
       @keyframes fadeOut {
            0% {
            opacity: 1;
            }
            95% {
            opacity: 1;
            }
            99% {
            opacity: 0.5;
            }
            100% {
            opacity: 1;
            }
        }

    .carousel-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        animation: fadeOut 5s ease-out infinite;
     
    }
    div {
        width: 100%;
        height: 100%;
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
