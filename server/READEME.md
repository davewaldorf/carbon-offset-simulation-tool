# Carbon Offset Simulator - Server

The server component of the Carbon Offset Simulator is responsible for handling the back-end logic and APIs. It facilitates communication between the client and any external data sources or calculations.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [API Routes](#api-routes)
- [Models](#models)
- [Controllers](#controllers)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

The server component is the backbone of the Carbon Offset Simulator application. It handles data, computations, and communication with the client component.

## Getting Started

To run the server application, follow these steps:

1. Ensure that Node.js is installed on your machine.

2. Open a terminal or command prompt and navigate to the server folder.

3. Install server dependencies by running:

  ```bash
  npm install
  ```

4. Start the server by running:

  ```bash
  npm start
  ```

  This will start the server on the specified port.

## API Routes

The server defines the following API routes:

- `/countries/:country`: Get the average CO2 consumption for a specific country.
- `/countries`: Get a list of available country names.
- `/offset`: Calculate the total CO2 offset based on tree purchases.

You can further customize and extend these routes to meet the specific needs of your application.

## Models

The server uses models to manage data. The following models are defined:

- `treeModel.js`: Contains data related to trees, such as their initial cost, annual cost, CO2 offset, and growth information.
- `countryModel.js`: Provides data about CO2 consumption for different countries and offers functions to access this information.

You can modify these models or add more models as per your application requirements.

## Controllers

The server's controllers handle the application's business logic. Here are the primary controllers:

- `userOffsetController.js`: This controller calculates the total CO2 offset based on tree purchases. It performs complex calculations related to tree age, CO2 offset, and purchase dates.

- `countryController.js`: This controller manages the average CO2 consumption data for countries. It allows you to get consumption data for a specific country or retrieve a list of available country names.

Customize and extend these controllers as needed to match the behavior of your application.

## Dependencies

The server application relies on the following Node.js modules, which can be found in the `package.json` file:

- `express`: A web application framework for handling routes and middleware.
- `body-parser`: Middleware to parse request bodies as JSON.
- `cors`: Middleware for configuring Cross-Origin Resource Sharing (CORS).
- `express-session`: Middleware for handling user sessions.
- `uuid`: Library for generating UUIDs.
- `nodemon`: A development tool that automatically restarts the server when code changes are detected.

Make sure to install and manage these dependencies to ensure the proper functioning of the server component.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
