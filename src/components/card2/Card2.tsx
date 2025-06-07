import styles from './Card2.module.scss';
import type { ReactNode } from 'react';

type CardProps = {
  image: string;
  children: ReactNode;
};

function Card2({ image, children }: CardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Card" className={styles.image} />
      <div className={styles.text}>{children}</div>
    </div>
  );
}

export default Card2;

