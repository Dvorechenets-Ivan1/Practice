import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© 2025 MyMinimal. Усі права захищено.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <p>
            Email:{" "}
            <a
              href="mailto:contact@website.com"
              style={{ color: "#4e51e8", textDecoration: "none" }}
            >
              contact@website.com
            </a>
          </p>
          <p>Телефон: 0927 6277 28525</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
