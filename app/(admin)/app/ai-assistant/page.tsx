'use client';
import { Input } from '@/components/ui/input';
import { RootState } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowDownNarrowWide } from 'lucide-react';

interface Conversation {
  _id: string;
  conservation: Array<{
    prompt: string;
    response: string;
  }>;
  createdAt: string;
}
export default function AiAssistant() {
  const promptOptions = [
    { prompt: 'Best investment plans' },
    { prompt: 'Should I invest in Bitcoin?' },
    { prompt: 'Retirement portfolio strategies' },
    { prompt: 'Top dividend stocks 2025' },
    { prompt: 'Asset allocation for beginners' },
    { prompt: 'High‑yield savings accounts' },
    { prompt: 'Crypto vs. stocks comparison' },
    { prompt: 'Tax‑efficient investing tips' },
    { prompt: 'Emerging markets to watch' },
    { prompt: 'Dollar‑cost averaging guide' },
    { prompt: 'Risk management techniques' },
  ];
  const [promptToSend, setPromptToSend] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [conservations, setConversations] = useState({} as Conversation);
  const currentUser = useSelector((state: RootState) => state.user);
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getUserConservation = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/ai/ai-assistant', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
          setConversations(data.conservation);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserConservation();
  }, []);
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/ai/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptToSend, userId: currentUser?._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setResponse(data?.aiResponse ?? 'Somethings Wrong');
        setLoading(false);
      } else {
        setResponse("I'm only here to assist with finance and investment-related topics.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePrompt = async (prompt: string) => {
    setPromptToSend(prompt);
    try {
      setLoading(true);
      const res = await fetch('/api/ai/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, userId: currentUser?._id }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setResponse(data?.aiResponse ?? 'Somethings Wrong');
        setLoading(false);
      } else {
        setResponse("I'm only here to assist with finance and investment-related topics.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(conservations);
  useEffect(() => {
    if (!response) return;

    const words = response.split(' ');
    let index = 0;

    setVisibleWords([]);

    const interval = setInterval(() => {
      const nextWords = words.slice(index, index + 40);
      setVisibleWords((prev) => [...prev, ...nextWords]);
      index += 40;

      if (index >= words.length) {
        clearInterval(interval);
      }
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);

    return () => clearInterval(interval);
  }, [response]);
  return (
    <section className="relative w-full">
      <div
        onClick={() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`${
          loading ? 'hidden' : 'block'
        } cursor-pointer animate-bounce fixed bottom-5 right-5 z-99 w-fit h-fit bg-green-700 shadow-lg rounded-full flex justify-center items-center`}
      >
        <div className="p-3">
          <ArrowDownNarrowWide size={20} className="text-white" />
        </div>
      </div>
      <div className="my-10">
        <h1 className="font-bold text-2xl md:text-4xl text-center leading-tight">
          <span className="text-green-600">{currentUser?.fname}&apos;s</span> AI Assistant is live!{' '}
          <br className="hidden md:block" />
          Ask now to get expert <span className="text-green-600">AI suggestions</span>
        </h1>
      </div>
      <div className="prose w-full my-8 text-[15px] text-gray-600">
        {conservations?.conservation?.map((item, index) => (
          <div key={index}>
            <div className="w-full flex justify-end items-center">
              <p className="text-black max-w-[80%] w-fit p-5 bg-gray-100 rounded-lg">
                {item?.prompt}
              </p>
            </div>
            <div className="my-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-green-600 text-2xl font-bold mb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-green-600 text-xl font-semibold mt-4 mb-1" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-2 text-gray-800" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-green-700" {...props} />
                  ),
                  em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
                  table: ({ node, ...props }) => <Table {...props} />,
                  thead: ({ node, ...props }) => <TableHeader {...props} />,
                  th: ({ node, ...props }) => (
                    <TableHead className="italic text-gray-700" {...props} />
                  ),
                  tbody: ({ node, ...props }) => <TableBody {...props} />,
                  tr: ({ node, ...props }) => <TableRow {...props} />,
                  td: ({ node, ...props }) => <TableCell {...props} />,
                }}
              >
                {item?.response}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading ? (
          <>
            <div className="w-full flex justify-end items-center">
              <p className="text-black max-w-[80%] w-fit p-5 bg-gray-100 rounded-lg">
                <Skeleton className="mt-4 w-full md:w-[400px] h-[30px]" />
              </p>
            </div>
            <Skeleton className="mt-4 w-full h-[500px]" />
          </>
        ) : (
          <div>
            <div className="w-full flex justify-end items-center">
              {promptToSend && (
                <p className="text-black max-w-[80%] w-fit p-5 bg-gray-100 rounded-lg">
                  {promptToSend}
                </p>
              )}
            </div>
            <div className="my-5">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-green-600 text-2xl font-bold mb-2" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-green-600 text-xl font-semibold mt-4 mb-1" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-2 text-gray-800" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                  strong: ({ node, ...props }) => (
                    <strong className="font-semibold text-green-700" {...props} />
                  ),
                  em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
                  table: ({ node, ...props }) => <Table {...props} />,
                  thead: ({ node, ...props }) => <TableHeader {...props} />,
                  th: ({ node, ...props }) => (
                    <TableHead className="italic text-gray-700" {...props} />
                  ),
                  tbody: ({ node, ...props }) => <TableBody {...props} />,
                  tr: ({ node, ...props }) => <TableRow {...props} />,
                  td: ({ node, ...props }) => <TableCell {...props} />,
                }}
              >
                {visibleWords.join(' ')}
              </ReactMarkdown>
            </div>
            <div ref={bottomRef} />
          </div>
        )}
      </div>
      <div className="w-full bg-white z-10 sticky bottom-1">
        <form onSubmit={handleFormData}>
          <div>
            <Input
              type="text"
              id="prompt"
              className="w-full py-5"
              placeholder="In Which Stocks to invest?"
              onChange={(e) => setPromptToSend(e.target.value)}
              disabled={loading}
            />
          </div>
        </form>
        <div className="mt-3 hidden md:flex items-center flex-wrap gap-2" hidden={loading}>
          {promptOptions.map(({ prompt }, idx) => (
            <span
              onClick={() => handlePrompt(prompt)}
              key={idx}
              className="text-xs md:text-sm text-gray-600 border border-gray-400 px-3 py-1 rounded-full cursor-pointer"
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
