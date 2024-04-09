# todo:

- add footer for Copywright and contact information (shopOs specific)
    - create email stuff for shopOS

- utilize external DB (firestore? AWS? custom API and DB?)
    - convert the invintory to not use a static json file
    - modularize things to dynamically populate the names, colours, photos
        - from commented out API call
    - utilize external DB for item management? - photos, invintory, ect...
        - user account
        - photos
        - invintory management
    - add user account for item management login (probably in the footer)

- cart/checkout
    - add count capabilities for the items available and in the cart
    - shipping
        - add logic for no shipping (pickup option)
        - dynamically adjust tax rate in components>invoice.svelte
        - dynamically adjust shipping rate in components>invoice.svelte
    - add payment/checkout flow
---
## Sock City
Sock City is a web application for an online sock store built using the Svelte framework.

## Installation
Clone the repository: git clone https://github.com/your-username/sock-city.git
Navigate to the project directory: cd sock-city
Install dependencies: npm install
Run the development server: npm run dev
Open http://localhost:5173 in your browser
Usage
Once the application is running, you can browse and purchase socks. You can add socks to your cart and checkout using the built-in checkout form.

## Features
Browse a selection of socks
Add socks to cart
Checkout using a form that collects customer information and payment details
Receive an invoice after checkout
Get a notification when a new order is received
