import { useEffect, useState } from 'react';
import styles from './Hero.module.scss';

const images = [
  '/assets/hero/image1.jpg',
  '/assets/hero/image2.jpg',
  '/assets/hero/image3.jpg',
  '/assets/hero/image4.jpg',
  '/assets/hero/image5.jpg',
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {images.map((img, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === current ? styles.active : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className={styles.content}>
        <h1>CarStudio</h1>
        <p>Profesionalna usluga za vaš automobil</p>
        <button className={styles.button}>Kontaktiraj nas</button>
      </div>
    </section>
  );
}

export default Hero;

