'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

const page = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: '',
    merchantName: '',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleButtonClick = () => {
    ref.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch('/api/ai/spendings', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        setFormData(result);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmition = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/user/transaction/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setLoading(false);
      if (response.ok) {
        router.push('/app');
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <section>
      <Card className="mx-auto w-full md:w-[800px]">
        <CardHeader>
          <CardTitle className="text-xl">Add Spendings</CardTitle>
          <CardDescription>
            Fill out the form or add new Spendings by scanning the script using Ai
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator />
          <div className="my-3">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              ref={ref}
              onChange={handleFileChange}
            />
            <Button
              onClick={handleButtonClick}
              disabled={loading}
              className="w-full cursor-pointer bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white"
            >
              {loading ? 'Scanning...' : 'Scan Script using AI'}
            </Button>
          </div>
          <Separator />
          <form className="mt-5" onSubmit={handleFormSubmition}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="col-span-2 flex flex-col gap-2">
                <Label htmlFor="merchantName">Merchant or Store:</Label>
                <Input
                  type="text"
                  id="merchantName"
                  name="merchantName"
                  placeholder="Merchant"
                  defaultValue={formData?.merchantName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="amount">Amount:</Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="0.00"
                  defaultValue={formData?.amount}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="date">Date:</Label>
                <Input
                  type="date"
                  className="w-full"
                  id="date"
                  name="date"
                  placeholder="MM/DD/YYYY"
                  defaultValue={
                    formData?.date ? new Date(formData.date).toISOString().split('T')[0] : ''
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <Label htmlFor="category">Category:</Label>
                <Select
                  value={formData?.category || ''}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="w-full" id="category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groceries">Groceries</SelectItem>
                    <SelectItem value="housing">Housing</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="other-expense">Other-expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <Label htmlFor="description">Description:</Label>
                <Input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Description"
                  defaultValue={formData?.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <Button disabled={loading} type="submit" className="w-full cursor-pointer">
                {loading ? 'Please wait...' : 'Add Spending'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
