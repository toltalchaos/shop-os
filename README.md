# Online Store Framework

Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 and with contributions from our community (see contributions page), we’re not just a platform; we’re a passionate team on a journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!

---

## our core beliefs, a message to owners

we believe in user data integrity and keeping the keys to the kingdom in the hands of small business owners. with this application the shop owner will have full control of everything from patches and tweaks to data storage and customer facing appearance.

for now there are quite a few steps to get the application deployed and live for the users. there should be (in the near future) a complete tutorial available and the details documented below in this document.

This project is licensed under the MIT license, which allows anyone to use, modify, and distribute the software for any purpose, including commercial use, **without any restrictions or fees.**

## **Version: v0.0.0-beta (Work in Progress)**

## Ownership Model

For now, we have decided to move forward with a very DIY approach to ownership where the "manager" or whoever is set up to send and recieve emails or status updates with customer communication is in charge of curating all of the orders and order statuses, as well as receiving payment through e-transfer. This way, the app can remain free for anybody to use. Additional payment gateways may be added in later releases.

---

## Bug List

    - checkout page functionality
      - discount needs to re-calculate properly after supplying a second discount code
      - number calculations on changing fields

## TODO (things to refine before next release)

- email templates to better use the data in a product-like component

- order instructions needs more information about the order (items...)

- validation on checkout
  - make sure theres actually an order.

- refine database rules to lock off read and write functionality per-user per-endpoint

### branching and versioning strategy

when a new version is released please check out that "tag" instead of checking out `main` as `main` will be used to collect all the most current changes, many of which will be buggy and not work as intended or may have serious security flaws. when the kinks are all worked out there will be a release made and that release should be available for public consumption forever! so if someone updates and they dont like the new behaviour they may re-update back to the previous version. but as a rule **MAIN is experimental**

### Documentation on Setup

- pulling code
- installing Node.js
- Creation of ENV file
  - Gmail emailer instructions (turn on 2FA, get the app password, enter account email and app password in .env)
  - Firestore settings (manager account, shopper account, tokens for .env)
- firebase user account, and a manager account
- RTDB creation + rules

---
    {
      "rules": {
        ".read": "auth != null && (auth.uid ==='<userID>' || auth.uid ==='<userID>')",
        ".write": "auth != null && (auth.uid ==='userID' || auth.uid ==='userID')" 
      }
    }
---

## deployment

- will need to update to pay-as-you-go plan
  - details here <https://firebase.google.com/pricing?hl=en&authuser=0&_gl=1*1llxviv*_ga*NzczNTk2OTgwLjE3MTI2NzYzMTU.*_ga_CW55HF8NVT*MTcxNTM2NzQ3Ny4yMS4xLjE3MTUzNjc4NDYuNTUuMC4w>
  - set up a $1 budget alert
```
  npm install firebase
  npm install -g firebase-tools
  firebase login
  firebase experiments:enable webframeworks
  firebase init
  firebase deploy
```

<https://www.youtube.com/watch?v=W-kII4idtfE>

- To install Fiebase CLI: `npm install -g firebase-tools`
- To login to Firebase CLI: `firebase login`
- To enable webframeworks flag: `firebase experiments:enable webframeworks`
- To initialize Firebase in your project: `firebase init`
- To deploy: `firebase deploy`

- firebase console allows you to add a custom domain


## Future Enhancements (idea dumping ground)

- product items should have "options".... this might need a relational DB.... firebase DOES offer this now though so it might be good for server functions...????
  - something like "size" or "colour" should be available to create and select from.. then those should have individual invintory counts...
- implement a better order tracking system (some kind of gridview?)
- figure out deployment and versioning procedure... how do we get non-tech users setup?..... can we make an .EXE file that will run the user through a setup wizard?.....
- versioning -> field in DB to manage DB schema shape...
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

## Developer Setup

For now, developers can refer to the readme in "online-store". Eventually, a full setup guide will be provided here for non-developers.

## User Flow

1. Home page: View featured items
2. Navigate to products
3. View products and add them to the cart
4. Navigate to the cart
5. Adjust item quantities and cart contents
6. Proceed to checkout
7. View invoice and fill out the form
8. Submit the order
9. Order number is generated and order is saved, user is re-directed to the order confirmation page
10. user recieves an email about the new order
11. Navigate to orders
12. Input order number and email
13. View order status

# Management Flow

- Managers are the only ones with logins (through Firebase/static)
- They can edit the values on the management page
- create modify or delete discount codes
- Use the order editor to update orders
