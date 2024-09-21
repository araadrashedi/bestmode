# Project

This is a posts gallery application built using React, Vite, Apollo Client, and TypeScript. It provides functionalities such as authentication, listing posts, viewing a post, and a rich UI with reusable components.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 20+ recommended)
- [Bun](https://bun.sh/) or [pnpm](https://pnpm.io/) (You need one of these package managers to install dependencies.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/araadrashedi/bestmode.git
```

2.	Navigate to the project directory:
```bash
cd bestmode
```

3.	Install the dependencies:
```bash
bun install
# or: pnpm install
```

4.	Set up environment variables:

Create a .env.local file at the root of the project and configure it based on the variables required by the application. You can use .env.example as a template.

### Running the Development Server

To run the project locally with hot-reloading using Vite, execute the following command:
```bash
bun dev # or: pnpm dev
```
The application will be accessible at http://localhost:5173


### Building for Production
To build the project for production, use the following command:
```bash
bun run build # or: pnpm run build
```
This will output the optimized production build to the `dist` directory.

### Previewing the Build
After building the project, you can preview the production build locally by running:
```bash
bun run preview # or: pnpm run preview
```
This will start a local web server and open your app at http://localhost:4173

## Project Structure
The project is organized in the following way:
```
.
├── features/                # BDD test related files
├── public/                  # Static assets such as images and icons
├── src/                     # Application source code
│   ├── app/                 # Application pages and routes
│   │   ├── auth/            # Authentication-related routes
│   │   │   ├── login/       # Login page components and logic
│   │   │   └── verify/      # Email verification logic
│   │   ├── unknown_error/   # Error pages (e.g., 500 error)
│   │   ├── home/            # Homepage components and logic
│   │   ├── not_found/       # 404 Not Found page
│   │   ├── post/            # Single post route and components
│   │   └── app.routes.tsx   # Defines the app's main routing configuration
│   │
│   ├── lib/                 # Library folder for reusable logic and utilities
│   │   ├── api/             # GraphQL API hooks (queries and mutations)
│   │   ├── configs/         # Global configurations (e.g., env, Apollo client)
│   │   ├── features/        # Reusable components specific to the app (e.g., like button, image)
│   │   ├── providers/       # Global providers (e.g., authentication)
│   │   ├── uikit/           # UI Kit components (e.g., buttons, inputs, layouts)
│   │   └── utils/           # Utility functions (e.g., helpers, type guards)
│   │
│   ├── global.d.ts          # Global TypeScript type definitions
│   ├── index.css            # Global styles
│   ├── main.tsx             # Main entry point for the application (client-side)
│   └── vite-env.d.ts        # Vite environment variables and TypeScript setup
│
├── .env.local               # Local environment variables for development
├── server.ts                # Express server for SSR (Server-Side Rendering)
```

### Key Folders
-	`public/`: Contains static assets such as images and icons
-	`src/app/`: Houses the main application logic, pages, and route configurations.
-	`src/lib/`: Contains utilities, configuration files, and custom hooks, such as API interaction hooks, app-wide configurations, reusable components, global providers, and utility functions.

## Running Tests

The project includes unit tests that validate the functionality of various logic within the application.

### Test Setup

Make sure all dependencies are installed and that your local development server is running:
```bash
bun dev # or: pnpm dev
```
To run the unit tests with coverage stats, you can execute:
```bash
bun test # or: pnpm test
```
### End-to-End Testing with Playwright
To run end-to-end (e2e) tests, you need to ensure that Playwright is set up correctly.

1.	Install Playwright and Browsers:
```bash
npx playwright install
```
This command installs the necessary browser binaries required for Playwright tests.

2.	Run e2e Tests:
After the browsers are installed and the development server is running, you can execute the following command to run e2e tests:
```bash
bun test:e2e # or: pnpm test:e2e
```
