import { Link } from 'react-router-dom';  
import { useEffect, useRef, useState } from 'react';
import styles from './Hero3.module.scss';

function Hero3() {
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
        }}
      >
        <h1 
          className={styles.title}
          style={{
            transform: getElementParallax('left', isMobile ? 1.2 : 0.25),
          }}
        >
          Upoznajte naš tim
        </h1>
        
        <Link 
          to="about" 
          className={styles.button}
          style={{
            transform: getElementParallax('right', isMobile ? 1.2 : 0.3),
          }}
        >
          O nama
        </Link>
      </div>
    </div>
  );
}

export default Hero3;
