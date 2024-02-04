## Introduction

The Online Ordering is a web application that allows users to browse, select, and order products online. The system consists of a frontend built with React.js, a backend server using Node.js, and a MySQL database to store product information and user orders.

## Features

- User authentication and authorization
- Product catalog with details
- Shopping cart functionality
- Order placement and tracking
- Admin dashboard for managing products and orders

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MySQL
## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/RafikElRahmi/online-ordering
   cd online-ordering-system

2. Install frontend dependencies

    ```bash
    cd frontend
    npm install

3. Install backend dependencies

    ```bash
    cd server
    npm install

4. Create your db
you can use wampserver or  any other mysql server to create a database 

5. Setup .env file in backend
SECRET_KEY=your_secret_key
USERNAME=admin_username
PASSWORD=admin_password
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_db_name

6. Start the frontend

    ```bash
    cd frontend
    npm run dev

7. Start the backend

    ```bash
    cd ../backend
    npm run dev