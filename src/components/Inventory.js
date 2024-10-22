import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../database';

function Inventory() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setProducts(products);
    }
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const addedProduct = await addProduct(newProduct);
    setProducts([...products, addedProduct]);
    setNewProduct({ name: '', price: '', quantity: '' });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = await updateProduct(editingProduct);
    setProducts(products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={(e) => {
              const value = e.target.value;
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, name: value });
              } else {
                setNewProduct({ ...newProduct, name: value });
              }
            }}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={(e) => {
              const value = e.target.value;
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, price: value });
              } else {
                setNewProduct({ ...newProduct, price: value });
              }
            }}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="text"
            value={editingProduct ? editingProduct.quantity : newProduct.quantity}
            onChange={(e) => {
              const value = e.target.value;
              if (editingProduct) {
                setEditingProduct({ ...editingProduct, quantity: value });
              } else {
                setNewProduct({ ...newProduct, quantity: value });
              }
            }}
          />
        </div>
        <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
            <span>{product.quantity}</span>
            <button onClick={() => handleEditProduct(product)}>Edit</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
