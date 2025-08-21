import { BadgeCheck, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Insurance = () => {
  return (
    <section className="my-20 mx-4 sm:mx-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="relative">
          <Image
            src="/agent.png"
            alt="agent-img"
            width={500}
            height={500}
            className="object-cover bg-white/30"
          />
          <div className="absolute top-[20%] left-[15%] border border-gray-300 rounded-full w-[20px] h-[20px] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="absolute top-[10%] left-[65%] border border-gray-300 rounded-full w-[30px] h-[30px] flex items-center justify-center">
            <BadgeCheck size={22} className="text-green-500" />
          </div>
        </div>
        <div id="services" className="flex flex-col gap-4">
          <h3 className="text-4xl font-semibold leading-tight">
            Your AI-powered Personal Financial Advisor
          </h3>
          <p>
            From paying off debt to saving for your future, Tendi is an AI-powered personal
            financial advisor that helps you understand, plan, and achieve your financial goals with
            ease.
          </p>
          <div className="my-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold">Easy to claim insurance</h3>
                </div>
                <p className="mt-2">Consectetur adipiscing elit sed do eiusmod tempor.</p>
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold">Financial Security</h3>
                </div>
                <p className="mt-2">Quis nostrum exercitationem ullam corporis suscipit</p>
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold">Retirement Planning</h3>
                </div>
                <p className="mt-2">Reprehenderit qui in ea voluptate velit esse quam.</p>
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <h3 className="font-semibold">Worldwide Coverage</h3>
                </div>
                <p className="mt-2">perspiciatis unde omnis iste natus error sites voluptatem.</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href={'#contact'}
              className="capitalize bg-green-500 hover:!bg-green-500/90 text-white px-6 py-4 text-sm rounded-full cursor-pointer"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insurance;
