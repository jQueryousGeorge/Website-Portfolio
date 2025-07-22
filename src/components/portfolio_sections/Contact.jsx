import React from 'react';
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
export default Contact;