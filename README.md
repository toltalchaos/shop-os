# online store framework

Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 and contributors (see contributions page), we’re not just a platform; we’re a community-driven journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!

v0.0.0-beta-1 and very much WIP

```text
for now i have decided to move forward with a very DIY ownership option model where the "manager" is in charge of curating all of the orders and order statuses as well as recieving payment through e-transfer. this way the app can remain free for anybody to use. additional payment gateways may be added in later releases. 

to the managers or potential managers, load up the app and adjust the site settings, the defaults might be funky but ideally its a single form to get it branded the way you want.
```

---
## BUG LIST
- shipping and invoice totals not loading properly (NAN)
- bug on product card focus element when in edit mode
- bug on "track order" anchor tag in the order card (seems to go nowhere - this might be ok)
- seller email coming back as [object object] for the new order details

# TODO:

- sanitize image data for orders
- USER ACCOUNT (manager only, i dont believe in keeping user data)
- product image management
- flesh out emailing system to deliver meaningful data
- add background and set colours to other pages

- manager order management page should have the full list of orders and statuses. for now is just a lookup by ID
- firestore image management
- ambiguous "DATE" field in order managment

- CREATE DOCUMENTATION ON SETUP
    - ENV FILE CREATION
    - GMAIL EMAILER INSTRUCTIONS
        - turn on 2FA
        - get the password
        - enter account email and app password in .env
    - FIRESTORE SETTINGS
        - MANAGER ACCOUNT
        - TOKENS FOR .ENV


## future enhancements
- add site design options such as branding figures/images
    - 2 options for site logos - large - small

- Db data versioning/application version tagging for later releases.
- db version on root of DB
    - right now the static data is ever changing shape so it makes sense to keep changing. BUT it should return a field with the version number and there should be a way to update the shape of the storage when the version changes and expectes different data. 
        - expected data shape tied to version number. on update the data shape is managed.

- data/sales anylitics in the management directories (https://www.npmjs.com/package/victory) would be cool
    - use firebase queries to run analytics and pump the data into visuialization tools/components
    - order tracking will provide alot of insights... the following is a list of "interesting" metrics we could sort out.... likely in some python package adjacent to `online-store`
        - orders by day of the week
        - featured items vs non-featured
        - shipped vs non-shipped
        - time to fufilment

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
