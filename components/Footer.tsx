import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Christopher Norton</h3>
            <p>The System Architect</p>
            <p className="footer-tagline">
              Build systems that scale. Results with precision.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#projects">System Architecture</a>
                </li>
                <li>
                  <a href="#projects">Process Automation</a>
                </li>
                <li>
                  <a href="#projects">Strategic Consulting</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li>
                  <a href="#blog">Technical Insights</a>
                </li>
                <li>
                  <a href="#blog">Case Studies</a>
                </li>
                <li>
                  <a href="#blog">System Blueprints</a>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="#contact">Start Project</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Christopher Norton. Strategic systems that scale.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer