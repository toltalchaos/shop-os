# online store framework

Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 and contributors (see contributions page), we’re not just a platform; we’re a community-driven journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!

v0.0.0-beta-1 and very much WIP
---

# TODO:

- create static files for products, orders, manager accounts, and site settings to make the server files call/write to as needed
    - (RIGHT NOW IS JUST ALL LOCATED IN SERVER.FIREBASECLIENT.JS)
- multiple photo upload
- order updates to track lineage and times of updates
- add background and set colours to other pages

- cart/checkout
    - shipping
        - dynamically adjust tax rate in components>invoice.svelte
        - dynamically adjust shipping rate in components>invoice.svelte
    - tax rates?
    - add payment/checkout flow
        - different payment types (payment gateways)
        - e-transfer option 
    - order number issuing
        - sendgrid email system??? for both orders and updates
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

- for now devs look at the readme in "online-store" eventually i will put a full setup guide here for non-devs

--- 
# user flow

- home page viewing featured
- navigate to products
- view products, add some to cart
- navigate to cart
- adjust counts and cart contents
- checkout
- view invoice, fill form
- submit
- order number is generated and order is saved
- navigate to orders
- input order number
- view order status

# management flow

- managers are the only ones with logins (through firebase/static)
- they can edit the values on the management page
- order editor to update orders
