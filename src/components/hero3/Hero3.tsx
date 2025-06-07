import { Link } from 'react-router-dom';  
import { useEffect, useRef, useState } from 'react';
import styles from './Hero3.module.scss';

function Hero3() {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOffsetY(-rect.top);
    };

    window.addEventListener('scroll', handleScroll);

    // postavi početnu vrednost odmah
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.wrapper}
      style={{
        backgroundPosition: `center calc(50% + ${offsetY * 0.3}px)`,
        // lagani pomak pozadine gore-dole (30% brzine scrolla)
      }}
    >
      <div
        className={styles.content}
        style={{
          transform: `translateY(${offsetY * 0.15}px)`, // sporiji pomak sadržaja
          transition: 'transform 0.2s ease-out',
        }}
      >
        <h1>Upoznajte naš tim</h1>
        <Link to="about" className={styles.button}>O nama</Link>
      </div>
    </div>
  );
}

export default Hero3;

