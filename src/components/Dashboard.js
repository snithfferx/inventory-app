import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="inventory-summary">
        <p>Total Products: 100</p>
        <p>Out of Stock: 5</p>
        <p>Low Stock: 10</p>
      </div>
      <nav>
        <ul>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
