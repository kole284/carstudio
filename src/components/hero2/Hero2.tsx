import styles from './Hero2.module.scss'
import Card from '../card/Card.tsx'
function Hero2(){
  return(
  <div className={styles.wrapper}>
    <div className={styles['card-container']}>
      <Card image="/assets/hero2/fast.png" title="Chip-tuning" text="Veća snaga, bolji odziv i optimizovane performanse – sve to uz bezbedan chip tuning."/>
      <Card image="/assets/hero2/motherboard.png" title="Elektronika" text="Problemi sa senzorima, osvetljenjem ili elektronikom? Mi ih rešavamo brzo i efikasno."/>
      <Card image="/assets/hero2/tire.png" title="Mehanika" text="Kvalitetan i brz mehanički servis za sve vrste kvarova — vozilo u sigurnim rukama. "/>
    </div>


  </div>

  )
}
export default Hero2;
