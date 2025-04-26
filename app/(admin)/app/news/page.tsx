'use client';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { GoogleGenAI } from '@google/genai';
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
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

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
        const geminiResponse = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `Act Like you are a professional financial and investment advisory assistant.And then suggest if investing in this stock is a good idea (in short paragraph): ${parmsValue}`,
        });
        const data = await res.json();
        setLoading(false);
        if (geminiResponse.text) {
          setStockSummary(geminiResponse.text);
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
      const res = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Summarize the content of this article news: ${url}`,
      });
      setLoader(false);
      if (res.text) {
        setSummary(res.text);
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
      <div>
        {news.length > 0 && stockSummary && (
          <div className="my-4">
            <h2 className="text-lg font-semibold">
              AI Insights: Is Investing in {parmsValue} a Good Idea?
            </h2>
            <div className="text-gray-600">
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
                    'https://moicjaafyhsjcbmfeviv.supabase.co/storage/v1/object/sign/app/no-image.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5Xzk0NmRhMmU1LWU0MWEtNDhlZC04Y2MwLTkxYjMyN2EwNTNhZSJ9.eyJ1cmwiOiJhcHAvbm8taW1hZ2UucG5nIiwiaWF0IjoxNzQ1NjM1MTI1LCJleHAiOjE4MDg3MDcxMjV9.wOj3uLO5SRwqEyKqcnloatxHlDzJmLn3Raxsd5Q4rOE'
                  }`}
                  alt="news"
                  width={300}
                  height={300}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="p-4">
                <Link href={`${item?.content?.canonicalUrl.url}`} target="_blank">
                  <h2 className="font-semibold text-lg">{item?.content?.title}</h2>
                </Link>
                <p className="my-2 text-sm text-gray-600">
                  Author: {item?.content?.provider?.displayName}
                </p>
                <div>
                  <span className=" text-sm text-gray-600">
                    Published at: {item?.content?.pubDate.slice(0, 10)}
                  </span>
                </div>
                <div className="mt-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white cursor-pointer"
                        size={'lg'}
                        onClick={() => callGeminiApi(item?.content?.canonicalUrl?.url)}
                      >
                        Summarize news using Ai
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="h-[500px] md:h-auto overflow-y-auto">
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
