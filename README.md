# 🛍️ Product List Web App

A simple React + Vite app that displays a list of products with filtering, sorting, and a responsive layout — backed by a persistent JSON-based Express API using a local `products.json` file for persistence.

---

## 🚀 Features

- Loads products from a JSON REST API (`/api/products`)
- Add and delete products with file-based persistence
- Search by name or description (case-insensitive)
- Sort by price (asc/desc), and alphabetically if prices match
- Responsive layout with images
- Unit tested with Vitest + Testing Library
- Frontend deployed via GitHub Pages
- Backend deployed via render

---

## 📦 Folder Structure

```
product-list/
├── public/               # Static assets (optional)
├── src/                  # React components & styles
│   ├── App.jsx
│   ├── App.css
│   └── App.test.jsx
├── server.js             # Express backend
├── products.json         # Persistent data file
├── package.json
├── vite.config.js
└── README.md             # You are here
```

---

## 🖥️ Frontend Setup (Local Development)

```bash
git clone https://github.com/nehadebbad/product-list.git
cd product-list
npm install
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🚀 Frontend Deployment (GitHub Pages)

### 1. Ensure `vite.config.js` has:
```js
base: '/product-list/'
```

### 2. Add to `package.json`:
```json
"homepage": "https://nehadebbad.github.io/product-list/",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
```

### 3. Run:
```bash
npm run build
npm run deploy
```

### Live URL:
```
https://nehadebbad.github.io/product-list/
```

---

## 🔧 Backend Setup (Express + Node)

### 1. Requirements

- Node.js installed
- `server.js` and `products.json` in the root directory

### 2. Install backend dependencies:
```bash
npm install express cors
```

### 3. Start backend:
```bash
node server.js
```

### Backend runs at (locally):
```
http://localhost:3001/api/products
```

### Backend deployed on Render:
```
https://product-list-8jah.onrender.com/api/products
```

Make sure your frontend points to this URL when deploying to GitHub Pages.


---

## 📡 API Endpoints

| Method | URL                    | Description         |
|--------|------------------------|---------------------|
| GET    | `/api/products`        | Fetch all products  |
| POST   | `/api/products`        | Add a new product   |
| DELETE | `/api/products/:id`    | Delete product by ID|

---

## 🔄 Example `curl` Commands

### ✅ Add a product:
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "price": 123.45,
    "description": "Sample",
    "imageUrl": "https://via.placeholder.com/200"
  }'
```

### 🗑️ Delete a product:
```bash
curl -X DELETE http://localhost:3001/api/products/<id>
```

---

## 🧪 Run Unit Tests

Vitest is used for testing React components.

### 1. Install testing dependencies:
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### 2. Run tests:
```bash
npx vitest run
```

Tests are located in `src/App.test.jsx`

---

## ✅ Summary

| Component | Tech Used       | Deployed To            |
|-----------|------------------|------------------------|
| Frontend  | React + Vite     | GitHub Pages           |
| Backend   | Node + Express   | Run locally or Render  |
| Storage   | `products.json`  | File-based persistence |
| Tests     | Vitest + RTL     | Run via CLI            |

---

## ✍️ Author

Created by [@nehadebbad](https://github.com/nehadebbad)
