import { useEffect, useState, useRef } from 'react';
import styles from './Hero8.module.scss';

function Hero8() {
  const ref = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setOffsetY(-rect.top);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Koristimo passive: true za bolje performanse
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // postavi početnu vrednost odmah
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Funkcija za računanje parallax efekta za elemente
  const getElementParallax = (direction: 'left' | 'right', speed: number = 0.2) => {
    if (!ref.current) return 'translateX(0px)';
    
    const elementTop = ref.current.offsetTop;
    const elementHeight = ref.current.offsetHeight;
    const elementCenter = elementTop + (elementHeight / 2);
    const viewportCenter = window.scrollY + (window.innerHeight / 2);
    
    if (isMobile) {
      // Mobilna logika - animacija staje kada su elementi centrirani
      const distanceFromHeroCenter = Math.abs(viewportCenter - elementCenter);
      const proximityThreshold = elementHeight * 0.3; // 30% visine sekcije kao zona "bliskosti"
      
      // Ako smo blizu centra sekcije, nema animacije (elementi su centrirani)
      if (distanceFromHeroCenter < proximityThreshold) {
        return 'translateX(0px)';
      }
      
      // Računamo progress samo kada se udaljujemo
      let progress = 0;
      
      if (viewportCenter < elementCenter - proximityThreshold) {
        // Sekcija je ispod nas (skrolujemo gore, sekcija se "udaljava" dole)
        const maxDistance = elementHeight + window.innerHeight;
        const actualDistance = elementCenter - viewportCenter - proximityThreshold;
        progress = Math.min(1, actualDistance / maxDistance);
        progress = -progress; // Negativan za animaciju "prema gore"
      } else if (viewportCenter > elementCenter + proximityThreshold) {
        // Sekcija je iznad nas (skrolujemo dole, sekcija se "udaljava" gore)
        const maxDistance = elementHeight + window.innerHeight;
        const actualDistance = viewportCenter - elementCenter - proximityThreshold;
        progress = Math.min(1, actualDistance / maxDistance);
      }
      
      const multiplier = direction === 'left' ? -1 : 1;
      const offset = progress * speed * 120 * multiplier;
      return `translateX(${offset}px)`;
    } else {
      // Desktop logika - postojeća logika
      const distanceFromCenter = viewportCenter - elementCenter;
      const multiplier = direction === 'left' ? -1 : 1;
      const offset = distanceFromCenter * speed * multiplier;
      return `translateX(${offset}px)`;
    }
  };

  const handleClick = () => {
    const hero9 = document.getElementById('hero9');
    if (hero9) {
      hero9.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      {/* Dodajemo pozadinu koja koristi offsetY za parallax efekat */}
      <div
        className={styles.background}
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      <div className={styles.content}>
        <h1 
          style={{ 
            transform: isMobile 
              ? getElementParallax('left', 1.2)
              : getElementParallax('left', 0.25),
            transition: 'transform 0.1s ease-out',
          }}
        >
          Naše usluge
        </h1>
        <button 
          className={styles.button} 
          onClick={handleClick}
          style={{ 
            transform: isMobile 
              ? getElementParallax('right', 1.2)
              : getElementParallax('right', 0.3),
            transition: 'transform 0.1s ease-out',
          }}
        >
          Pogledajte usluge
        </button>
      </div>
    </div>
  );
}

export default Hero8;
