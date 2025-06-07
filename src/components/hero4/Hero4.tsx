import { Link } from 'react-router-dom';  
import { useEffect, useRef, useState } from 'react';
import styles from './Hero4.module.scss';

function Hero4() {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOffsetY(-rect.top);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
 <div
  ref={ref}
  className={styles.wrapper}
  style={{ transform: `translateY(${offsetY * 0.1}px)` }}
>
  <div className={styles.content}>
       <div className={styles.mapContainer}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2874.582000357844!2d22.280800110071095!3d43.905923335930694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475473e76471a4b9%3A0xc6fa96a4d13fa4eb!2sCar%20Studio!5e0!3m2!1sen!2srs!4v1749034272921!5m2!1sen!2srs"
        width="100%"
        height="200"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
        <div className={styles.textContainer}>
      <h1>Kontaktirajte nas</h1>
      <Link to="contact" className={styles.button}>Pošaljite poruku</Link>
    </div>

  </div>
</div>
  );
}

export default Hero4;

