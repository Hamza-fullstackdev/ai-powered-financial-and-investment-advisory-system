'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  return (
    <section className="pt-20">
      <div className="w-[90%] mx-auto">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl text-center leading-tight">
            Ai Powered <span className="text-green-600">Financial and Investment</span> Advisory
            System
          </h1>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 items-center gap-10">
          <div>
            <p className="text-gray-700">
              Our platform delivers personalized financial insights, portfolio strategies, and
              real-time market analysis.
            </p>
            <div className="my-3 border-t border-gray-400"></div>
            <div>
              <ul className="flex flex-col gap-1 list-disc list-inside">
                <li>
                  <span className="text-green-600 font-semibold">
                    AI-Powered Investment Insights
                  </span>
                </li>
                <li>
                  <span className="text-green-600 font-semibold">
                    Smart Financial Decision Making
                  </span>
                </li>
                <li>
                  <span className="text-green-600 font-semibold">Real-Time Market Analysis</span>
                </li>
                <li>
                  <span className="text-green-600 font-semibold">24/7 Financial Intelligence</span>
                </li>
                <li>
                  <span className="text-green-600 font-semibold">
                    Data-Driven Wealth Strategies
                  </span>
                </li>
                <li>
                  <span className="text-green-600 font-semibold">Goal-Based Investment Plans</span>
                </li>
                <li>
                  <span className="text-green-600 font-semibold">Secure AI Investment System</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="order-3 md:order-2 flex items-center justify-center">
            <Image
              src={'/happy-family.png'}
              alt="happy-family"
              width={500}
              height={500}
              className="object-cover"
            />
          </div>
          <div className="order-2 md:order-3 flex items-center justify-start md:justify-center relative">
            <div>
              <Image
                src={'/accent.png'}
                alt="accent-line"
                width={100}
                height={100}
                className="hidden md:block size-auto object-cover absolute top-[-80px]"
              />
              <h3 className="font-semibold">Consult with Ai agent</h3>
              <div className="mt-5">
                <Link href={'/'}>
                  <Button className="rounded-full cursor-pointer" size={'xl'}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
