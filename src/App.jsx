import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => {
        if(!res) throw new Error('Error');
        res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const toggleSort = () => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (a.price === b.price) {
        return a.name.localeCompare(b.name); // Sort alphabetically if prices are equal
      }
      return sortAsc ? a.price - b.price : b.price - a.price;
    }
    );
    setFilteredProducts(sorted);
    setSortAsc(!sortAsc);
  };

  const totalProducts = filteredProducts.length;
  const averagePrice =
    totalProducts > 0
      ? (
        filteredProducts.reduce((sum, p) => sum + p.price, 0) /
        totalProducts
      ).toFixed(2)
      : 0;

  return (
    <div className="app">
      <header>
        <h1>Product List</h1>
        <div className='wrapper'>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={toggleSort}>
            Sort by Price ({sortAsc ? 'Asc' : 'Desc'})
          </button>
        </div>
      </header>

      <main>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <strong>${product.price.toFixed(2)}</strong>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>Total Products: {totalProducts}</p>
        <p>Average Price: ${averagePrice}</p>
      </footer>
    </div>
  );
};

export default App;
