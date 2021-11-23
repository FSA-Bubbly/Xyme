# Xyme
Welcome to Xyme! Your personalized medication and supplementation tracker.

## Features

* Account/profile creation
* Wallet-view to list all added medications/supplements, including basic information for each
* Summary information to remind users of optimal ingestion instructions from their GP
* Lists any potential conflicts between medications/supplements
* Add medications/supplements to wallet via image scanning

## Tech Stack

* React (Components and Routes)
* Redux (state management)
* Express - 4.16.4
* Axios - 0.21.1
* PostgresQL - Database
* Bcrypt and JWT for authentication and authorization
* ~Image scanning~

## Setup

1. clone this repo to your local environment -- git clone < git repository >
2. cd (change directory) into the repo
3. $run 'npm install' into your command line
4. $run 'npm run seed' into your command line
5. $run 'npm start:dev' into your command line
6. Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

### Other options
- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

## What's next?

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pulvinar, diam vitae ornare molestie, velit mi consequat tellus, non accumsan augue metus et turpis.
