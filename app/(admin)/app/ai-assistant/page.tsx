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
import { ArrowDownNarrowWide, ArrowUp, CornerDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [inilialLoading, setInilialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conservations, setConversations] = useState({} as Conversation);
  const currentUser = useSelector((state: RootState) => state.user);
  const [directConversation, setDirectConversation] = useState<
    { prompt: string; response: string; loading?: boolean }[]
  >([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getUserConservation = async () => {
      try {
        setInilialLoading(true);
        const res = await fetch('/api/ai/ai-assistant', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setInilialLoading(false);
        if (res.ok) {
          setConversations(data.conservation);
          setInilialLoading(false);
          setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          setInilialLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserConservation();
  }, []);
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDirectConversation((prev) => [
      ...prev,
      { prompt: promptToSend, response: '', loading: true },
    ]);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
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
        setDirectConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            response: data.aiResponse,
            loading: false,
          };
          return updated;
        });
        setLoading(false);
      } else {
        setDirectConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            response: "I'm only here to assist with finance and investment-related topics.",
            loading: false,
          };
          return updated;
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePrompt = async (prompt: string) => {
    setPromptToSend(prompt);
    setDirectConversation((prev) => [...prev, { prompt, response: '', loading: true }]);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
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
        setDirectConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            response: data.aiResponse,
            loading: false,
          };
          return updated;
        });
        setLoading(false);
      } else {
        setDirectConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            response: "I'm only here to assist with finance and investment-related topics.",
            loading: false,
          };
          return updated;
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <section className="relative w-full">
      <div
        onClick={() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`${
          loading || inilialLoading ? 'hidden' : 'block'
        } cursor-pointer animate-bounce fixed bottom-10 right-5 z-99 w-fit h-fit bg-green-700 shadow-lg rounded-full flex justify-center items-center`}
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
        {inilialLoading && (
          <>
            <div className="w-full flex justify-end items-center">
              <div className="text-black max-w-[80%] w-fit p-5 bg-gray-100 rounded-lg">
                <Skeleton className="mt-4 w-full md:w-[400px] h-[30px]" />
              </div>
            </div>
            <Skeleton className="mt-4 w-full h-[500px]" />
          </>
        )}
        {conservations?.conservation?.map((item, index) => (
          <div key={index}>
            <div className="w-full flex justify-end items-center">
              <p className="text-black max-w-[80%] w-fit p-5 bg-gray-100 dark:bg-slate-800 dark:text-gray-400 rounded-lg">
                {item?.prompt}
              </p>
            </div>
            <div className="my-5 px-3 border-l-2 border-t-2 border-gray-600 dark:bg-slate-800 rounded-l-lg">
              <div className="py-5 flex items-start gap-5 border-b-2 border-dashed border-gray-600 rounded-t-lg">
                <div>
                  <CornerDownRight size={20} className="text-gray-800 dark:text-slate-400" />
                </div>
                <div className="dark:text-slate-400">{item?.prompt}</div>
              </div>
              <div className="my-3 py-3">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-green-700 text-2xl font-bold mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-green-600 text-xl font-semibold mt-4 mb-1" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2 text-gray-800 dark:text-gray-400" {...props} />
                    ),
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5 mb-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1 dark:text-gray-400" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-semibold text-green-600" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic text-gray-700 dark:text-gray-400" {...props} />
                    ),
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
          </div>
        ))}
        {directConversation.map((item, index) => (
          <div key={index}>
            <div className="w-full flex justify-end items-center">
              {item?.prompt && (
                <p className="text-black max-w-[80%] w-fit p-5 bg-gray-100 dark:bg-slate-800 dark:text-gray-400 rounded-lg">
                  {item.prompt}
                </p>
              )}
            </div>

            {item.loading ? (
              <>
                <Skeleton className="mt-4 w-full md:w-[400px] h-[30px]" />
                <Skeleton className="mt-4 w-full h-[500px]" />
              </>
            ) : item.response ? (
              <div className="my-5 px-3 border-l-2 border-t-2 border-gray-600 dark:bg-slate-800 rounded-l-lg">
                <div className="py-5 flex items-start gap-5 border-b-2 border-dashed border-gray-600 rounded-t-lg">
                  <div>
                    <CornerDownRight size={20} className="text-gray-800 dark:text-gray-400" />
                  </div>
                  <div className="dark:text-gray-400">{item.prompt}</div>
                </div>
                <div className="my-3 py-3">
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
                      p: ({ node, ...props }) => (
                        <p className="mb-2 text-gray-800 dark:text-gray-400" {...props} />
                      ),
                      ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-5 mb-2" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="mb-1 dark:text-gray-400" {...props} />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong className="font-semibold text-green-600" {...props} />
                      ),
                      em: ({ node, ...props }) => (
                        <em className="italic text-gray-700 dark:text-gray-400" {...props} />
                      ),
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
                    {item.response}
                  </ReactMarkdown>
                </div>
              </div>
            ) : null}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="w-full bg-white dark:bg-slate-900 z-10 sticky bottom-0">
        <form onSubmit={handleFormData}>
          <div>
            <Input
              type="text"
              id="prompt"
              className="relative w-full py-5 rounded-full"
              placeholder="In Which Stocks to invest?"
              onChange={(e) => setPromptToSend(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="absolute top-0 right-0 py-5 cursor-pointer rounded-full"
              disabled={loading || !promptToSend}
            >
              <ArrowUp size={20} />
            </Button>
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
