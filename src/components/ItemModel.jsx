import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal from '../pages/EnquiryModal'; // ✅ import it
import '../stylings/ItemModal.css';

const ItemModal = ({ item, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const images = item ? [item.coverUrl, ...(item.imageUrls || [])] : [];

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="modal-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-box upgraded-modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="carousel-wrapper">
              <button className="close-btn" onClick={onClose}>×</button>
              {images.length > 0 && (
                <>
                  <img className="carousel-img" src={images[currentIndex]} alt="Item" />
                  {images.length > 1 && (
                    <div className="carousel-buttons">
                      <button onClick={prevImage}>⟨</button>
                      <button onClick={nextImage}>⟩</button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="modal-content">
              <h2>{item?.itemName}</h2>
              <p className="modal-type"><strong>Type:</strong> {item?.itemType}</p>
              <p className="modal-desc">{item?.itemDescription || item?.description}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="enquire-button"
                onClick={() => setShowEnquiry(true)}
              >
                Enquire
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ✅ Render EnquiryModal if triggered */}
      {showEnquiry && (
        <EnquiryModal
          isOpen={showEnquiry}
          onClose={() => setShowEnquiry(false)}
          productName={item?.itemName}
        />
      )}
    </>
  );
};

export default ItemModal;
