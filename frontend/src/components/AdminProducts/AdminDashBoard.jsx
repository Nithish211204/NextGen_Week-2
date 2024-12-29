import React from 'react';
import { Link } from 'react-router-dom';
const AdminDashboard = () => {

  // console.log(token);
  return (
    <nav >
      <ul >
        <li><Link to="/add">Add Products</Link></li>
        <li><Link to="/delete">Delete Product</Link></li>
      </ul>
    </nav>
  );
};

export default AdminDashboard;