import React, { useEffect, useState } from 'react';
import './App.css';
import useDebounce from './hooks/useDebounce';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const debouncedSearchTerm = useDebounce(inputValue);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => {
        if (!res) throw new Error('Error');
        return res.json();
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
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // to search products from the entire product list
  }, [debouncedSearchTerm, products]);

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

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const paginatedItems = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="app">
      <header>
        <h1>Product List</h1>
        <div className='wrapper'>
          <input
            type="text"
            placeholder="Search products..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={toggleSort}>
            Sort by Price ({sortAsc ? 'Asc' : 'Desc'})
          </button>
        </div>
      </header>

      <main>
        <div className="product-grid">
          {paginatedItems.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <strong>${product.price.toFixed(2)}</strong>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage * itemsPerPage >= filteredProducts.length}
          >
            Next
          </button>
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
