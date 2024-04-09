<script>
  // @ts-nocheck

  import { getContext } from 'svelte';
  const siteData = getContext('siteData');
  	// @ts-nocheck
    const navigationItems = [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Cart", path: "/cart" },
    ];


  </script>
  
  <nav style= "color: {$siteData.textColor}; background-color: {$siteData.primaryColor};">
    <div><a href="/login"  style= "color: {$siteData.textColor}; text-decoration: none;">
      {$siteData.title}
    </a></div>
    <div class="navigation-items">
      {#each navigationItems as item}
        <a
          class="navigation-item"
          style= "color: {$siteData.textColor};"
          href={item.path}
        >{item.name}</a>
      {/each}
    </div>
  </nav>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5rem;
      padding: 0 2rem;
      font-family: Arial, Helvetica, sans-serif;
    }
  
    .navigation-items {
      display: flex;
      gap: 2rem;
    }
  
    .navigation-item {
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
    }
  </style>