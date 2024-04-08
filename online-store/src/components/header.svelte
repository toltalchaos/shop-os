<script>
  
    const navigationItems = [
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "Cart", path: "/cart" },
    ];
  </script>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 5rem;
      padding: 0 2rem;
      background-color: #333;
      color: #fff;
      font-family: Arial, Helvetica, sans-serif;
    }
  
    .navigation-items {
      display: flex;
      gap: 2rem;
    }
  
    .navigation-item {
      text-decoration: none;
      color: #fff;
      font-size: 1.2rem;
      font-weight: bold;
    }
  
    .navigation-item:hover {
      color: #ccc;
    }
  
    .active {
      color: #ccc;
    }
  </style>
  
  <nav>
    <div>Sock City</div>
    <div class="navigation-items">
      {#each navigationItems as item}
        <a
          class="navigation-item"
          href={item.path}
        >{item.name}</a>
      {/each}
    </div>
  </nav>
  