<script>
    // @ts-nocheck
  
    export let items = [];
  
    let subtotal = 0;
    let shipping = 10;
    let taxRate = 0.07;
    let tax = 0;
    let total = 0;
  
    // Calculate subtotal, tax, and total cost of items in the cart
    $: {
      subtotal = items.reduce((acc, item) => acc + item.price, 0);
      tax = subtotal * taxRate;
      total = subtotal + shipping + tax;
    }
  </script>
  
  <div class="invoice-page">
    <h2>Invoice</h2>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {#each items as item}
        <tr>
          <td>{item.name}</td>
          <td>${item.price.toFixed(2)}</td>
        </tr>
        {/each}
        <tr>
          <td>Subtotal:</td>
          <td>${subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Shipping:</td>
          <td>${shipping.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Tax ({(taxRate * 100).toFixed(0)}%):</td>
          <td>${tax.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total:</td>
          <td>${total.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <style>
    .invoice-page {
      padding: 20px;
    }
    
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      border-bottom: 2px solid;
      padding-bottom: 10px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    
    th,
    td {
      padding: 10px;
      text-align: left;
    }
    
    th {
      font-weight: bold;
      border-bottom: 2px solid #fff;
      text-transform: uppercase;
      font-size: 12px;
    }
    
    td {
      font-size: 16px;
      border-bottom: 1px solid #fff;
    }
    
    tbody tr:last-child td {
      font-weight: bold;
    }
    
    tbody tr:nth-child(odd) {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

  </style>