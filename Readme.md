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

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd server
npm install

# Create your db
you can use wampserver or  any other mysql server to create a database 

# Setup .env file in backend
SECRET_KEY=your_secret_key
USERNAME=admin_username
PASSWORD=admin_password
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=your_db_name

# Start the frontend
cd frontend
npm run dev

# Start the backend
cd ../backend
npm run dev