'use client';
import { Input } from '@/components/ui/input';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  const currentUser = useSelector((state: RootState) => state.user);
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
  const [visibleWords, setVisibleWords] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptToSend(`
     You are a professional financial and investment advisory assistant.

Your ONLY job is to provide advice, analysis, or guidance related to:
- finance
- investment
- personal wealth
- stock markets
- economics
- retirement or savings planning

ONLY answer if the user query is related to these topics.  
If the query is NOT related to any of these, respond ONLY with:  
**"I'm only here to assist with finance and investment-related topics."**

Here is the user prompt: ${e.target.value}`);
  };
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: promptToSend,
      });
      setLoading(false);
      console.log(res);
      if (res.text) {
        setResponse(res.text ?? 'Somethings Wrong');
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
    try {
      setLoading(true);
      const res = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Explain in detail: ${prompt}`,
      });
      setLoading(false);
      console.log(res);
      if (res.text) {
        setResponse(res.text ?? 'Somethings Wrong');
        setLoading(false);
      } else {
        setResponse("I'm only here to assist with finance and investment-related topics.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!response) return;

    const words = response.split(' ');
    let index = 0;

    setVisibleWords([]);

    const interval = setInterval(() => {
      const nextWords = words.slice(index, index + 20);
      setVisibleWords((prev) => [...prev, ...nextWords]);
      index += 20;

      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [response]);
  return (
    <section className="w-full">
      <div className="my-10">
        <h1 className="font-bold text-2xl md:text-4xl text-center leading-tight">
          {currentUser?.fname}&apos;s AI Assistant is live! <br className="hidden md:block" />
          Ask now to get expert AI suggestions
        </h1>
      </div>
      <form onSubmit={handleFormData}>
        <div>
          <Input
            type="text"
            id="prompt"
            className="w-full py-5"
            placeholder="In Which Stocks to invest?"
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </form>
      <div className="mt-3 flex items-center flex-wrap gap-2" hidden={loading}>
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
      <div className="prose w-full my-8 text-[15px] text-gray-600">
        {loading && <p>Thinking...</p>}
        {loading ? (
          Array.from({ length: 15 }).map((_, index) => (
            <Skeleton key={index} className="mt-4 w-full h-[30px]" />
          ))
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-2" {...props} />,
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold mt-4 mb-1" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-2 text-gray-800" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-black" {...props} />
              ),
              em: ({ node, ...props }) => <em className="italic text-gray-700" {...props} />,
              table: ({ node, ...props }) => <Table {...props} />,
              thead: ({ node, ...props }) => <TableHeader {...props} />,
              th: ({ node, ...props }) => <TableHead className="italic text-gray-700" {...props} />,
              tbody: ({ node, ...props }) => <TableBody {...props} />,
              tr: ({ node, ...props }) => <TableRow {...props} />,
              td: ({ node, ...props }) => <TableCell {...props} />,
            }}
          >
            {visibleWords.join(' ')}
          </ReactMarkdown>
        )}
      </div>
    </section>
  );
}
