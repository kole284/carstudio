import styles from './Card4.module.scss';

type CardProps4 = {
  image: string;
  mainTitle: string;
};

function Card4({ image, mainTitle }: CardProps4) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Slika" className={styles.image} />
      <h3 className={styles.mainTitle}>{mainTitle}</h3>
    </div>
  );
}

export default Card4;

