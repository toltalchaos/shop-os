<script>
  // @ts-nocheck

  import ProductCard from '../../components/ProductCard.svelte';
  import allSocks from '../../global/allItems';
  import { getContext } from 'svelte';
  const siteData = getContext('siteData');
  let products = [];
  allSocks.subscribe(value => {
    products = value;
  });
  
  let searchValue = '';
  let displayedProducts = products;
  
  function handleSearch(event) {
    searchValue = event.target.value.toLowerCase();
    displayedProducts = filterProducts(products);
  }

  function filterProducts(products) {
    return products.filter(product => {
      const productName = product.name.toLowerCase().includes(searchValue);
      return productName;
    });
  }
</script>

<div class="container">
  <!-- search bar -->
  <input type="text" placeholder="Search products" on:input={handleSearch} />

  <div class="product-list">
    {#each displayedProducts as product} 
    <ProductCard product={product} />
    {/each}
  </div>
</div>

<style>

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    padding: 1.5rem;
    background-color: var(--bg-color);
    border-radius: 1rem;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
    border: 2px solid var(--primary-color);
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .product-card:hover {
    transform: scale(1.1);
    border-color: var(--secondary-color);
    box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.4);
  }

  .product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 1rem;
    filter: brightness(70%);
    transition: all 0.3s ease;
  }

  .product-card:hover img {
    filter: brightness(100%);
  }

  .product-card h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .product-card p {
    font-size: 1.2rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    text-align: center;
  }

  .product-card button {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .product-card button:hover {
    background-color: var(--secondary-color);
  }
</style>
