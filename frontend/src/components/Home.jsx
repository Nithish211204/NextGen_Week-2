import React from 'react';
import './Home.css'; // Import the CSS for Home page

const Home = () => {
  const vegetables = [
    { id: 1, name: 'Carrot', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Potato', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Tomato', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Broccoli', image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Cucumber', image: 'https://via.placeholder.com/150' },
    { id: 6, name: 'Spinach', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to the Vegetable Mart</h1>
      <div className="vegetable-grid">
        {vegetables.map((veg) => (
          <div key={veg.id} className="vegetable-card">
            <img src={veg.image} alt={veg.name} className="vegetable-image" />
            <h3>{veg.name}</h3>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
