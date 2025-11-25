/* import React from 'react';
import './PortfolioSection.scss'; // Assuming shared SCSS file

const Contact = () => {
    return (
        <div className="portfolio-section">
            <h2>Contact Me</h2>
            <p>How to get in touch:</p>
            <ul>
                <li>Email: your.email@example.com</li>
                <li>LinkedIn: your-linkedin-profile</li>
                <li>GitHub: your-github-profile</li>
            </ul>
        </div>
    );
};
export default Contact; */

// Contact.jsx updated version -- 1st backend approach
import React, { useState } from 'react';
import './Contact.scss';

// Custome styles for this section
const h2StylesObject = {
    marginBottom: "10px"
}; 

const Contact = () => { 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-content">
      <h2 style={ h2StylesObject }>Contact Me - Send me an E-Mail:</h2>

      
      {status === 'success' && (
        <div className="win95-message success">
          ✓ Message sent successfully!
        </div>
      )}
      
      {status === 'error' && (
        <div className="win95-message error">
          ✗ Failed to send message. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="win95-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="win95-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="win95-textarea"
          />
        </div>

        <button 
          type="submit" 
          className="win95-button"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="social-links">
        <p>Or find me on:</p>
        <ul>
          <li>
            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;