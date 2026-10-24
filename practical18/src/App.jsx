
import { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 1500 },
  ]);

  const [selectedId, setSelectedId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);

    const product = products.find(
      (item) => item.id === Number(id)
    );

    if (product) {
      setName(product.name);
      setPrice(product.price);
    } else {
      setName("");
      setPrice("");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!selectedId) {
      alert("Please select a product");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === Number(selectedId)
          ? { ...product, name, price: Number(price) }
          : product
      )
    );

    alert("Product updated successfully!");
  };

  return (
    <div className="container">
      <h1>Product Management</h1>

      <label>Select Product</label>
      <select value={selectedId} onChange={handleSelect}>
        <option value="">-- Select Product --</option>

        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>

      {selectedId && (
        <form onSubmit={handleUpdate}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Product Price</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <button type="submit">Update Product</button>
        </form>
      )}

      <h2>Product List</h2>

      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
