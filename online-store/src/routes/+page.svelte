<script>
// @ts-nocheck

  import ProductCard from '../components/ProductCard.svelte';
  import allItems from '../global/allItems';
  import { getContext } from 'svelte';
  const siteData = getContext('siteData');

  let products = [];
  allItems.subscribe(value => {
    products = value;
    });

  let featuredProducts = [];
  featuredProducts = products.filter(product => product.featured === true);
 
  </script>
  
 
  
  <div class="home-page" style= "background-color: {$siteData.backgroundColor};">
    <div class="hero"  style= "background-color: {$siteData.secondaryColor};">
      <h1>Welcome to {$siteData.title}!</h1>
      <p>{$siteData.description}</p>
    </div>
  
    <h2>Featured Products</h2>
  
    <div class="featured-products">
      {#each featuredProducts as product}
        <ProductCard product={product} />
      {/each}
    </div>
  </div>
  

  <style>
    .home-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      text-align: center;
      font-family: 'Retro', sans-serif;
    }
  
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      margin-bottom: 3rem;
      border-radius: 1rem;
    }
  
    .hero h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
  
    .hero p {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  
    .featured-products {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 3rem;
    }
  </style>