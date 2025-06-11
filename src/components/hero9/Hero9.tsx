import { useState, useRef } from 'react';
import styles from './Hero9.module.scss';
import Card3 from '../card3/Card3.tsx';

function Hero9() {
  const usluge = [
    { title: 'Zatamnjivanje', details: 'Zatamnjivanje štiti od UV zraka i povećava privatnost.' },
    { title: 'Mehanika', details: 'Iskusni mehaničari za brzu dijagnostiku i popravku.' },
    { title: 'Elektronika', details: 'Uklanjanje kvarova na sistemu vozila sa modernom opremom.' },
    { title: 'Chiptuning', details: 'Povećajte snagu i efikasnost motora sigurno i profesionalno.' },
    { title: 'Presvlacenje neba i tapacira', details: 'Kvalitetna izrada i zamena unutrašnjih detalja.' },
    { title: 'Reparacija farova', details: 'Obnova farova za bolju vidljivost i estetiku.' },
    { title: 'Punjenje klima', details: 'Servis i punjenje klima uređaja za optimalnu temperaturu.' },
    { title: 'Servis podizaca stakala', details: 'Popravka i održavanje podizača stakala.' },
    { title: 'Multimedije', details: 'Ugradnja i servis multimedijalnih sistema.' },
    { title: 'Chiptuning', details: 'Optimizacija softvera motora radi bolje snage i ekonomičnosti.' },
  ];

  const totalImages = 21;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentImageClass, setCurrentImageClass] = useState('');

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) nextSlide(); // swipe levo
      else prevSlide(); // swipe desno
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageClass(styles['fade-out']);
    
    setTimeout(() => {
      setCurrentIndex(prev => (prev === 0 ? totalImages - 1 : prev - 1));
      setCurrentImageClass(styles['fade-in']);
      
      setTimeout(() => {
        setCurrentImageClass('');
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageClass(styles['fade-out']);
    
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalImages);
      setCurrentImageClass(styles['fade-in']);
      
      setTimeout(() => {
        setCurrentImageClass('');
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const currentImage = `/assets/services/${currentIndex + 1}.jpg`;

  return (
    <div className={styles.wrapper} id="hero9">
      <div
        className={styles.gallery}
        tabIndex={-1}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.imageWrapper}>
          <img
            src={currentImage}
            alt={`Slika ${currentIndex + 1}`}
            className={`${styles.image} ${currentImageClass}`}
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className={styles.controls}>
          <button onClick={prevSlide} aria-label="Prethodna slika" disabled={isAnimating}>&#10094;</button>
          <button onClick={nextSlide} aria-label="Sledeća slika" disabled={isAnimating}>&#10095;</button>
        </div>
      </div>
      <div className={styles['card-container']}>
        <Card3 image="/assets/hero9/service.png" mainTitle="Naše usluge" services={usluge} />
      </div>
    </div>
  );
}

export default Hero9;
