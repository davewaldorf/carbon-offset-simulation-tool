# Carbon Offset Simulator - Client

The `client` folder contains the front-end part of the Carbon Offset Simulator application.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The client component of the Carbon Offset Simulator is responsible for the user interface and interactions. It provides a web-based interface for users to estimate and offset their carbon emissions by purchasing trees.

## Getting Started

To set up and run the client application, follow these steps:

1. Change directory to the `client` folder.
2. Install client dependencies by running: 

  ```bash
  npm install
  ```
  
3. Start the client application with Vite by running:

  ```bash
  npm run dev
  ```
  
4. Open a web browser and navigate to the specified URL (usually http://localhost:3000) to access the application.

## Features

The client application includes the following key features:

- Selector: Allows users to select their country and mode (Monthly or Yearly).
- PurchaseTable: Enables users to add and manage their tree purchase orders.
- Chart: Visualizes carbon offset and cumulative expenditure data with interactive charts.
- Summary: Provides a summary of the user's carbon neutrality date and estimated expenditure over ten years.

## Folder Structure

The `client` folder's structure is organized as follows:

- `src/components`: Contains React components used in the application.
- `src/lib/redux`: Manages the application's Redux store and slices.
- `src/utilities`: Includes utility functions for calculating expenses and chart data.
- `src/api`: Handles API service calls to fetch data.

## Usage

The client application is designed to interact with the server-side components. It connects to the server to fetch data and calculate carbon offset expenses. You can configure the application's behavior by modifying the components, Redux store, and utility functions.


## License

This project is licensed under the [MIT License](LICENSE).
