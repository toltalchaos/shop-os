# TODO:

- item categories field 
    - nested product cards

- init firestore client + .env settings

- use firestore for required data in the application
    - user account management
    - product data
    - website data
    - order data/status

- add user account for management pages login
    - store credentials -> or atleast the authenticated boolean

- cart/checkout
    - add count capabilities for the items available and in the cart
    - shipping
        - add logic for no shipping (pickup option)
        - dynamically adjust tax rate in components>invoice.svelte
        - dynamically adjust shipping rate in components>invoice.svelte
    - add payment/checkout flow
        - different payment types
        - e-transfer option 
    - order status flow
    - sort out order management/tracking
        - sub-directory in managment screens
        - order statuses
        - order number lookup for end-user

- ADD OAUTH firebase allows features for this on the backend. will need front end implementation

- data/sales anylitics in the management directories
    - use firebase queries to run analytics and pump the data into visuialization tools/components


---
# setup

- create firebase acct
- create users, 1 for the site to use and 1 for the site manager to use

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
