import { useEffect, useState } from 'react';
import styles from './Hero10.module.scss';

function Hero10() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const hero11 = document.getElementById('hero11');
    if (hero11) {
      hero11.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Paralaks pozadina */}
      <div
        className={styles.parallax}
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      
      {/* Sadržaj sa parallax efektom */}
      <div
        className={styles.content}
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <h1>O nama!</h1>
        <button className={styles.button} onClick={handleClick}>
          Upoznajte nas!
        </button>
      </div>
    </div>
  );
}

export default Hero10;

