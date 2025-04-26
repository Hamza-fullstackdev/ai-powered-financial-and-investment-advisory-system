'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function page() {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    savings: '',
    timeHorizon: '',
    riskPreference: '',
    monthlyInvestment: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `Help the user plan for the following goal:

Goal: ${formData?.title}
Target Amount: $${formData?.targetAmount}
Current Savings: $${formData?.savings}
Time Horizon: ${formData?.timeHorizon} years
Risk Preference: ${formData?.riskPreference}
Monthly Investment Capability: $${formData?.monthlyInvestment}
Priority: High

Please suggest:
- Whether the goal is achievable or not
- How much should the user invest monthly if not achievable
- What kind of investment plan (safe vs moderate vs aggressive)
- One motivational line
`,
      });
      setLoading(false);
      if (res.text) {
        setOpenModal(true);
        setLoading(false);
        setFormData({
          title: '',
          targetAmount: '',
          savings: '',
          timeHorizon: '',
          riskPreference: '',
          monthlyInvestment: '',
        });
        setResponse(res.text ?? 'Somethings went wrong');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmitForm}>
        <Card className="mx-auto w-full md:w-[800px]">
          <CardHeader>
            <CardTitle className="text-2xl">Goal Based Planning</CardTitle>
            <CardDescription>
              Define your financial goals, set a timeline, and let Ai guide you with a tailored
              investment strategy to make it happen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Goal Title:</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  required
                  placeholder='e.g. "Retirement Planning", "Buy a house", "Buy a car"'
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="target-amount">Goal Target Amount:</Label>
                <Input
                  type="number"
                  name="target-amount"
                  id="target-amount"
                  required
                  min={0}
                  placeholder="Amount in USD, e.g. 100000"
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="monthly-investment">Monthly Investment Willingness:</Label>
                <Input
                  type="number"
                  name="monthly-investment"
                  id="monthly-investment"
                  required
                  min={0}
                  placeholder="Amount in USD, (e.g., “I can invest $300 monthly for this goal”)"
                  onChange={(e) => setFormData({ ...formData, monthlyInvestment: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="savings">Current Savings Toward This Goal:</Label>
                <Input
                  type="number"
                  name="savings"
                  id="savings"
                  required
                  min={0}
                  placeholder="Amount in USD,  “I already saved $5,000”"
                  onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="time-horizon">Time Horizon to Achieve Goal:</Label>
                <Input
                  type="number"
                  name="time-horizon"
                  id="time-horizon"
                  required
                  min={0}
                  max={10}
                  placeholder="Years,  “e.g. 5 Years”"
                  onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="risk-preference">Risk Preference for This Goal:</Label>
                <Select
                  name="risk-preference"
                  required
                  onValueChange={(value) => setFormData({ ...formData, riskPreference: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Risk Preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low-risk">Low Risk</SelectItem>
                    <SelectItem value="medium-risk">Medium Risk</SelectItem>
                    <SelectItem value="high-risk">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
              <DialogTrigger asChild>
                <Button disabled={loading} size={'lg'} type="submit" className="cursor-pointer">
                  Generate Ai Response
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[500px] md:h-[600px] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Ai Response over your Goal Based Plan</DialogTitle>
                </DialogHeader>
                <Separator />
                <div>
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc pl-5 mb-2" {...props} />
                        ),
                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2 text-gray-800" {...props} />,
                      }}
                    >
                      {response}
                    </ReactMarkdown>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
