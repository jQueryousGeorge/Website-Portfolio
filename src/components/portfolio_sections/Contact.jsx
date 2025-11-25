import React, { useState } from 'react';
import './Contact.scss';
import githubIcon from '../../../src/assets/icons/icons8-github-16.png';
import linkedinIcon from '../../../src/assets/icons/icons8-linkedin-16.png';

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
      // Replace YOUR_FORM_ID with your Formspree form ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000); // Clear success message after 5s
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Me - Send me an E-Mail:</h2>
      </div>

      {status === 'success' && (
        <div className="alert-box success">
          <div className="alert-icon">✓</div>
          <div className="alert-content">
            <strong>Success!</strong>
            <p>Your message has been sent. I'll get back to you soon!</p>
          </div>
          <button 
            className="alert-close" 
            onClick={() => setStatus('')}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="alert-box error">
          <div className="alert-icon">✗</div>
          <div className="alert-content">
            <strong>Error!</strong>
            <p>Failed to send message. Please try again or contact me directly.</p>
          </div>
          <button 
            className="alert-close" 
            onClick={() => setStatus('')}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-row">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            placeholder="Your Name"
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === 'sending'}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-row">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            disabled={status === 'sending'}
            placeholder="Type your message here..."
          />
        </div>

        <button 
          type="submit" 
          className="win95-button primary"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <div className="contact-footer">
        <p className="footer-text">Or find me on:</p>
        <div className="social-links">
          <a 
            href="https://linkedin.com/in/your-profile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link linkedin"
          >
            <img 
                src={linkedinIcon}
                alt="LinkedIn Social Platform Icon Image Placeholder for hyperlink"
                className='social-icon'
            />
            LinkedIn
          </a>
          <a 
            href="https://github.com/your-username" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link github"
          >
            <img 
                src={githubIcon} 
                alt="GitHub Social Platform Icon Image Placeholder for hyperlink"
                className='social-icon' 
            />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;