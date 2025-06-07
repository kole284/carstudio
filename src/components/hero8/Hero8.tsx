import { useEffect, useState } from 'react';
import styles from './Hero8.module.scss';

function Hero8() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const hero9 = document.getElementById('hero9');
    if (hero9) {
      hero9.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.background}
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      <div className={styles.content}
      style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        >
        <h1>Naše usluge</h1>
        <button className={styles.button} onClick={handleClick}>Pogledajte usluge</button>
      </div>
    </div>
  );
}

export default Hero8;

