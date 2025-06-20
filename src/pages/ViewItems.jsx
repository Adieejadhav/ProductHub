import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import ItemModal from '../components/ItemModel';
import ItemCard from '../components/ItemCard';
import { motion, AnimatePresence } from 'framer-motion';
import '../stylings/ViewItems.css';

const ViewItems = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'items'));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="items-page">
      <h2 className="page-heading">Explore Products</h2>

      {loading ? (
        <motion.div
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading items...
        </motion.div>
      ) : items.length === 0 ? (
        <motion.div
          className="empty-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          😕 No products available right now.
        </motion.div>
      ) : (
        <motion.div
          className="items-grid"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence>
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default ViewItems;
