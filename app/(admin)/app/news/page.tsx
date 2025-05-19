'use client';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Dialog } from '@radix-ui/react-dialog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function page() {
  const [news, setNews] = useState([]);
  const [parmsValue, setParmsValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [summary, setSummary] = useState('');
  const [stockSummary, setStockSummary] = useState('');
  const [loader, setLoader] = useState(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (parmsValue.length >= 1) {
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
        const aiResponse = await fetch('/api/ai/stock-investment-suggestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock: parmsValue }),
        });
        const data = await res.json();
        const stockSuggestion = await aiResponse.json();
        setLoading(false);
        if (aiResponse.ok) {
          setStockSummary(stockSuggestion.aiResponse);
          setLoading(false);
        }
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

  const callGeminiApi = async (url: string) => {
    try {
      setLoader(true);
      const res = await fetch('/api/ai/news-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setLoader(false);
      if (res.ok) {
        setSummary(data.aiResponse);
        setLoader(false);
      }
    } catch (error: any) {
      setLoader(false);
      console.log(error.message);
    }
  };
  return (
    <section>
      <div className="my-10">
        <h1 className="font-bold text-2xl md:text-4xl text-center leading-tight">
          Get latest <span className="text-green-600">news and updates</span> about your favourite
          plateform here
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
      <div>
        {news.length > 0 && stockSummary && (
          <div className="my-4">
            <h2 className="text-lg font-semibold">
              AI Insights: Is Investing in <span className="text-green-600">{parmsValue}</span> a
              Good Idea?
            </h2>
            <div className="mt-2 text-gray-600 dark:text-gray-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {stockSummary}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
      <div className="my-4">
        {loading && (
          <div className="py-8 flex items-center justify-center">
            <div>
              <div className="mb-3 w-full flex items-center justify-center">
                <Loader2 className="animate-spin" size={38} />
              </div>
              <span>Please wait, we are fetching news for you</span>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(news || []).map((item: any, index: number) => (
            <div className="shadow" key={index}>
              <div>
                <img
                  src={`${
                    item?.content?.thumbnail?.resolutions?.[0]?.url ||
                    'https://moicjaafyhsjcbmfeviv.supabase.co/storage/v1/object/sign/app/no-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5X2VhNzk2MTdiLWE1MTAtNDNhYy05YTkxLTZkOGMxOTdhMWEzOSJ9.eyJ1cmwiOiJhcHAvbm8taW1hZ2UucG5nIiwiaWF0IjoxNzQ3MjMzNjg4LCJleHAiOjE3Nzg3Njk2ODh9.DPkEM4fmPX2QfnK3BP6wv77O0f60md_0Fo_xbP13MSU'
                  }`}
                  alt="news"
                  width={300}
                  height={300}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-4">
                <Link href={`${item?.content?.canonicalUrl.url}`} target="_blank">
                  <h2 className="font-semibold text-lg">{item?.content?.title.slice(0, 80)}...</h2>
                </Link>
                <p className="my-2 text-sm text-gray-600 dark:text-gray-400">
                  Author: {item?.content?.provider?.displayName}
                </p>
                <div>
                  <span className=" text-sm text-gray-600 dark:text-gray-400">
                    Published at: {item?.content?.pubDate.slice(0, 10)}
                  </span>
                </div>
                <div className="mt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white cursor-pointer"
                        size={'lg'}
                        onClick={() => callGeminiApi(item?.content?.canonicalUrl?.url)}
                      >
                        Summarize news using Ai
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="h-[500px] md:h-[570px] overflow-auto">
                      <DialogHeader>
                        <DialogTitle>Summarized news using Ai</DialogTitle>
                      </DialogHeader>
                      <Separator />
                      {loader ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="animate-spin" />
                        </div>
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                          {summary}
                        </ReactMarkdown>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
