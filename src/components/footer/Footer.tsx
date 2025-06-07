import { useState } from 'react';
import styles from './Footer.module.scss';
import { FaGithub } from 'react-icons/fa';

function Footer() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
        Website made by:
        <FaGithub className={styles.githubIcon} />
        <a href="https://github.com/kole284" target="_blank">kole284</a>
        &amp;
        <FaGithub className={styles.githubIcon} />
        <a href="https://github.com/KaluMen" target="_blank">KaluMen</a>
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
            <p><a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Flaticon</a></p>
            <button onClick={() => setShowPopup(false)}>Zatvori</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;

