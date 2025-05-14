'use client';
import { Separator } from '@/components/ui/separator';
import { Wallet } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AccountDetailsForm from './AccountDetailsForm';
import { Skeleton } from '@/components/ui/skeleton';

type CardDetails = {
  cardNumber: string;
  cardHolder: string;
  cardCvc: string;
};

const CardDetails = () => {
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardDetails[]>([]);
  useEffect(() => {
    const getCardDetails = async () => {
      setLoading(true);
      const res = await fetch('/api/user/card-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setCardDetails(data.getCardInfo);
        setLoading(false);
      }
      if (data.length > 0) {
        setShowCard(false);
      } else {
        setShowCard(true);
      }
    };
    getCardDetails();
  }, []);
  return (
    <div className="my-10">
      <div>
        <h2 className="text-xl font-semibold">Financial details</h2>
        <p className="text-gray-500">Add your expenses details below to get started</p>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-3">
        {showCard && <AccountDetailsForm />}
        {loading ? (
          <Skeleton className="w-full md:w-[400px] h-[250px] col-span-2" />
        ) : (
          cardDetails.map((card, index) => {
            const cardNumberChunks = card.cardNumber.match(/.{1,4}/g) || [];
            return (
              <div
                key={index}
                className="relative w-full h-full py-5 px-5 border border-gray-500 rounded-lg bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white"
              >
                <div className="flex items-center justify-between">
                  <Wallet size={30} />
                  <Image
                    src={
                      'https://moicjaafyhsjcbmfeviv.supabase.co/storage/v1/object/sign/app/Visa-logo-white.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2VhNzk2MTdiLWE1MTAtNDNhYy05YTkxLTZkOGMxOTdhMWEzOSJ9.eyJ1cmwiOiJhcHAvVmlzYS1sb2dvLXdoaXRlLndlYnAiLCJpYXQiOjE3NDcyMzMyOTAsImV4cCI6MTc3ODc2OTI5MH0.QpITS5jtRXJ8_sCaHgqVZneixCsNqUOOBUG1JZz2TVU'
                    }
                    alt="visa"
                    width={50}
                    height={50}
                    className="size-auto rounded-full"
                  />
                </div>
                <div className="mt-10">
                  <div>
                    <h3 className="text-[22px] flex gap-5 tracking-widest">
                      {cardNumberChunks.map((chunk, idx) => (
                        <span key={idx}>{chunk}</span>
                      ))}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Card Holder</p>
                        <h4 className="text-lg tracking-widest uppercase">{card.cardHolder}</h4>
                      </div>
                      <div>
                        <p className="text-sm text-gray-100">Cvc</p>
                        <h4 className="text-lg tracking-widest">{card.cardCvc}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CardDetails;
