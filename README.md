# ISRTaxesOpenAPI Demo Application

## Overview

This demo application is designed to showcase the functionality of the Israel Taxes Open API. It provides a practical example of how to integrate with the API, including authenticating and making requests to retrieve tokens and process invoices.

The application is set up to use both sandbox and production environments, allowing users to test the API with sample credentials in a controlled environment before using real data.

## Setup

1. Register for an account at `https://openapi-portal.taxes.gov.il/sandbox/` or `https://openapi-portal.taxes.gov.il/shaam/production/`.
2. Create an application and obtain your client ID and client secret.
3. (Optional) Create a `.env` file in the root of the project and add the following:
4. Register and sign up for the following API endpoints:

- **Invoices Approval** - `https://openapi-portal.taxes.gov.il/sandbox/product/15042`
- **Demo App** - `https://openapi-portal.taxes.gov.il/sandbox/product/7797`

`.env` file example:

```bash
REACT_APP_CLIENT_ID=<your-client-id>
REACT_APP_CLIENT_SECRET=<your-client-secret>
```

## Features

- **Authentication**: Demonstrate OAuth 2.0 flow to obtain access tokens.
- **Invoice Processing**: Send requests to process invoices using the retrieved tokens.
- **Dynamic Base URL Selection**: Toggle between sandbox and production environments.

## Pre-configured Credentials for Sandbox

For demonstration purposes in the sandbox environment, you can use the following credentials:

- **Username**: `199999996`
- **Password**: `1234QQ`
- **OTP**: `1234QQ`

Alternatively:

- **Username**: `199999988`
- **Password**: `2175PK`
- **OTP**: `1234qq`

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone <repository-url> <project_name>
```

### Install Dependencies

Navigate to your project directory and install the required dependencies:

```bash
cd <project_name>
npm install
```

### Run the Application

Start the application using Node.js:

```bash
npm start
```

Now, you can navigate to `http://localhost:3001` in your web browser to interact with the application.

## Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Bootstrap 5](https://getbootstrap.com/) - Powerful, extensible, and responsive front-end framework

## Author

**Simon B. Stirling**

- Website: [https://bestdev.co.il](https://bestdev.co.il)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
