# Online Store Framework

Welcome to the future of e-commerce, where your store comes to life with ease. Our Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 and with contributions from our community (see contributions page), we’re not just a platform; we’re a community-driven journey towards an accessible online marketplace for all. No matter your tech skills, we make sure you’re not just keeping up—you’re setting the pace. Dive into our user-friendly manual and watch your store spring into action today!

**Version: v0.0.0-beta-1 (Work in Progress)**

## DIY Ownership Option Model

For now, we have decided to move forward with a very DIY ownership option model where the "manager" is in charge of curating all of the orders and order statuses, as well as receiving payment through e-transfer. This way, the app can remain free for anybody to use. Additional payment gateways may be added in later releases.

To the managers or potential managers, once youve created an environment file/deployed to a host load up the app and adjust the site settings. The defaults might be funky, but ideally, it's a single form to get it branded the way you want.

---

## Bug List

- Shipping and invoice totals not loading properly (NAN)
- Bug on product card focus element when in edit mode
- Bug on "track order" anchor tag in the order card (seems to go nowhere - this might be ok)
- Seller email coming back as [object object] for the new order details

## TODO:

- Sanitize image data for orders
- Implement user account functionality (manager only, no user data is stored)
- Manage product images
- Enhance emailing system to deliver meaningful data
- Add background and set colors to other pages
- Improve manager order management page to display the full list of orders and statuses (currently only a lookup by ID)
- Implement Firestore image management
- Address ambiguous "DATE" field in order management
- sort out hosting [ideally firebase](https://firebase.google.com/docs/hosting/)

### Documentation on Setup

- Creation of ENV file
- Gmail emailer instructions (turn on 2FA, get the password, enter account email and app password in .env)
- Firestore settings (manager account, tokens for .env)

## Future Enhancements

- Add site design options such as branding figures/images (2 options for site logos - large and small)
- additional payment methods + gateways
- Implement database data versioning/application version tagging for later releases
    - version category in DB + release version in some global setting somewhere
    - check the versions to match, if not match update the DB data to work where needed
- Include data/sales analytics in the management directories using visualization tools/components
    - [Victory Charts?](https://www.npmjs.com/package/victory)
- Explore order tracking insights, such as orders by day of the week, featured items vs non-featured, shipped vs non-shipped, and time to fulfillment

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