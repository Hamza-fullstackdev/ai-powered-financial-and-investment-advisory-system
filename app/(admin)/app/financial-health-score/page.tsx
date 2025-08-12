'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function HealthScore() {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    totalExpenses: '',
    totalDebt: '',
    totalInvestments: '',
    totalSavings: '',
    emergencyFund: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [response, setResponse] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/ai/financial-health-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setError(false);
        setOpenModal(true);
        setLoading(false);
        setFormData({
          monthlyIncome: '',
          totalExpenses: '',
          totalDebt: '',
          totalInvestments: '',
          totalSavings: '',
          emergencyFund: '',
        });
        setResponse(data.aiResponse ?? 'Something went wrong');
      } else {
        setError(true);
        setErrorMessage(
          data.aiResponse ?? 'Something went wrong, please try again in a few minutes.'
        );
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage('Something went wrong');
    }
  };
  return (
    <form className="my-5" onSubmit={handleFormData}>
      <Card className="w-full sm:w-[80%] mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Financial Health Score</CardTitle>
          <CardDescription>Calculate your financial health score</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                label: 'Monthly Income',
                placeholder: 'Monthly Income',
                type: 'number',
                name: 'monthlyIncome',
                value: formData.monthlyIncome,
              },
              {
                label: 'Total Expenses',
                placeholder: 'Total Expenses',
                type: 'number',
                name: 'totalExpenses',
                value: formData.totalExpenses,
              },
              {
                label: 'Total Debt',
                placeholder: 'Total Debt',
                type: 'number',
                name: 'totalDebt',
                value: formData.totalDebt,
              },
              {
                label: 'Total Investments',
                placeholder: 'Total Investments',
                type: 'number',
                name: 'totalInvestments',
                value: formData.totalInvestments,
              },
              {
                label: 'Total Savings',
                placeholder: 'Total Savings',
                type: 'number',
                name: 'totalSavings',
                value: formData.totalSavings,
              },
              {
                label: 'Emergency Fund',
                placeholder: 'Emergency Fund',
                type: 'number',
                name: 'emergencyFund',
                value: formData.emergencyFund,
              },
            ].map((field, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  value={field.value}
                  placeholder={field.placeholder}
                  required
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end">
            <Dialog open={openModal} onOpenChange={() => setOpenModal(false)}>
              <DialogTrigger asChild>
                <Button disabled={loading} type="submit" className="cursor-pointer">
                  Calculate Score
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[500px] md:max-h-[550px] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Financial Health Score</DialogTitle>
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
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
