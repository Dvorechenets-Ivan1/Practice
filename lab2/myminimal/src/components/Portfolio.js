import "./Portfolio.css";

const Portfolio = () => (
  <section className="portfolio-section">
    <div className="container">
      <h2>Портфоліо</h2>
      <div className="portfolio-grid">
        <div className="portfolio-item">
          <img src="/images/work1.jpg" alt="Project 1" />
          <h3>Project One</h3>
        </div>
        <div className="portfolio-item">
          <img src="/images/work2.jpg" alt="Project 2" />
          <h3>Project Two</h3>
        </div>
      </div>
    </div>
  </section>
);

export default Portfolio;
