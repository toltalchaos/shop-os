# online store framework
    Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 and contributors (see contributions page), we’re not just a platform; we’re a community-driven journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!

v0.0.0-beta-1 and very much WIP
---

# TODO:

- product enhancements
    - item categories field 
        - nested product cards within category
        - category tags on edit forms (read all existing tags to highlight and select and additional new-tag field)
    -category image => carousel component of inner-product images

- init firestore client + .env settings

- use firestore for required data in the application
    - user account management
    - product data
        - IMAGE storage
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

- properly add contributions page
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
