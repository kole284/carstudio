import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';

function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 return (
    <section id="hero" className={styles.wrapper}
     style={{
        transform: `translateY(${offsetY * 0.5}px)` // Alternativno rešenje
        }}>
      <div
        className={styles.slide}/>
      <div className={styles.content}>
        <h1 style={{ transform: `translateY(${offsetY * 0.2}px)` }}>
          CarStudio
        </h1>
        <p style={{ transform: `translateY(${offsetY * 0.3}px)` }}>
          Profesionalna usluga za vaš automobil
        </p>
        <Link
          to="/contact"
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
