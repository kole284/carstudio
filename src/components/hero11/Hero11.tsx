import styles from './Hero11.module.scss';
import Card4 from '../card4/Card4.tsx';
import { useState, useRef, useEffect } from 'react';

function Hero11() {
  const totalImages = 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

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
      if (delta > 0) nextSlide(); // swipe left
      else prevSlide(); // swipe right
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev === 0 ? totalImages - 1 : prev - 1));
      setFade(true);
      setIsAnimating(false);
    }, 500);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalImages);
      setFade(true);
      setIsAnimating(false);
    }, 500);
  };

  const currentImage = `/assets/cars/${currentIndex + 1}.jpg`;

  return (
    <div className={styles.wrapper} id="hero11">
      <div className={styles['card-container']}>
        <Card4 image="/assets/hero11/number-5.png" mainTitle="zaposlenih" />
        <Card4 image="/assets/hero11/15.png" mainTitle="+ godina iskustva" />
        <Card4 image="/assets/hero9/service.png" mainTitle="Preko 5000 automobila servisirano" />
      </div>

      <div
        className={styles.gallery}
        tabIndex={-1}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={`${styles.imageWrapper} ${fade ? styles.fadeIn : styles.fadeOut}`}>
          <img
            src={currentImage}
            alt={`Slika ${currentIndex + 1}`}
            className={styles.image}
            loading="lazy"
            draggable={false}
          />
        </div>

        <div className={styles.controls}>
          <button onClick={prevSlide} aria-label="Prethodna slika">&#10094;</button>
          <button onClick={nextSlide} aria-label="Sledeća slika">&#10095;</button>
        </div>
      </div>
    </div>
  );
}

export default Hero11;

