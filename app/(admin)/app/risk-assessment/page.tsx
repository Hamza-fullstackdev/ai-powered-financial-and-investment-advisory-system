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
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function page() {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    savings: '',
    experience: '',
    timeHorizon: '',
    marketDrop: '',
    financialGoal: '',
    lossTolerance: '',
    takeLoan: '',
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/ai/risk-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      setLoading(false);
      if (res.ok) {
        setError(false);
        setOpenModal(true);
        setLoading(false);
        setFormData({
          age: '',
          income: '',
          savings: '',
          experience: '',
          timeHorizon: '',
          marketDrop: '',
          financialGoal: '',
          lossTolerance: '',
          takeLoan: '',
        });
        setResponse(result.aiResponse ?? 'Somethings went wrong');
      } else {
        setLoading(false);
        setError(true);
        setErrorMessage(result.message ?? 'Somethings went wrong');
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage('Somethings went wrong' + error);
    }
  };
  return (
    <section>
      <form onSubmit={handleSubmitForm}>
        <Card className="mx-auto w-full md:w-[800px]">
          <CardHeader>
            <CardTitle className="text-2xl">Risk Assessment Form</CardTitle>
            <CardDescription>
              Fill out the risk assessment form below so Ai Advisor can provide you with
              personalized financial advice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <Separator />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="age">Age Group:</Label>
                <Select
                  name="age"
                  required
                  value={formData.age}
                  onValueChange={(value) => setFormData({ ...formData, age: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-25">Below 25</SelectItem>
                    <SelectItem value="25-35">25-35</SelectItem>
                    <SelectItem value="35-45">36-50</SelectItem>
                    <SelectItem value="51-65">51-65</SelectItem>
                    <SelectItem value="above-65">Above 65</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="income">Income Source:</Label>
                <Select
                  name="income"
                  required
                  value={formData.income}
                  onValueChange={(value) => setFormData({ ...formData, income: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Income Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed-salary">Fixed Salary</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="savings">Monthly Savings (in %):</Label>
                <Select
                  name="savings"
                  required
                  value={formData.savings}
                  onValueChange={(value) => setFormData({ ...formData, savings: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Income Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-10%">Less than 10%</SelectItem>
                    <SelectItem value="10-25%">10-25%</SelectItem>
                    <SelectItem value="26-50%">26-50%</SelectItem>
                    <SelectItem value="more-50%">More than 50%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="experience">Investment Experience:</Label>
                <Select
                  name="experience"
                  required
                  value={formData.experience}
                  onValueChange={(value) => setFormData({ ...formData, experience: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-experience">No experience</SelectItem>
                    <SelectItem value="basic-experience">Basic experience</SelectItem>
                    <SelectItem value="moderate-experience">Moderate (3+ years)</SelectItem>
                    <SelectItem value="expert-experience">Expert experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="time-horizon">Investment Time Horizon:</Label>
                <Select
                  name="time-horizon"
                  required
                  value={formData.timeHorizon}
                  onValueChange={(value) => setFormData({ ...formData, timeHorizon: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Time Horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-1-year">Less than 1 year</SelectItem>
                    <SelectItem value="1-3-years">1–3 years</SelectItem>
                    <SelectItem value="3-5-years">3–5 years</SelectItem>
                    <SelectItem value="more-5-years">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="market-drop">Market Drop Reaction:</Label>
                <Select
                  name="market-drop"
                  required
                  value={formData.marketDrop}
                  onValueChange={(value) => setFormData({ ...formData, marketDrop: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Reaction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sell-all">I will sell everything</SelectItem>
                    <SelectItem value="sell-some">I will sell some</SelectItem>
                    <SelectItem value="hold">I will hold</SelectItem>
                    <SelectItem value="buy-all">I will buy all</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="financial-goal">Financial Goal Type:</Label>
                <Select
                  name="financial-goal"
                  required
                  value={formData.financialGoal}
                  onValueChange={(value) => setFormData({ ...formData, financialGoal: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Financial Goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wealth-growth">Wealth growth</SelectItem>
                    <SelectItem value="stable-returns">Stable returns</SelectItem>
                    <SelectItem value="retirement-planning">Retirement planning</SelectItem>
                    <SelectItem value="emergency-fund">Emergency fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <Label htmlFor="loss-tolerance">
                  What&apos;s the max % loss you can tolerate in a year?
                </Label>
                <Select
                  name="loss-tolerance"
                  required
                  value={formData.lossTolerance}
                  onValueChange={(value) => setFormData({ ...formData, lossTolerance: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Loss Tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-5%">Less than 5%</SelectItem>
                    <SelectItem value="5-10%">5-10%</SelectItem>
                    <SelectItem value="10-20%">10-20%</SelectItem>
                    <SelectItem value="more-20%">More than 20%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3 flex flex-col gap-2">
                <Label htmlFor="take-loan">
                  Have you ever taken a loan or used a credit card frequently?
                </Label>
                <Select
                  name="take-loan"
                  required
                  value={formData.takeLoan}
                  onValueChange={(value) => setFormData({ ...formData, takeLoan: value })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Below" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regularly">Yes, regularly</SelectItem>
                    <SelectItem value="sometimes">Sometimes</SelectItem>
                    <SelectItem value="rarely">Rarely</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
              <DialogTrigger asChild>
                <Button disabled={loading} size={'lg'} type="submit" className="cursor-pointer">
                  Calculate Risk Using Ai
                </Button>
              </DialogTrigger>
              <DialogContent className="h-[500px] md:h-[570px] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Ai Analysis Result</DialogTitle>
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
                        p: ({ node, ...props }) => (
                          <p className="mb-2 text-gray-800 dark:text-gray-300" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-semibold text-green-600" {...props} />
                        ),
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
