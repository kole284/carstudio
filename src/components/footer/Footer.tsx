import { useEffect, useState } from 'react';
import styles from './Footer.module.scss';

function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  // Prikaži info u konzoli prilikom mountovanja komponente
  useEffect(() => {
    console.log('Website made by:');
    console.log('kole284: https://github.com/kole284');
    console.log('KaluMen: https://github.com/KaluMen');
  }, []);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          © CarStudio 2025
        </div>
        <button className={styles.popupButton} onClick={() => setShowPopup(true)}>
        </button>
      </footer>

      {showPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <h3>Icons by</h3>
            <p>Eucalyp</p>
            <p>muhammed_usman</p>
            <p>Laisa Islam An</p>
            <p>Md Tan Uirul</p>
            <p>Bzzrincantation</p>
            <p>Freepik</p>
            <p>
              <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">
                Flaticon
              </a>
            </p>
            <button onClick={() => setShowPopup(false)}>Zatvori</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;

