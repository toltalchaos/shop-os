<script>
// @ts-nocheck

  import ProductCard from '../components/ProductCard.svelte';
  import allItems from '../global/allItems';

  let products = [];

  allItems.subscribe(value => {
    products = value;
    });

  let featuredProducts = [];
  featuredProducts = products.filter(product => product.featured === true);
  </script>
  
 
  
  <div class="home-page">
    <div class="hero">
      <h1>Welcome to Sock City!</h1>
      <p>We offer a wide selection of high-quality, retro-style socks.</p>
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
      background-color: #dfe2e2;
    }
  
    .hero {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      margin-bottom: 3rem;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
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
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      margin-bottom: 3rem;
    }
  
    .featured-product {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 300px;
      padding: 1.5rem;
      background-color: #fff;
      border-radius: 1rem;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
  
    .featured-product img {
      width: 100%;
      margin-bottom: 1rem;
    }
  
    .featured-product h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  
    .featured-product p {
      font-size: 1.2rem;
      color: #999;
      margin-bottom: 1rem;
    }
  
    .featured-product button {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
  
    .featured-product button:hover {
      background-color: #444;
    }
  </style>