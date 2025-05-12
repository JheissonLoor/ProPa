import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Todo para el cuidado
            <span>de tu bebé</span>
          </h1>
          <p>Al mejor precio, con la mejor calidad</p>
          <div className="hero-buttons">
            <Link to="/pañaleria" className="hero-button primary-button">
              Ver productos
            </Link>
            <Link to="/promociones" className="hero-button secondary-button">
              Ofertas especiales
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg"
            alt="Bebé feliz"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;