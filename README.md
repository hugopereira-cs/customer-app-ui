# Customer App

A React frontend for managing customers through the [Customer API](https://github.com/hugopereira-cs/customer-app-api).

## ✨ Features

- 📋 View the customer list and each customer's active or inactive status.
- ➕ Create a customer with a name and email address.
- ✏️ Update a customer's email address.
- 🗑️ Delete a customer.
- 🔄 Retry loading the list if the request fails.

## 🧰 Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios

## 🚀 Getting started

### Prerequisites

- Node.js and npm
- The [Customer API](https://github.com/hugopereira-cs/customer-app-api) running at `http://localhost:3333/api`

### Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## ⚙️ API configuration

The API base URL is currently set in `src/services/api.ts` to `http://localhost:3333/api`. The frontend uses the `/customers` endpoint to list and create customers, `/customers/:id` to update an email address, and `/customers/:id` to delete a customer.

## 🧪 Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check and build the app for production. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Lint the project with Biome. |
| `npm run format` | Format project files with Biome. |
