# FREE Online Store Framework

## demo [shop-os.web.app](https://shop-os.web.app/)

Welcome to the future of e-commerce, where your store comes to life with ease. This Open Source E-commerce software is the perfect solution for those who want to break free from big vendors and enjoy the simplicity of a drag-and-drop setup. Established in 2024 By Braydon Tol. No matter your tech skills, i want to make sure you’re not just keeping up—you’re setting the pace for your business. Dive into this (hopefully) user-friendly manual and watch your store spring into action today!

---

## Core Beliefs (a message to owners)

I believe in user data integrity and keeping the keys to the kingdom in the hands of small business owners. with this application the shop owner will have full control of everything from patches and tweaks to data storage and customer facing appearance.

for now there are quite a few steps to get the application deployed and live for the users. there should be (in the near future) a complete tutorial available and the details documented below in this document.

For now, we have decided to move forward with a very DIY approach to ownership where the "manager" or whoever is set up to send and recieve emails or status updates with customer communication is in charge of curating all of the orders and order statuses, as well as receiving payment through e-transfer. This way, the app can remain free for anybody to use. Additional payment gateways may be added in later releases.

This project is licensed under the MIT license, which allows anyone to use, modify, and distribute the software for any purpose, including commercial use, **without any restrictions or fees.**

## **Version: v1.1.0-beta (WIP)**

### branching and versioning strategy

when a new version is released please check out that "tag" instead of checking out `main` as `main` will be used to collect all the most current changes, many of which will be buggy and not work as intended or may have serious security flaws. when the kinks are all worked out there will be a release made and that release should be available for public consumption forever! so if someone updates and they dont like the new behaviour they may re-update back to the previous version. but as a rule **MAIN is experimental**

## TODO (things to refine before next release)

- implement logic for payment transfers + order status creation changes..
  - [SRIPE DOCS](https://docs.stripe.com/connect/design-an-integration?connect-onboarding-surface=api&connect-dashboard-type=none&connect-economic-model=buy-rate&connect-loss-liability-owner=platform&connect-charge-type=direct)
  - [GOOGLE PAY](https://developers.google.com/pay/api/web/overview)
  - [Paypal](https://developer.paypal.com/sdk/js/)
- document deployment strategy 
  - can any of the steps be eliminated or condensed with code?

## Documentation on Deployment

- pull latest/download specific release tag
- create .env
  - set up emailer
    - Gmail emailer instructions (turn on 2FA, get the app password, enter account email and app password in .env)
    - [more info on setup here](https://youtu.be/n8fVC5UFRjA?si=EMKlVPzWEET-4yiU)
  - set up firebase acct
    - Firestore settings (manager account, shopper account, tokens for .env)
  - RTDB + rules

---
    {
      "rules": {
        ".read": "auth != null && (auth.uid ==='<shopperUserID>' || auth.uid ==='<AdminUserID>')",
        ".write": "auth != null && (auth.uid ==='<shopperUserID>'|| auth.uid ==='<AdminUserID>')" 
      }
    }
---

- will need to update to pay-as-you-go plan
  - details here <https://firebase.google.com/pricing?hl=en&authuser=0&_gl=1*1llxviv*_ga*NzczNTk2OTgwLjE3MTI2NzYzMTU.*_ga_CW55HF8NVT*MTcxNTM2NzQ3Ny4yMS4xLjE3MTUzNjc4NDYuNTUuMC4w>
  - set up a $1 budget alert

<https://www.youtube.com/watch?v=W-kII4idtfE>

- install node.js
- install assets `npm install`
- To install Fiebase CLI: `npm install -g firebase-tools`
- To login to Firebase CLI: `firebase login`
- To enable webframeworks flag: `firebase experiments:enable webframeworks`
- To initialize Firebase in your project: `firebase init`
  - Detected an existing SvelteKit codebase in the current directory, should we use this? `Yes`
- To deploy: `firebase deploy`

- firebase console allows you to add a custom domain if a person so wishes. this can be done retroactively

### Updates

- pulling latest
- check .env hasnt been updated
- re-deploy

## Future Enhancements (idea dumping ground)

- bulk actions for product/order management
- product items should have "options".... this might need a relational DB.... firebase DOES offer this now though so it might be good for server functions...????
  - something like "size" or "colour" should be available to create and select from.. then those should have individual inventory counts...
- implement a better order tracking system (some kind of gridview?)
- figure out deployment and versioning procedure... how do we get non-tech users setup?..... can we make an .EXE file that will run the user through a setup wizard?.....
- versioning -> field in DB to manage DB schema shape...
- more site configuration options -> long term a better site management page
  - Add site design options such as branding figures/images (2 options for site logos - large and small)  
- Include data/sales analytics in the management directories using visualization tools/components
  - [Victory Charts?](https://www.npmjs.com/package/victory)
- Explore order tracking insights, such as orders by day of the week, featured items vs non-featured, shipped vs non-shipped, and time to fulfillment
  - python package adjacent to `online store`?
  - spark job with graphic outputs? matplotlib?
- integrate a setup wizard?
  - .sh file to auto deploy for the user?
  - secondary site to make changes and deliver a ZIP with the customer site information?
