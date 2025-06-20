import React from 'react';
import { motion } from 'framer-motion';
import '../stylings/ItemCard.css';

const ItemCard = ({ item, onClick }) => {
  return (
    <motion.div
      className="item-card upgraded"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      layout
      onClick={() => onClick(item)}
    >
      <div className="card-img-wrapper">
        <img src={item.coverUrl} alt={item.itemName} className="card-img" />
        <div className="img-overlay" />
      </div>
      <div className="card-details">
        <h3>{item.itemName}</h3>
        {item.itemType && <span className="tag">{item.itemType}</span>}
      </div>
    </motion.div>
  );
};

export default ItemCard;
