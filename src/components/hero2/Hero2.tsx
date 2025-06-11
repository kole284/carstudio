import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero2.module.scss';
import Card from '../card/Card.tsx';

function Hero2() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Funkcija za parallax efekat sa centrom kao referentnom tačkom
  const getParallaxTransform = (direction: 'same' | 'opposite', speed: number, axis: 'x' | 'y' = 'y') => {
    if (!ref.current) return axis === 'x' ? 'translateX(0px)' : 'translateY(0px)';

    const heroTop = ref.current.offsetTop;
    const heroHeight = ref.current.offsetHeight;
    const heroBottom = heroTop + heroHeight;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + window.innerHeight;
    const viewportCenter = viewportTop + (window.innerHeight / 2);
    const heroCenter = heroTop + (heroHeight / 2);
    
    if (isMobile && axis === 'x') {
      // Mobilni X-axis animacija - aktivira se samo kada se udaljujemo od sekcije
      
      // Proveravamo da li je sekcija u viewportu ili blizu njega
      const distanceFromHeroCenter = Math.abs(viewportCenter - heroCenter);
      const proximityThreshold = heroHeight * 0.3; // 30% visine sekcije kao zona "bliskosti"
      
      // Ako smo blizu centra sekcije, nema animacije (kartice su centrirane)
      if (distanceFromHeroCenter < proximityThreshold) {
        return 'translateX(0px)';
      }
      
      // Računamo progress samo kada se udaljujemo
      let progress = 0;
      
      if (viewportCenter < heroCenter - proximityThreshold) {
        // Sekcija je ispod nas (skrolujemo gore, sekcija se "udaljava" dole)
        const maxDistance = heroHeight + window.innerHeight;
        const actualDistance = heroCenter - viewportCenter - proximityThreshold;
        progress = Math.min(1, actualDistance / maxDistance);
        progress = -progress; // Negativan za animaciju "prema gore"
      } else if (viewportCenter > heroCenter + proximityThreshold) {
        // Sekcija je iznad nas (skrolujemo dole, sekcija se "udaljava" gore)
        const maxDistance = heroHeight + window.innerHeight;
        const actualDistance = viewportCenter - heroCenter - proximityThreshold;
        progress = Math.min(1, actualDistance / maxDistance);
      }
      
      const multiplier = direction === 'same' ? 1 : -1;
      const offset = progress * speed * 120 * multiplier; // Povećali smo sa 100 na 120 za veći efekat
      return `translateX(${offset}px)`;
      
    } else if (!isMobile && axis === 'y') {
      // Desktop Y-axis animacija (gore-dole) - postojeća logika
      const distanceFromCenter = viewportCenter - heroCenter;
      const multiplier = direction === 'same' ? 1 : -1;
      const offset = distanceFromCenter * speed * multiplier;
      return `translateY(${offset}px)`;
    }
    
    return axis === 'x' ? 'translateX(0px)' : 'translateY(0px)';
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <img
        src="/assets/hero2/line.svg"
        alt="Pozadinska linija"
        className={styles.backgroundSvg}
        style={{
          transform: `translateX(-50%) ${getParallaxTransform('same', 0.1)}`,
        }}
      />
      <div className={styles['card-container']}>
        {/* Prvi card - levo ka desno na mobilnom, suprotan smer od skrola na desktopu */}
        <div
          className={styles.cardWrapper}
          style={{
            transform: isMobile 
              ? getParallaxTransform('same', 0.8, 'x')  // Levo ka desno 
              : getParallaxTransform('opposite', 0.15),  // Desktop animacija
          }}
        >
          <Card
            image="/assets/hero2/fast.png"
            title="Chip-tuning"
            text="Veća snaga, bolji odziv i optimizovane performanse – sve to uz bezbedan chip tuning."
          />
        </div>
        
        {/* Drugi card - desno ka levo na mobilnom, isti smer kao skrol na desktopu */}
        <div
          className={styles.cardWrapper}
          style={{
            transform: isMobile 
              ? getParallaxTransform('opposite', 0.8, 'x')  // Desno ka levo
              : getParallaxTransform('same', 0.2),  // Desktop animacija
          }}
        >
          <Card
            image="/assets/hero2/motherboard.png"
            title="Elektronika"
            text="Problemi sa senzorima, osvetljenjem ili elektronikom? Mi ih rešavamo brzo i efikasno."
          />
        </div>
        
        {/* Treći card - levo ka desno na mobilnom, suprotan smer od skrola na desktopu */}
        <div
          className={styles.cardWrapper}
          style={{
            transform: isMobile 
              ? getParallaxTransform('same', 0.8, 'x')  // Levo ka desno
              : getParallaxTransform('opposite', 0.12),  // Desktop animacija
          }}
        >
          <Card
            image="/assets/hero2/tire.png"
            title="Mehanika"
            text="Kvalitetan i brz mehanički servis za sve vrste kvarova — vozilo u sigurnim rukama."
          />
        </div>
      </div>
      
      {/* Button - desno ka levo na mobilnom (isti smer kao drugi card), isti smer kao skrol na desktopu */}
      <div
        className={styles['button-container']}
        style={{
          transform: isMobile 
            ? getParallaxTransform('opposite', 0.6, 'x')  // Desno ka levo - isti smer kao drugi card
            : getParallaxTransform('same', 0.3),  // Desktop animacija
        }}
      >
        <Link to="services" className={styles.button}>
          Više usluga
        </Link>
      </div>
    </div>
  );
}

export default Hero2;
