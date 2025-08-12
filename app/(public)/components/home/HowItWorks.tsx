import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const HowItWorks = () => {
  return (
    <section id='how-it-works' className="my-20 mx-4 sm:mx-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
        <div className="bg-white/30 rounded-2xl">
          <div className='flex items-end justify-center h-full'>
            <Image
              src="/finovate-budget-half.png"
              alt="finovate-budget-half-img"
              width={300}
              height={300}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-4xl font-semibold leading-tight">
            Your Financial Journey, Simplified
          </h3>
          <ul className='flex flex-col gap-3'>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Securely connects to your bank accounts</span></li>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Analyzes your spending and saving patterns</span></li>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Shows you exactly where your money goes</span></li>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Provides a personalized financial plan tailored to you</span></li>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Offers unique challenges to improve your financial habits</span></li>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Tracks your progress toward your goals</span></li>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Gives you personalized financial advice when you need it</span></li>
            <li className='flex items-center gap-2'><Check size={22} className="text-green-500" /><span>Alerts you to important changes in your accounts</span></li>
          </ul>
          <div>
            <Button className="capitalize bg-green-500 hover:!bg-green-500/90 text-white p-6 rounded-full cursor-pointer">
              Share your feedback
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
