import { useState } from 'react';
import styles from './Card3.module.scss';

type Service = {
  title: string;
  details: string;
};

type CardProps3 = {
  image: string;
  mainTitle: string;
  services: Service[];
};

function Card3({ image, mainTitle, services }: CardProps3) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className={styles.card}>
      {/* Sticky header sa slikom i naslovom */}
      <div className={styles.header}>
        <img src={image} alt="Glavna slika" className={styles.image} />
        <h3 className={styles.mainTitle}>{mainTitle}</h3>
      </div>
      
      {/* Scrollable content area */}
      <div className={styles.content}>
        {services.map((service, i) => (
          <div 
            key={service.title} 
            className={styles.serviceContainer}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Service title */}
            <div className={styles.serviceTitleContainer}>
              <h4 className={styles.serviceTitle}>{service.title}</h4>
            </div>
            
            {/* Service details ispod title-a */}
            {hoverIndex === i && (
              <div className={styles.serviceDetails}>
                {service.details}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card3;
