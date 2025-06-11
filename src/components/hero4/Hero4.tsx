import { Link } from 'react-router-dom';  
import { useEffect, useRef, useState } from 'react';
import styles from './Hero4.module.scss';

function Hero4() {
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

  // Funkcija za desktop parallax efekat (gore-dole)
  const getDesktopParallax = (direction: 'up' | 'down', speed: number = 0.2) => {
    if (!ref.current || isMobile) return 'translateY(0px)';
    
    const elementTop = ref.current.offsetTop;
    const elementHeight = ref.current.offsetHeight;
    const elementCenter = elementTop + (elementHeight / 2);
    const viewportCenter = window.scrollY + (window.innerHeight / 2);
    
    const distanceFromCenter = viewportCenter - elementCenter;
    const multiplier = direction === 'up' ? -1 : 1;
    const offset = distanceFromCenter * speed * multiplier;
    
    return `translateY(${offset}px)`;
  };

  // Funkcija za mobilni parallax efekat (levo-desno) sa centriranjem
  const getMobileParallax = (direction: 'left' | 'right', speed: number = 0.2) => {
    if (!isMobile || !ref.current) return 'translateX(0px)';
    
    const elementTop = ref.current.offsetTop;
    const elementHeight = ref.current.offsetHeight;
    const elementCenter = elementTop + (elementHeight / 2);
    const viewportCenter = window.scrollY + (window.innerHeight / 2);
    
    // Mobilna logika sa centriranjem - animacija staje kada su elementi centrirani
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
  };

  return (
    <div
      ref={ref}
      className={styles.wrapper}
      style={{ transform: `translateY(${offsetY * 0.1}px)` }}
    >
      <div className={styles.content}>
        <div 
          className={styles.mapContainer}
          style={{
            transform: isMobile 
              ? getMobileParallax('right', 1.2)    // Mobilni: mapa sa desne strane
              : getDesktopParallax('down', 0.25),  // Desktop: mapa silazi dole
            transition: 'transform 0.1s ease-out',
          }}
        >
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
        
        <div 
          className={styles.textContainer}
          style={{
            transform: isMobile 
              ? getMobileParallax('left', 1.2)     // Mobilni: tekst sa leve strane
              : getDesktopParallax('up', 0.2),     // Desktop: tekst se penje gore
            transition: 'transform 0.1s ease-out',
          }}
        >
          <h1>Kontaktirajte nas</h1>
          <Link to="/contact" className={styles.button}>Pošaljite poruku</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero4;
