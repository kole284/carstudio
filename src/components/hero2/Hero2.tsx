import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero2.module.scss';
import Card from '../card/Card.tsx';

function Hero2() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Računamo relativan scroll u odnosu na element
        // Kada je element u viewport-u, parallax je aktivan
        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          // Normalizujemo scroll vrednost za ovaj element
          const scrollProgress = (windowHeight - elementTop) / (windowHeight + elementHeight);
          setScrollY(scrollProgress * 200); // 200px je maksimalni parallax offset
        } else if (elementTop >= windowHeight) {
          // Element je ispod viewport-a - reset na 0
          setScrollY(0);
        } else {
          // Element je iznad viewport-a - zadržavamo poslednju vrednost ili reset
          setScrollY(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // inicijalno pozivanje
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Računamo parallax offset samo za desktop
  const parallaxOffset = isMobile ? 0 : scrollY;

  return (
      <div className={styles.wrapper}>
        <img
          src="/assets/hero2/line.svg"
          alt="Pozadinska linija"
          className={styles.backgroundSvg}
          style={{ 
            transform: `translateX(-50%) translateY(${parallaxOffset * 0.3}px)` 
          }}
        />
        <div className={styles['card-container']}>
          <div style={{ 
            transform: isMobile ? 'none' : `translateY(${parallaxOffset * 0.1}px)` 
          }}>
            <Card
              image="/assets/hero2/fast.png"
              title="Chip-tuning"
              text="Veća snaga, bolji odziv i optimizovane performanse – sve to uz bezbedan chip tuning."
            />
          </div>
          <div style={{ 
            transform: isMobile ? 'none' : `translateY(${parallaxOffset * 0.15}px)` 
          }}>
            <Card
              image="/assets/hero2/motherboard.png"
              title="Elektronika"
              text="Problemi sa senzorima, osvetljenjem ili elektronikom? Mi ih rešavamo brzo i efikasno."
            />
          </div>
          <div style={{ 
            transform: isMobile ? 'none' : `translateY(${parallaxOffset * 0.1}px)` 
          }}>
            <Card
              image="/assets/hero2/tire.png"
              title="Mehanika"
              text="Kvalitetan i brz mehanički servis za sve vrste kvarova — vozilo u sigurnim rukama."
            />
          </div>
        </div>
        <div
          className={styles['button-container']}
          style={{ 
            transform: isMobile ? 'none' : `translateY(${parallaxOffset * 0.05}px)` 
          }}
        >
          <Link to="services" className={styles.button}>Više usluga</Link>
        </div>
      </div>
  );
}

export default Hero2;
