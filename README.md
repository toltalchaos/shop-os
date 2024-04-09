# todo:
- sort out order management/tracking
    - sub-directory in managment screens
    - order statuses
    - order number lookup for end-user

- utilize external DB (firestore?) -> the update readme with setup instructions
    - convert the invintory to not use a static json file (firebase firestore)
        - rtdb?
        - use .env auth stuff for the item calls
    - modularize things to dynamically populate the names, colours, photos
        - use firestore document for site settings
        - from commented out API call - https://firebase.google.com/docs/firestore/quickstart#node.js_2
    - add user account for item management login - https://firebase.google.com/docs/auth/web/password-auth
        - store credentials (localstorage)
        - new page for item management (use localstorage for creds NOT .env)
            - list of existing items -> edit button
                - adjust counts on items
                - adjust text/photos/prices on items
            - +new item button+ (accordion?)
                - price
                - featured
                - desc
                - photo
                - quantity
        - new page for store management -> update firestore document
            - add firestore functionality

    - utilize external DB for item management? - photos, invintory, ect...
        - user account
        - photos
        - invintory management

- cart/checkout
    - add count capabilities for the items available and in the cart
    - shipping
        - add logic for no shipping (pickup option)
        - dynamically adjust tax rate in components>invoice.svelte
        - dynamically adjust shipping rate in components>invoice.svelte
    - add payment/checkout flow

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
