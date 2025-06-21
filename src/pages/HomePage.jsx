import React from 'react';
import { motion } from 'framer-motion';
import '../stylings/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <motion.div
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-text">
          <h1>
            Welcome to <span>ProductHub</span>
          </h1>
          <p>
            A community-driven platform to donate, share, and view essential items.
            Let’s make a difference — one item at a time.
          </p>
          <motion.a
            href="/add"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
          >
            Add an Item
          </motion.a>
        </div>

        <motion.img
        src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
        alt="hero"
        className="hero-image"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        />
      </motion.div>

      <motion.div
        className="info-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2>Why ProductHub?</h2>
        <p>
          Every item you share can change someone’s day. Whether it's clothes, books, or essentials —
          your contribution matters. ShareMate allows you to easily list and explore items with a simple interface.
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;
