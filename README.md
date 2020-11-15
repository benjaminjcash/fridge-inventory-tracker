# Fridge Inventory Tracker

## About
The **Fridge Inventory Tracker** provides an “inventory dashboard” that displays all the food items in the fridge, their quantities, and the current “expiration health” of each item. Determining what you need to buy at the grocery store becomes as easy as checking boxes off a list. “At risk” items can be easily identified so that they can be used sooner rather than later. 

## MVP Features
- ### Users
    - When first landing on the single page application, users will be prompted to create a profile, along with their own virtual ***Fridge***
    - A user will *login* to the app to see their ***fridge***
    - A user can *logout* and be redirected to the welcome screen at any time
    - If a user forgets their password, they can fill out a form and provide the answer to their *security question* to change their password
- ### Fridge
    - Once logged in, a user can add *items* to their ***fridge***
    - When adding an *item* they specify details about the *item* such as the *name*, *type*, and *expiration date*
    - A user can delete and update *items* in their ***fridge***
- ### Inventory
    - The SPA will display the inventory in the users ***fridge*** after they have logged in.
    - The inventory will be...
        - *sortable*: items approaching their expiration date can be identified and used
        - *searchable*: it can be determined which items are needed for a given recipe
    - Many food items include an expiration date sticker on them, which will be manually entered by the user. However for those that don’t, there will be a fallback. The database will include a collection of common food items and their typical storage times. When one of these items is added to the inventory, the expiration date will be set based on the date of purchase.

## Additional Feature Ideas
- Public food-data API for nutritional information
- Recipe API for importing recipes and comparing ingredient lists to inventory
    - The recipe API could also be used to generate a list of recipe ideas based on the ingredients currently in the fridge. This would further encourage the goal of using what you have, and minimizing waste.
- Export utility for sending shopping lists to a mobile device
- Machine learning / AI could be utilized here by analyzing historical data on which foods you buy and when. After time, a shopping list could be automatically generated each week.

## Technologies
- The application will use the MERN stack:
    - web server built with Node.js and Express
    - database built with MongoDB
    - dynamic frontend built with React, Redux, BaseWeb
    - front-end tests with Jest, React Testing Library

## Installation Instructions
0. You must have *Node* installed, as well as *MongoDB* and *Mongo Shell*
1. Naviagate to root folder and run `npm install`
2. Navigate to the `client` folder and run `npm install`
3. Start mongo shell by running `mongo` then run `use fridge-inventory-tracker` to create database
4. Create a file called `jwt-config.js` in the `server` directory to hold the secret, shown below.
```
module.exports = {
    secret: 'yoursecret'
}
```
5. Start database server at port `27017` by running `mongod` (should be standard port chosen at installation)
6. Start express server by running `npm start` in root folder
7. Start react dev server by running `npm start` in client folder
8. Navtigate to `localhost:3000` in your browser to view the app