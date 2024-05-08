<script>
    // @ts-nocheck
  
    export let items = [];
  
    export let totals = {
      subtotal: 0,
      shipping: 0,
      tax: 0,
      taxRate: 0,
      total: 0,
    };
  </script>
  
  <div class="invoice-page">
    <h2>Invoice</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Quantity</th>
          <th>Totals</th>
        </tr>
      </thead>
      <tbody>
        {#each items as item}
        <tr>
          <td>{item.name}</td>
          <td>{item.cart_quantity}</td>
          <td>{(item.price * item.cart_quantity).toFixed(2)}</td>
        </tr>
        {/each}
        <tr>
            <td colspan="2">Subtotal:</td>
          <td>${totals.subtotal}</td>
        </tr>
        <tr>
          <td colspan="2">Shipping:</td>
          <td>${totals.shipping}</td>
        </tr>
        <tr>
          <td colspan="2">Tax ({(totals.taxRate * 100)}%):</td>
          <td>${totals.tax}</td>
        </tr>
        <tr>
          <td colspan="2">Total:</td>
          <td>${totals.total}</td>
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