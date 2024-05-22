# Online Store Framework

Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 and with contributions from our community (see contributions page), we’re not just a platform; we’re a community-driven journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!

**Version: v0.0.0-beta-1 (Work in Progress)**

## DIY Ownership Option Model

For now, we have decided to move forward with a very DIY ownership option model where the "manager" is in charge of curating all of the orders and order statuses, as well as receiving payment through e-transfer. This way, the app can remain free for anybody to use. Additional payment gateways may be added in later releases.

To the managers or potential managers, once youve created an environment file/deployed to a host load up the app and adjust the site settings. The defaults might be funky, but ideally, it's a single form to get it branded the way you want.

---

## Bug List

- Bug on product card focus element when in edit mode
- discount needs to re-calculate properly after supplying a second discount code

## TODO
- validation on checkout
  - make sure theres actually an order.
  
- checkout page functionality, numbers
- email templates to better use the data in a product-like component
- Manage product images (Blob or binary for uploads?)
- Implement database data versioning/application version tagging for later releases
  - version category in DB + release version in some global setting somewhere
  - check the versions to match, if not match update the DB data to work where needed
- update readme to reflect values of data integrity, free use, and open code
  - update footer to reflect the same

- improve emails to be more well formatted

- figure out deployment and versioning procedure... how do we get non-tech users setup?

### Documentation on Setup

- Creation of ENV file
  - Gmail emailer instructions (turn on 2FA, get the password, enter account email and app password in .env)
  - Firestore settings (manager account, shopper account, tokens for .env)

create RTDB with the following rule modified for the admin
only allowing reading and writes from the admin and user profile in this app.

---

we want the users to be able to GET all the data,
we want the users to be able to write(create) new orders, and subsequently update the products (but not delete)

we want the admin to only be able to read and write to the site_data portion
admin should have full read and write access to everything

```
{
  "rules": {
    ".read": "auth != null && (auth.uid ==='' || auth.uid ==='')",
    ".write": "auth != null && (auth.uid ==='' || auth.uid ==='')" 
  }
}
```

---

## deployment

npm install firebase
npm install -g firebase-tools
firebase login
firebase init
firebase deploy

<https://www.youtube.com/watch?v=W-kII4idtfE>

- To install Fiebase CLI: npm install -g firebase-tools
- To login to Firebase CLI: firebase login
- To enable webframeworks flag: firebase experiments:enable webframeworks
- To initialize Firebase in your project: firebase init
- To deploy: firebase deploy

- will need to update to pay-as-you-go plan
  - details here <https://firebase.google.com/pricing?hl=en&authuser=0&_gl=1*1llxviv*_ga*NzczNTk2OTgwLjE3MTI2NzYzMTU.*_ga_CW55HF8NVT*MTcxNTM2NzQ3Ny4yMS4xLjE3MTUzNjc4NDYuNTUuMC4w>
  - set up a $1 budget alert

## Future Enhancements

- more site configuration options -> long term a better site management page
  - Add site design options such as branding figures/images (2 options for site logos - large and small)
- additional payment methods + gateways
- Include data/sales analytics in the management directories using visualization tools/components
  - [Victory Charts?](https://www.npmjs.com/package/victory)
- Explore order tracking insights, such as orders by day of the week, featured items vs non-featured, shipped vs non-shipped, and time to fulfillment
  - python package adjacent to `online store`?
  - spark job with graphic outputs? matplotlib?
- integrate a setup wizard?
  - .sh file to auto deploy for the user?
  - secondary site to make changes and deliver a ZIP with the customer site information?

---

# Setup

For now, developers can refer to the readme in "online-store". Eventually, a full setup guide will be provided here for non-developers.

---

# User Flow

1. Home page: View featured items
2. Navigate to products
3. View products and add them to the cart
4. Navigate to the cart
5. Adjust item quantities and cart contents
6. Proceed to checkout
7. View invoice and fill out the form
8. Submit the order
9. Order number is generated and order is saved
10. Navigate to orders
11. Input order number
12. View order status

# Management Flow

- Managers are the only ones with logins (through Firebase/static)
- They can edit the values on the management page
- Use the order editor to update orders

I hope this revised version is more readable and better formatted for your needs. Let me know if you need any further assistance!
