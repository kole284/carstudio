import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero10.module.scss';

function Hero10() {
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
        <Link to="/contact"className={styles.button} onClick={handleClick}>
          Više informacija
        </Link>
      </div>
    </div>
  );
}

export default Hero10;

