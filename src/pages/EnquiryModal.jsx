import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import '../stylings/EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose, productName }) => {
  const formRef = useRef();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

   emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      alert('✅ Enquiry sent successfully!');
      formRef.current.reset();
      onClose();
    }).catch((error) => {
      console.error('❌ Email error:', error);
      alert('❌ Failed to send enquiry.');
    });
  };

  return (
    <div className="enquiry-overlay">
      <div className="enquiry-modal">
        <button className="enquiry-close" onClick={onClose}>×</button>
        <h2 className="enquiry-title">Enquire for: {productName}</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="styled-enquiry-form">
          <input type="hidden" name="product" value={productName} />
          <div className="input-group">
            <label>Your Name</label>
            <input type="text" name="name" required />
          </div>
          <div className="input-group">
            <label>Your Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="input-group">
            <label>Contact Number</label>
            <input type="text" name="contact" required />
          </div>
          <div className="input-group">
            <label>Message</label>
            <textarea name="message" required></textarea>
          </div>
          <input type="hidden" name="time" value={new Date().toLocaleString()} />

          <button type="submit" className="submit-btn">Send Enquiry</button>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
