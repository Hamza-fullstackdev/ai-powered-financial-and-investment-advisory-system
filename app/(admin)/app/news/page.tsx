'use client';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { set } from 'mongoose';
import Link from 'next/link';
import { useState } from 'react';

export default function page() {
  const [news, setNews] = useState([]);
  const [parmsValue, setParmsValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (parmsValue.length > 1) {
        setLoading(true);
        setNews([]);
        const res = await fetch(
          `https://yahoo-finance166.p.rapidapi.com/api/news/list-by-symbol?s=${parmsValue}&region=US&snippetCount=30`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': process.env.NEXT_PUBLIC_GET_NEWS_API || '',
              'x-rapidapi-host': process.env.NEXT_PUBLIC_GET_NEWS_HOSTNAME || '',
            },
          }
        );

        const data = await res.json();
        setLoading(false);
        if (data?.data?.main?.stream) {
          setNews(data.data.main.stream);
          setLoading(false);
        }
        if (!data) {
          setError(true);
          setErrorMessage('Please enter valid stocks keyword');
          setNews([]);
          setLoading(false);
        }
      }
    } catch (error) {
      setErrorMessage('Failed to fetch details, please try again with different keyword');
      setNews([]);
      setLoading(false);
    }
  };
  console.log(news);
  return (
    <section>
      <div className="my-10">
        <h1 className="font-bold text-2xl md:text-4xl text-center leading-tight">
          Get latest news and updates about your favourite plateform here
        </h1>
      </div>
      <form onSubmit={handleSubmitForm}>
        <Input
          type="text"
          id="news"
          className="w-full py-5"
          placeholder="TSLA, GOOGL, AMZN, AAPL etc.."
          onChange={(e) => setParmsValue(e.target.value)}
        />
      </form>
      <div className="my-8">
        {loading && (
          <p className="text-gray-600 text-sm">
            Please wait, we are fetching details for {parmsValue}...
          </p>
        )}
        {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
        {loading && <Skeleton className="mt-4 w-full h-[600px]" />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(news || []).map((item: any, index: number) => (
            <div className="shadow" key={index}>
              <div>
                <img
                  src={`${item?.content?.thumbnail?.resolutions?.[0]?.url}`}
                  alt="news"
                  width={300}
                  height={300}
                  className="size-auto"
                />
              </div>
              <div className="p-4">
                <Link href={`${item?.content?.canonicalUrl.url}`} target="_blank">
                  <h2 className="font-semibold text-lg">{item?.content?.title}</h2>
                </Link>
                <p className="my-2 text-sm text-gray-600">Author: {item?.content?.displayName}</p>
                <div>
                  <span className=" text-sm text-gray-600">
                    Published at: {item?.content?.pubDate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
