<script>
  // @ts-nocheck

  import ProductCard from '../../components/ProductCard.svelte';
	import CategoryCard from '../../components/categoryCard.svelte';
  import allSocks from '../../global/allItems';
  import { writable } from 'svelte/store';
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
      displayedProducts=filterProducts(products);
    }
  

  function filterProducts(products) {
    return products.filter(product => {
      const productName = product.name.toLowerCase().includes(searchValue);
      return productName;
    });
  }
</script>

<div class="container" style= "background-color: {$siteData.backgroundColor};">
  <!-- search bar -->
  <CategoryCard bind:products={displayedProducts}/>
  <hr>
  <h3>All Products</h3>
  <input type="text" placeholder="Search all products" class="search-bar" on:input={handleSearch} />
  <div class="product-list">
    {#each displayedProducts as product} 
    <ProductCard product={product} />
    {/each}
  </div>
</div>

<style>
  h3 {
    text-align: center;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .search-bar {
    width: 50%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    border-radius: 0.5rem;
  }
</style>
