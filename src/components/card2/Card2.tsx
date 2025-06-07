import styles from './Card2.module.scss';

type CardProps = {
  image: string;
  text: string;
  link?: string; // dodato
};

function Card2({ image, text, link }: CardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Card" className={styles.image} />
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <p className={styles.text}>{text}</p>
        </a>
      ) : (
        <p className={styles.text}>{text}</p>
      )}
    </div>
  );
}

export default Card2;

