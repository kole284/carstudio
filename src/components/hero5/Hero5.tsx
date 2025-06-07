import { useState, useEffect } from 'react';
import styles from './Hero5.module.scss';

function Hero5() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const hero6 = document.getElementById('hero6');
    if (hero6) {
      hero6.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.background}
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      <div
        className={styles.content}
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <h1>Kontaktirajte nas</h1>
        <button className={styles.button} onClick={handleClick}>
          Više informacija
        </button>
      </div>
    </div>
  );
}

export default Hero5;

