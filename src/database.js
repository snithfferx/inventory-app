const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL
  )`);
});

function getUser(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
}

function getProducts() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function addProduct(product) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
      [product.name, product.price, product.quantity],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...product });
        }
      }
    );
  });
}

function updateProduct(product) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?',
      [product.name, product.price, product.quantity, product.id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(product);
        }
      }
    );
  });
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  getUser,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
