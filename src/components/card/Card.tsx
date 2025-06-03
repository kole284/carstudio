import styles from './Card.module.scss';

type CardProps = {
  image: string;
  title: string;
  text: string;
};

function Card({ image, title, text }: CardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Card" className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default Card;

