// Hero7.tsx
import { useEffect, useRef } from 'react'
import styles from './Hero7.module.scss'
import Card2 from '../card2/Card2.tsx'

function Hero7(){
   const containerRef = useRef<HTMLDivElement>(null)
   const cardsRef = useRef<(HTMLDivElement | null)[]>([])

   useEffect(() => {
      const handleScroll = () => {
         if (!containerRef.current || !cardsRef.current.length) return

         const containerRect = containerRef.current.getBoundingClientRect()
         const windowHeight = window.innerHeight

         const progress = Math.max(0, Math.min(1, 
            (windowHeight - containerRect.top) / (windowHeight + containerRect.height)
         ))

         cardsRef.current.forEach((card, index) => {
            if (!card) return

            const isMobile = window.innerWidth <= 768
            let transform = ''

            if (isMobile) {
               // Mobile horizontal animation - usporeno
               if (progress < 0.15) {
                  const enterProgress = progress / 0.15
                  if (index === 0 || index === 2) {
                     const translateX = -40 + (enterProgress * 40)
                     transform = `translateX(${translateX}px)`
                  } else {
                     const translateX = 40 - (enterProgress * 40)
                     transform = `translateX(${translateX}px)`
                  }
               } else if (progress < 0.85) {
                  transform = `translateX(0px)`
               } else {
                  const exitProgress = (progress - 0.85) / 0.15
                  if (index === 0 || index === 2) {
                     const translateX = exitProgress * 40
                     transform = `translateX(${translateX}px)`
                  } else {
                     const translateX = -(exitProgress * 40)
                     transform = `translateX(${translateX}px)`
                  }
               }
            } else {
               // Desktop vertical animation - usporeno
               if (progress < 0.3) {
                  if (index === 0 || index === 2) {
                     const translateY = -40 + (progress / 0.3) * 40
                     transform = `translateY(${translateY}px)`
                  } else {
                     const translateY = 40 - (progress / 0.3) * 40
                     transform = `translateY(${translateY}px)`
                  }
               } else if (progress < 0.8) {
                  const centerProgress = (progress - 0.3) / 0.5
                  if (index === 0 || index === 2) {
                     const translateY = -5 + (centerProgress * 10)
                     transform = `translateY(${translateY}px)`
                  } else {
                     const translateY = 5 - (centerProgress * 10)
                     transform = `translateY(${translateY}px)`
                  }
               } else {
                  const exitProgress = (progress - 0.8) / 0.2
                  if (index === 0 || index === 2) {
                     const translateY = 5 + (exitProgress * 40)
                     transform = `translateY(${translateY}px)`
                  } else {
                     const translateY = -5 - (exitProgress * 40)
                     transform = `translateY(${translateY}px)`
                  }
               }
            }

            card.style.transform = transform
            card.style.opacity = '1'
         })
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()

      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   return(
      <div className={styles.wrapper}>
         <div ref={containerRef} className={styles['card-container']}>
            <div 
               ref={(el) => cardsRef.current[0] = el}
               className={styles['card-wrapper']}
            >
               <Card2 image="/assets/hero7/camera.png">
                  <a href="https://www.instagram.com/carstudiozajecar/" className={styles.link}>Naš Instagram</a>
               </Card2>
            </div>
            <div 
               ref={(el) => cardsRef.current[1] = el}
               className={styles['card-wrapper']}
            >
               <Card2 image="/assets/hero7/placeholder.png">
                  Katanićeva 2, Zaječar
               </Card2>
            </div>
            <div 
               ref={(el) => cardsRef.current[2] = el}
               className={styles['card-wrapper']}
            >
               <Card2 image="/assets/hero7/clock.png">
                  Radnim danima od 8h-17h, vikendom ne radimo
               </Card2>
            </div>
            <div 
               ref={(el) => cardsRef.current[3] = el}
               className={styles['card-wrapper']}
            >
               <Card2 image="/assets/hero7/telephone.png">
                  <a href="tel:+381603535686" className={styles.link}>+381 60 3535686</a>, Dragan
               </Card2>
            </div>
         </div>
      </div>
   )
};

export default Hero7;

