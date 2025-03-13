import React from 'react';

const ContactPage = () => {
  return (
    <>
      <section className="page-banner">
        <div className="container">
          <h1>Контакти</h1>
        </div>
      </section>
      <section className="contact-section">
        <div className="container">
          <h2>Напишіть нам</h2>
          <form className="contact-form" action="#" method="post">
            <label htmlFor="name">Ім'я</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Електронна пошта</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Повідомлення</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit" className="btn">Надіслати</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
