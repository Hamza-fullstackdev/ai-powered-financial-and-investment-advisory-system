import Image from 'next/image';
import React from 'react';

const Advertisement = () => {
  return (
    <section className="bg-[#090A1D]">
      <div className="mx-4 sm:mx-16 flex flex-wrap md:flex-nowrap items-center gap-x-20 gap-y-10 py-20">
        <div className="w-full md:w-[30%]">
          <h2 className="text-2xl font-semibold text-white">
            Trusted by the top 100+ <br /> companies worldwide
          </h2>
        </div>
        <div className="w-full md:w-[70%] grid grid-cols-2 md:grid-cols-4 items-center gap-x-20 gap-y-5">
          {[
            '/partner-inspire.png',
            '/partner-network.png',
            '/partner-sitemark.png',
            '/partner-vision.png',
          ].map((src, i) => (
            <div key={i} className="relative">
              <Image src={src} alt="logo" width={120} height={80} className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
