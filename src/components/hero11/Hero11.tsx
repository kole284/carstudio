import styles from './Hero11.module.scss';
import Card4 from '../card4/Card4.tsx';
import { useEffect, useState, useRef } from 'react';

function Hero11() {
  const totalImages = 5;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [currentImageClass, setCurrentImageClass] = useState('');
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const cardData = [
    {
      image: '/assets/hero11/number-5.png',
      mainTitle: " stručnih zaposlenih"
    },
    {
      image: '/assets/hero11/15.png',
      mainTitle: " + godina sa vama"
    },
    {
      image: '/assets/hero11/sport-car.png',
      mainTitle: " Preko 5000 servisiranih automobila "
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          } else {
            const rect = entry.target.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.bottom < windowHeight * 0.2 || rect.top > windowHeight * 0.8) {
              entry.target.classList.remove(styles.visible);
            }
          }
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Onemogući hover efekte na mobilnom (samo mouse events, ne touch)
  useEffect(() => {
    if (isMobile) {
      const cards = document.querySelectorAll(`.${styles.cardAnimation} .card, [class*="card"]`);
      
      const preventHover = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      cards.forEach(card => {
        // Samo mouse events - dozvoljavamo touch za scroll
        card.addEventListener('mouseenter', preventHover);
        card.addEventListener('mouseover', preventHover);
        card.addEventListener('mouseleave', preventHover);
        card.addEventListener('click', preventHover);
      });

      return () => {
        cards.forEach(card => {
          card.removeEventListener('mouseenter', preventHover);
          card.removeEventListener('mouseover', preventHover);
          card.removeEventListener('mouseleave', preventHover);
          card.removeEventListener('click', preventHover);
        });
      };
    }
  }, [isMobile]);

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageClass(styles['fade-out']);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
      setCurrentImageClass(styles['fade-in']);
      
      setTimeout(() => {
        setCurrentImageClass('');
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageClass(styles['fade-out']);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
      setCurrentImageClass(styles['fade-in']);
      
      setTimeout(() => {
        setCurrentImageClass('');
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  const getImagePath = (index: number) => {
    return `/assets/cars/image${index + 1}.jpg`;
  };

  // Touch event handlers za galeriju
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Prevent card click/hover on mobile (not touch scroll)
  const handleCardInteraction = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['card-container']}>
        {cardData.map((card, index) => (
          <div
            key={index}
            ref={el => { cardRefs.current[index] = el}}
            className={`${styles.cardAnimation} ${isMobile ? styles.noHover : ''}`}
            style={{'--delay': `${index * 0.2}s`} as React.CSSProperties}
            onMouseEnter={handleCardInteraction}
            onMouseLeave={handleCardInteraction}
            onClick={handleCardInteraction}
          >
            <Card4 image={card.image} mainTitle={card.mainTitle} />
          </div>
        ))}
      </div>
      
      <div className={styles.gallery}>
        <div 
          className={styles.imageWrapper}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <img 
            src={getImagePath(currentIndex)} 
            alt={`Gallery image ${currentIndex + 1}`}
            className={`${styles.image} ${currentImageClass}`}
            draggable={false}
          />
        </div>
        
        <div className={styles.controls}>
          <button onClick={prevImage} disabled={isAnimating}>
            ‹
          </button>
          <button onClick={nextImage} disabled={isAnimating}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero11;
