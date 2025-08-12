import HeroSection from '@/app/(public)/components/home/HeroSection';
import Advertisement from '@/app/(public)/components/home/Advertisement';
import Insurance from '@/app/(public)/components/home/Insurance';
import About from '@/app/(public)/components/home/About';
import HowItWorks from '@/app/(public)/components/home/HowItWorks';
import WhyWeCreatedIt from '@/app/(public)/components/home/WhyWeCreatedIt';
import Contact from '@/app/(public)/components/contact/HeroSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Advertisement />
      <Insurance />
      <div className="mx-4 sm:mx-16 my-20 border-b border-gray-300" />
      <About />
      <div className="mx-4 sm:mx-16 my-20 border-b border-gray-300" />
      <HowItWorks />
      <div className="mx-4 sm:mx-16 my-20 border-b border-gray-300" />
      <WhyWeCreatedIt />
      <div className="mx-4 sm:mx-16 my-20 border-b border-gray-300" />
      <Contact />
    </div>
  );
}
