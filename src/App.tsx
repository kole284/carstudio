import styles from './App.module.scss';
import BurgerMenu from './components/burgermenu/Burgermenu';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home.tsx'
function App() {
  return (
    <>
      <Home/>
      <div className={styles.desktopNav}>
        <Navbar />
      </div>
      <div className={styles.mobileNav}>
        <BurgerMenu />
      </div>
    </>
  );
}

export default App;

