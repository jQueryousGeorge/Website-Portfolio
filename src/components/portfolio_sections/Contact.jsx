import React, { useState } from 'react';
import './Contact.scss';
import githubIcon from '../../../src/assets/icons/icons8-github-16.png';
import linkedinIcon from '../../../src/assets/icons/icons8-linkedin-16.png';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  message: '',
  company: ''
};

const CONSTRAINTS = {
  nameMax: 80,
  emailMax: 254,
  messageMax: 1500
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeFormData = (data) => ({
  name: data.name.trim(),
  email: data.email.trim(),
  message: data.message.trim()
});

const validateForm = (data) => {
  const validationErrors = {};

  if (!data.name) {
    validationErrors.name = 'Name is required.';
  } else if (data.name.length > CONSTRAINTS.nameMax) {
    validationErrors.name = `Name must be ${CONSTRAINTS.nameMax} characters or fewer.`;
  }

  if (!data.email) {
    validationErrors.email = 'Email is required.';
  } else if (data.email.length > CONSTRAINTS.emailMax) {
    validationErrors.email = `Email must be ${CONSTRAINTS.emailMax} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(data.email)) {
    validationErrors.email = 'Please enter a valid email address.';
  }

  if (!data.message) {
    validationErrors.message = 'Message is required.';
  } else if (data.message.length > CONSTRAINTS.messageMax) {
    validationErrors.message = `Message must be ${CONSTRAINTS.messageMax} characters or fewer.`;
  }

  return validationErrors;
};

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const botDetected = formData.company.trim().length > 0;

    if (botDetected) {
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setStatus('success');
      setTimeout(() => setStatus(''), 5000);
      return;
    }

    const sanitizedData = sanitizeFormData(formData);
    const validationErrors = validateForm(sanitizedData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const FORMSPREE_URL = process.env.REACT_APP_FORMSPREE_ENDPOINT;
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData(INITIAL_FORM_DATA);
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

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="honeypot-field" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            tabIndex="-1"
            autoComplete="off"
            placeholder="Leave this field empty"
          />
        </div>

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
            autoComplete="name"
            maxLength={CONSTRAINTS.nameMax}
            placeholder="Your Name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="error-text" id="name-error">{errors.name}</span>
          )}
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
            autoComplete="email"
            maxLength={CONSTRAINTS.emailMax}
            placeholder="your.email@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="error-text" id="email-error">{errors.email}</span>
          )}
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
            maxLength={CONSTRAINTS.messageMax}
            placeholder="Type your message here..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span className="error-text" id="message-error">{errors.message}</span>
          )}
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