import styles from './Hero7.module.scss'
import Card2 from '../card2/Card2.tsx'
function Hero7(){
   return(
  <div className={styles.wrapper}>
    <div className={styles['card-container']}>
      <Card2 image="/assets/hero7/camera.png" text="Naš instagram" link="https://www.instagram.com/carstudiozajecar/"/>
      <Card2 image="/assets/hero7/placeholder.png" text="Katanićeva 2, Zaječar"/>
      <Card2 image="/assets/hero7/clock.png" text="Radnim danima od 8h-17h, vikendom ne radimo."/>
      <Card2 image="/assets/hero7/telephone.png" text="+381 60 3535686, Dragan"/>
    </div>


  </div>

  )
};

export default Hero7;
