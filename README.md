# online store framework

Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 and contributors (see contributions page), we’re not just a platform; we’re a community-driven journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!

v0.0.0-beta-1 and very much WIP
---

# TODO:

- new product category selection wont unselect
- multiple photo upload
- order updates to track lineage and times of updates
    - + comments fields
- add background and set colours to other pages
- checkout -> add contact info

- cart/checkout
    - shipping
        - add logic for no shipping (pickup option)
        - dynamically adjust tax rate in components>invoice.svelte
        - dynamically adjust shipping rate in components>invoice.svelte
    - tax rates?
    - add payment/checkout flow
        - different payment types
        - e-transfer option 
    - order number issuing
- refine order tracking

- init firestore client + .env settings

- use firestore for required data in the application
    - user account management
    - product data
        - IMAGE storage !!! this is a big one !!!
        - maybe save images to byte data? or just tell the users to insert a URL to the image?
    - website data
    - order data/status

- Db data versioning
    - right now the static data is ever changing shape so it makes sense to keep changing. BUT it should return a field with the version number and there should be a way to update the shape of the storage when the version changes and expectes different data. 
        - expected data shape tied to version number. on update the data shape is managed.

- ADD OAUTH firebase allows features for this on the backend. will need front end implementation

- data/sales anylitics in the management directories (https://www.npmjs.com/package/victory) would be cool
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
