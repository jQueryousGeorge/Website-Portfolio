import React from 'react';
import './PortfolioSection.scss'; // Assuming shared SCSS file

const Projects = () => {
    return (
        <div className="portfolio-section">
            <h2>My Projects</h2>
            <p>Here is my projects!</p>
            {/* Example project structure (can be more detailed) */}
            <div>
                <h4>Project 1 Title</h4>
                <p>Brief description of Project 1...</p>
                <p>Technologies used: React, Node.js, ...</p>
                {/* Link to project or repo */}
            </div>
            <div>
                <h4>Project 2 Title</h4>
                <p>Brief description of Project 2...</p>
                <p>Technologies used: Python, Django, ...</p>
            </div>
        </div>
    );
};
export default Projects;