import styles from './Hero7.module.scss'
import Card2 from '../card2/Card2.tsx'
function Hero7(){
   return(
  <div className={styles.wrapper}>
    <div className={styles['card-container']}>
    <Card2 image="/assets/hero7/camera.png">
  <a href="https://www.instagram.com/carstudiozajecar/" className={styles.link}>Naš Instagram</a>
    </Card2>
    <Card2 image="/assets/hero7/placeholder.png">
      Katanićeva 2, Zaječar
    </Card2>
      <Card2 image="/assets/hero7/clock.png">
        Radnim danima od 8h-17h, vikendom ne radimo
      </Card2>
<Card2 image="/assets/hero7/telephone.png">
  <a href="tel:+381603535686" className={styles.link}>+381 60 3535686</a>, Dragan
    </Card2>
    </div>


  </div>

  )
};

export default Hero7;
