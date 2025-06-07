import Hero from '../../components/hero/Hero.tsx';
import Hero2 from '../../components/hero2/Hero2.tsx';
import Hero3 from '../../components/hero3/Hero3.tsx';
import Hero4 from '../../components/hero4/Hero4.tsx';

function Home({ onHeroVisible }: { onHeroVisible: (visible: boolean, id: string) => void }) {
  return (
    <>
      <Hero />
      <Hero2 onVisible={onHeroVisible} />
      <Hero3 />
      <Hero4 />
    </>
  );
}

export default Home;

