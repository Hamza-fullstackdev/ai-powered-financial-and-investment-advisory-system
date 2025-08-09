import HeroSection from '@/app/(public)/components/home/HeroSection';
import Advertisement from '@/app/(public)/components/home/Advertisement';
import Insurance from '@/app/(public)/components/home/Insurance';
import Contact from './(public)/contact/page';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Advertisement />
      <Insurance />
      <div className="mx-4 sm:mx-16 my-20 border-b border-gray-300" />
      <Contact />
    </div>
  );
}
