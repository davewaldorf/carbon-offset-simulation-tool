# Carbon Offset Simulator

The Carbon Offset Simulator is a web-based application that allows users to estimate and offset their carbon emissions by purchasing trees. The application consists of two main components: the server and the client.

## Server

The server component of the Carbon Offset Simulator is responsible for handling the back-end logic and APIs. It facilitates communication between the client and any external data sources or calculations. The server defines the following API routes:

- `/countries/:country:` Get the average CO2 consumption for a specific country.
- `/countries` Get a list of available country names.
- `/offset` Calculate the total CO2 offset based on tree purchases.

The server uses models to manage data, such as `treeModel.js` and `countryModel.js`, and controllers to handle the application's business logic, such as `userOffsetController.js` and `countryController.js`. The server application relies on the following Node.js modules: `express`, `body-parser`, `cors`, `express-session`, `uuid`, and `nodemon`.

## Client

The client component of the Carbon Offset Simulator is responsible for the user interface and interactions. It provides a web-based interface for users to estimate and offset their carbon emissions by purchasing trees. The client application includes the following key features:

- Selector: Allows users to select their country and mode (Monthly or Yearly).
- PurchaseTable: Enables users to add and manage their tree purchase orders.
- Chart: Visualizes carbon offset and cumulative expenditure data with interactive charts.
- Summary: Provides a summary of the user's carbon neutrality date and estimated expenditure over ten years.

The client application is designed to interact with the server-side components. It connects to the server to fetch data and calculate carbon offset expenses. The client folder's structure is organized into components, Redux store and slices, utilities, and API service calls to fetch data.

## Getting Started

To run the Carbon Offset Simulator application, follow these steps:

1. Ensure you have Node.js installed on your machine.
2. Clone the repository to your local machine.
3. Open a terminal or command prompt and navigate to the server folder.
4. Install server dependencies by running `npm install`.
5. Start the server by running `npm start`.
6. Change directory to the client folder.
7. Install client dependencies by running `npm install`.
8. Start the client application with Vite by running `npm run dev`.
9. Open a web browser and navigate to the specified URL (usually http://localhost:3000) to access the application.


## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
