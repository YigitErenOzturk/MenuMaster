MenuMaster

MenuMaster is a restaurant discovery and reservation application that allows users to explore restaurants, view menus, make reservations, and share reviews.

Features

User authentication (Login & Register)

Password reset functionality

Search and filter restaurants by city

Make restaurant reservations

Leave reviews for restaurants

View user profile with saved preferences

Technologies Used

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

API Communication: Fetch API for RESTful requests

Installation & Setup

Clone the repository:

git clone https://github.com/your-repo/MenuMaster.git

Navigate to the project directory:

cd MenuMaster

Install dependencies (for backend):

npm install

Start the backend server:

npm start

Open the index.html file in a browser to run the frontend.

API Endpoints

User Authentication

POST /api/users/register - Register a new user

POST /api/users/login - User login

POST /api/users/password-reset-request - Request a password reset

Restaurants

GET /api/restaurants - Get a list of all restaurants

POST /api/restaurants/register - Register a new restaurant

Reservations

POST /api/reservations - Make a reservation

GET /api/reservations/:userId - Get user reservations