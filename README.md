# Ensign Pre-assessment assignment

## Assignment 1
Please download `assignment-1-html-css` folder, and open `index.html` in your web browser.

#### Technical decisions and assumptions
- tested on latest Firefox, Chrome, and Safari web browsers
- uses `rem` units for flexibility, but no breakpoints have been set, so the layout is not responsive
- uses `modern-normalize` stylesheet to reset base CSS styles for consistency across different browsers

## Assignment 2
Please download both `assignment-2-back-end` and `assignment-2-shopping-cart` folders.

### Database
We are using *PostgreSQL* (psql) in a *Docker* container to provide a database service to the application. Please follow these instructions to set up the container.

#### Setup instructions

1. In your terminal, open the root folder of this repository (where this `README.md` file is located)
2. Run the command `docker compose up`
3. Done

This will build, create, start, and attach the psql container. By default, it can be accessed on port 55000, with the following connection URI: `postgres://postgres:postgrespw@localhost:55000/shopping-cart`

If you need to change the default settings, you can edit the `./docker-compose.yml` file.

### Back-end (`assignment-2-back-end`)
The back-end is built on *NodeJS* with the *Express* framework. We use *TypeScript* for part of our application to provide type annotation and checking.

#### Setup instructions
1. In your terminal, open the `assignment-2-back-end` folder of this repository
2. Run the command `npm install` to fetch and install all the project dependencies
3. Copy and rename `sample.env` to `.env` to provide the necessary configuration for the back-end service
4. Edit `.env` to suit your environment (default port is `4000`, database connection URI follows above)
5. Run the command `npm start` to start the application, and connect to the database
6. In your web browser, open `http://localhost:4000/setupData` (adjust URL as necessary) to setup the tables and sample data in the database
7. Done

#### Technical decisions and assumptions
- uses *Sequelize* ORM (https://sequelize.org/) to simplify Model definition and querying
- uses *`bcryptjs`* and *`jsonwebtoken`* for authentication, generating, and verifying access token
- front-end views are not provided, as the routes will be consumed as a JSON API

### Front-end (`assignment-2-back-end`)
The front-end is built with the *React* library. *Jotai* is used to handle shared state managmement (more details below), and *Tailwind CSS* is used to simplify writing CSS for the UI.

#### Setup instructions
1. In your terminal, open the `assignment-2-front-end` folder of this repository
2. Run the command `npm install` to fetch and install all the project dependencies
3. Copy and rename `sample.env` to `.env` to provide the necessary configuration for the front-end service
4. Edit `.env` to suit your environment (default front-end service port is `3000`, default back-end URL is `http://localhost:4000`)
5. Run the command `npm start` to start the application
6. In your web browser, open `http://localhost:3000` (adjust URL as necessary) to view the application
7. Done

#### Usage instructions
1. Register a user account by navigating to the **Register** (`http://localhost:3000/register`) page 
2. Login to that user account in the **Login** (`http://localhost:3000/login`) page
3. After logging in, access the **Products** (`http://localhost:3000/products`) page to view a list of products
4. Select a product and click to visit the **Product detail** (e.g. `http://localhost:3000/product/1`) page, where you can add the product to the cart 
5. Review your cart in the **Cart** (`http://localhost:3000/cart`) page, where you can adjust the quantity or remove the item
6. Once you are satisfied with the items in your cart, you can click the **Check Out** button in the **Cart** page to save your order
7. Your saved orders can be reviewed in the **Orders** (`http://localhost:3000/orders`) page
8. Once you are finished with your session, you may log out of the application by clicking on the "**Logout**" link in the top right corner—this will clear your user access token (but preserve your cart for future sessions)
9. The user access token will expire 1 hour after logging in, and you will be returned to the **Home** page to login or register again
 
#### Technical decisions and assumptions
- shared state across the application (e.g. Cart, User, and Products) is handled by Jotai, while component-level state is handled by React's built-in `useState` hook
- Products, Users, and Orders are stored in the database for persistence, and ease of managing the multiple user nature
- the Cart is stored in `localStorage` for simplicity and persistence (e.g. when restarting web browser), although this will present the same cart across different user accounts if logged in on the same web browser
- the User access token is also stored in `localStorage` for simplicity and persistence, but this is validated whenever the user attempts to access a protected route, e.g. Products or Orders. The token is valid for 1 hour after logging in
- no breakpoints have been set, so the layout is not responsive (apart from the default Tailwind CSS considerations)
- messages (e.g. "Logged in successfully", "Order saved", etc.) are currently static, but if needed, a message flashing package and transition package can be used to improve the UX
- additional features like Forgot...Reset Password, Product page categorisation, sorting, and pagination, etc. can be introduced to improve the UX, but not included due to time constraint

