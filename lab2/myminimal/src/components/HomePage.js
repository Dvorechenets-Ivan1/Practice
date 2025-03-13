import React from 'react';

const HomePage = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <h1>Інноваційні IT-рішення для вашого бізнесу</h1>
          <p>
            Ми створюємо ефективні технологічні рішення, які допомагають вам
            розвиватися та досягати нових висот.
          </p>
          <button className="btn-yellow">Дізнатися більше</button>
        </div>
        <div className="hero-image">
          <img src="/image.png" alt="Ілюстрація IT-рішень" />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
