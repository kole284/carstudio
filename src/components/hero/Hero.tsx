import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';

function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset || window.scrollY);
    };

    // Dodaj event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Pozovi jednom na početak da dobiješ početnu vrednost
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Debug - možeš ukloniti kada radiš
  console.log('Current offsetY:', offsetY);

  return (
    <section id="hero" className={styles.hero}>
      <div
        className={styles.slide}
        style={{
          backgroundImage: `url(/assets/hero/image4.jpg)`,
          backgroundPosition: `center ${offsetY * 0.5}px`, // Precizniji background-position
          transform: `translateY(${offsetY * 0.5}px)`, // Alternativno rešenje
        }}
      />
      <div className={styles.content}>
        <h1 style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          CarStudio
        </h1>
        <p style={{ transform: `translateY(${offsetY * 0.15}px)` }}>
          Profesionalna usluga za vaš automobil
        </p>
        <Link
          to="/about"
          className={styles.button}
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        >
          Kontaktiraj nas
        </Link>
      </div>
    </section>
  );
}

export default Hero;
