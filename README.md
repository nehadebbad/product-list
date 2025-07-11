# 🛍️ Product List Web App

A simple React + Vite app that displays a list of products with filtering, sorting, and a responsive layout — backed by a persistent JSON-based Express API.

---

## 🚀 Features

- Loads products from a JSON REST API (`/api/products`)
- Add and delete products with persistence via local `products.json`
- Search by name or description (case-insensitive)
- Sort by price (ascending/descending), and alphabetically if prices match
- Responsive layout with product images
- Deployed via GitHub Pages
- Unit tested using Vitest + Testing Library
- Backend API with Node + Express (for persistence)

---

## 🛠️ Frontend Setup

```bash
git clone https://github.com/nehadebbad/product-list.git
cd product-list
npm install
npm run dev
