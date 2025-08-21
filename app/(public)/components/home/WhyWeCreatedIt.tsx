import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const WhyWeCreatedIt = () => {
  return (
    <>
      <section id="why" className="my-20 mx-4 sm:mx-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col gap-6">
            <h3 className="text-4xl font-semibold leading-tight">
              Bridging gaps in wealth and financial literacy
            </h3>
            <p>
              Finovate is created to address the critical gap in financial education and to combat
              growing wealth disparities. Our mission is to make advanced, personalized financial
              guidance accessible to everyone and empowering them to navigate their financial
              journey with confidence. By providing intuitive AI-driven insights, Finovate aims to
              bridge the wealth gap, fostering a future where effective financial management and
              literacy are within reach for everyone.
            </p>
            <div className="mt-4">
              <Link
                href={'#contact'}
                className="capitalize bg-green-500 hover:!bg-green-500/90 text-white px-6 py-4 text-sm rounded-full cursor-pointer"
              >
                Share your feedback
              </Link>
            </div>
          </div>
          <div className="rounded-2xl">
            <Image
              src="/money-and-calculator.png"
              alt="surface-person-img"
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>
      <section className="my-20 mx-4 sm:mx-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="rounded-2xl">
            <Image
              src="/surface-person.jpeg"
              alt="money-and-calculator-img"
              width={500}
              height={500}
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="text-4xl font-semibold leading-tight">
              Your Path to Financial Success Starts Here
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <Check size={22} className="text-green-500" />
                <span>
                  <strong>Secure Bank Integration:</strong> Easily connect your accounts for
                  accurate insights.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={22} className="text-green-500" />
                <span>
                  <strong>Detailed Spending Analysis:</strong> Understand where your money is going.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={22} className="text-green-500" />
                <span>
                  <strong>Custom Financial Challenges:</strong> Set goals and follow through with
                  step-by-step guidance.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={22} className="w-8 h-8 text-green-500" />
                <span>
                  <strong>Real-Time Insights & Alerts:</strong> Stay updated on your progress and
                  get alerts when important changes happen.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check size={22} className="w-8 h-8 text-green-500" />
                <span>
                  <strong>Ask Finovate Anything:</strong> Have questions about money? Ask Finovate
                  and get instant, personalized advice.
                </span>
              </li>
            </ul>
            <div className="mt-4">
              <Link
                href={'#contact'}
                className="capitalize bg-green-500 hover:!bg-green-500/90 text-white px-6 py-4 text-sm rounded-full cursor-pointer"
              >
                Share your feedback
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyWeCreatedIt;
