# Quantiphi E-Commerce Website

A modern, responsive **E-Commerce Product Catalog** built as part of the Quantiphi Vibe Coding Round.

The application provides a complete product browsing experience with **multi-criteria filtering, search, sorting, product quick view, shopping cart management, responsive layouts, and an Express-based product API**.

## 🚀 Live Repository

[View the GitHub Repository](https://github.com/Devansh7887/Quantiphi_E_Commerce_Website?utm_source=chatgpt.com)

---

## ✨ Features

###  Product Search

* Search products by:

  * Product name
  * Brand
  * Description
  * Category
* Search results update dynamically through the backend API.

###  Multi-Criteria Filtering

Products can be filtered using multiple criteria simultaneously:

* **Category**

  * Electronics
  * Apparel
  * Footwear
  * Home & Kitchen
  * Fitness
  * Accessories
* **Price Range**
* **Minimum Rating**
* **Search Query**

The filtering engine uses combinatorial intersection logic, meaning all active filters are applied together.

###  Product Sorting

Available sorting options include:

* Featured
* Price: Low → High
* Price: High → Low
* Rating: High → Low
* Most Reviews
* Name: A → Z

###  Shopping Cart

The application includes a client-side shopping cart with:

* Add product to cart
* Increase/decrease quantity
* Remove individual products
* Clear entire cart
* Automatic cart item count
* Toast notification when products are added

###  Product Quick View

Users can open a product detail modal to view additional product information without leaving the catalog.

Product information includes:

* Product name
* Brand
* Category
* Price
* Rating
* Reviews
* Description
* Specifications
* Stock status

###  Responsive UI

The application supports:

* Desktop layouts
* Tablet layouts
* Mobile layouts
* Grid view
* Compact/list view
* Mobile filter drawer

### ⚡ Backend Product API

An Express server provides product catalog APIs.

The frontend communicates with the backend using REST-style HTTP endpoints.

---

# 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │   TypeScript + Vite  │
                    └──────────┬───────────┘
                               │
                               │ HTTP Request
                               ▼
                    ┌──────────────────────┐
                    │    Express Server    │
                    │      Port 3000       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Filter Engine      │
                    │                      │
                    │ • Category Filter    │
                    │ • Price Filter       │
                    │ • Rating Filter      │
                    │ • Search             │
                    │ • Sorting            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Product Dataset    │
                    │   MASTER_PRODUCTS    │
                    └──────────────────────┘
```

The frontend requests filtered catalog data from `/api/products`, while the Express backend processes the filtering and sorting pipeline before returning the results.

---

#  Tech Stack

## Frontend

* **React 19**
* **TypeScript**
* **Vite**
* **Tailwind CSS**
* **Lucide React**
* **Motion**

## Backend

* **Node.js**
* **Express.js**
* **TypeScript**
* **tsx**

## Build & Development

* Vite
* esbuild
* TypeScript
* npm

## AI Integration

* Google Gemini SDK (`@google/genai`)
* Gemini API configuration through environment variables

The repository's package configuration includes React, Vite, Express, Tailwind CSS, Motion, Lucide React, TypeScript, esbuild, and Google's GenAI SDK.

---

# 📁 Project Structure

```text
Quantiphi_E_Commerce_Website/
│
├── assets/
│   └── .aistudio
│
├── server/
│   └── filterEngine.ts
│
├── src/
│   ├── components/
│   │   ├── Header
│   │   ├── SidebarFilter
│   │   ├── SortDropdown
│   │   ├── ProductCard
│   │   ├── ProductDetailModal
│   │   ├── CartDrawer
│   │   ├── ActiveFilterPills
│   │   └── EmptyState
│   │
│   ├── data/
│   │   └── products.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
└── vite.config.ts
```

The repository currently separates the React application under `src/` from the filtering logic under `server/`.

---

#  API Documentation

## Get Products

```http
GET /api/products
```

Returns the product catalog after applying the requested filters and sorting options.

### Query Parameters

| Parameter     | Type   | Description                        |
| ------------- | ------ | ---------------------------------- |
| `categories`  | string | Comma-separated product categories |
| `minPrice`    | number | Minimum product price              |
| `maxPrice`    | number | Maximum product price              |
| `minRating`   | number | Minimum product rating             |
| `sortBy`      | string | Sorting strategy                   |
| `searchQuery` | string | Product search query               |
| `search`      | string | Alternative search parameter       |

### Example

```http
GET /api/products?categories=Electronics,Accessories&minPrice=500&maxPrice=1500&minRating=4&sortBy=price_asc&searchQuery=watch
```

### Response

```json
{
  "products": [],
  "totalMasterCount": 100,
  "filteredCount": 12,
  "globalPriceBounds": {
    "min": 100,
    "max": 2000
  },
  "activePriceBounds": {
    "min": 500,
    "max": 1500
  },
  "categories": [],
  "appliedFiltersCount": 4
}
```

---

## Get Product by ID

```http
GET /api/products/:id
```

### Example

```http
GET /api/products/1
```

Returns the product with the specified ID.

If the product does not exist:

```json
{
  "error": "Product not found"
}
```

The Express server implements both catalog filtering and individual product lookup endpoints.

---

# 🧠 Filtering Engine

The core filtering logic is implemented in:

```text
server/filterEngine.ts
```

The engine follows a sequential filtering pipeline:

```text
Product Dataset
      │
      ▼
Category Filter
      │
      ▼
Price Range Filter
      │
      ▼
Rating Filter
      │
      ▼
Search Filter
      │
      ▼
Sorting
      │
      ▼
Final Product Results
```

For every product, the engine checks the active criteria and removes products that do not satisfy the conditions.

For example:

```text
Category = Electronics
AND
Price >= ₹500
AND
Price <= ₹1500
AND
Rating >= 4
AND
Search = "phone"
```

Only products satisfying **all active conditions** are returned.

The engine also calculates category metadata, total products, filtered products, global price bounds, active price bounds, and the number of applied filters.

---

# 🛠️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/Devansh7887/Quantiphi_E_Commerce_Website.git
```

## 2. Navigate to the Project

```bash
cd Quantiphi_E_Commerce_Website
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Configure:

```env
GEMINI_API_KEY=your_gemini_api_key
APP_URL=http://localhost:3000
```

The repository provides `.env.example` for Gemini API and application URL configuration.

> **Important:** Never commit your actual API keys or secrets to GitHub.

---

#  Running the Application

Start the development server:

```bash
npm run dev
```

The Express server runs on:

```text
http://localhost:3000
```

The development setup uses Express together with Vite middleware, allowing the frontend and API to run through the same server.

---

#  Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Preview the Vite build:

```bash
npm run preview
```

Run TypeScript validation:

```bash
npm run lint
```

These scripts are defined in the project's `package.json`.

---

#  Product Data Model

Each product follows a TypeScript interface similar to:

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  brand: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  specifications: Record<string, string>;
}
```

The supported product categories are:

```text
Electronics
Apparel
Footwear
Home & Kitchen
Fitness
Accessories
```

---

# 🎯 Design Goals

The project focuses on demonstrating:

* Clean component-based React architecture
* Strong TypeScript typing
* Responsive UI design
* Server-side catalog processing
* Efficient multi-filter logic
* REST API integration
* Reusable UI components
* Client-side cart state management
* User-friendly empty/loading/error states
* Maintainable project structure

---

#  Future Improvements

Potential improvements include:

* User authentication
* Persistent shopping cart
* Database integration
* Product administration dashboard
* Real payment gateway
* Order management
* Wishlist functionality
* Product reviews
* Pagination
* Infinite scrolling
* Advanced recommendation system
* AI-powered product recommendations
* Product comparison
* Backend database such as MongoDB/PostgreSQL
* Automated testing
* CI/CD pipeline
* Production deployment

---

# 🔐 Security Considerations

For production deployment:

* Store API keys only in environment variables.
* Never expose private API keys in frontend code.
* Validate and sanitize API query parameters.
* Add rate limiting to public APIs.
* Add proper CORS configuration where required.
* Use HTTPS in production.
* Add authentication and authorization for protected operations.
* Validate product and order data on the backend.

---

# 👨‍💻 Author

**Devansh Agrawal**

GitHub:
[@Devansh7887](https://github.com/Devansh7887?utm_source=chatgpt.com)

---

# 📄 License

This project was created as part of the **Quantiphi Vibe Coding Round**.

---

## ⭐ Project Highlights

> **A responsive, TypeScript-powered e-commerce catalog with an Express filtering engine, multi-criteria search, sorting, quick product views, and client-side cart management.**

Built with **React + TypeScript + Vite + Express + Tailwind CSS**.
