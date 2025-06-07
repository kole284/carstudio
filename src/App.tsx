import { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Home from './pages/home/Home.tsx';
import About from './pages/about/About.tsx';
import Services from './pages/services/Services.tsx';
import Contact from './pages/contact/Contact.tsx';
import Navbar from './components/navbar/Navbar.tsx';
import BurgerMenu from './components/burgermenu/Burgermenu.tsx';
import Footer from './components/footer/Footer.tsx';

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setIsNavbarVisible(false); // skrolovanje nadole
      } else if (currentScrollY < lastScrollY.current) {
        setIsNavbarVisible(true); // skrolovanje nagore
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.appWrapper}>
      <div className={styles.content}>
        <Routes>
          <Route
  path="/"
  element={
    <Home
    />
  }
/>
<Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <div className={styles.desktopNav}>
        <Navbar hidden={!isNavbarVisible} />
      </div>
      <div className={styles.mobileNav}>
        <BurgerMenu />
      </div>
      <Footer />
    </div>
  );
}

export default App;
