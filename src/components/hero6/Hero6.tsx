import styles from './Hero6.module.scss';
import { sendEmail } from '../../services/emailService.ts';
import { useEffect, useState } from 'react';

function Hero6() {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('hero6');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => setShowPopup(false), 3000); // popup nestaje za 3s
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await sendEmail(formData);
    setFormData({ name: '', email: '', message: '' });
    setPopupMessage('Poruka je uspešno poslata!');
    setShowPopup(true);
  } catch (error) {
    console.error(error);
    setPopupMessage('Došlo je do greške prilikom slanja.');
    setShowPopup(true);
  }
};
  return (
    <div className={`${styles.wrapper} ${active ? styles.active : ''}`} id="hero6">
      <div className={styles.form}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <input
              type="text"
              name="name"
              placeholder="Ime i prezime"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <input
              type="email"
              name="email"
              placeholder="Email adresa"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.row}>
            <textarea
              name="message"
              placeholder="Vaša poruka..."
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Pošalji
          </button>
          {/* <p>{status}</p> - uklonjeno */}
        </form>
      </div>

      <div className={styles.map}>
        <iframe
          title="Lokacija"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2874.582000357844!2d22.280800110071095!3d43.905923335930694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475473e76471a4b9%3A0xc6fa96a4d13fa4eb!2sCar%20Studio!5e0!3m2!1sen!2srs!4v1749034272921!5m2!1sen!2srs"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <button className={styles.closeBtn} onClick={() => setShowPopup(false)}>
              &times;
            </button>
            <h3>Hvala!</h3>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero6;

