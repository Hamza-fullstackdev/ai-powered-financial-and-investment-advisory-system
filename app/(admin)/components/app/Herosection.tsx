'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Check, Pen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Herosection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(30000);

  const handleCheck = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  return (
    <div>
      <div className="mt-5 mb-3">
        <h1 className="text-3xl md:text-[32px] font-bold text-center md:text-left">Dashboard</h1>
      </div>
      <Card>
        <CardContent>
          <div className="mt-4 flex flex-col gap-1">
            <h2 className="font-semibold text-sm">Monthly Budget (Default account)</h2>
            <div className="flex flex-row items-center gap-3">
              {!isEditing ? (
                <>
                  <Label htmlFor="amount" className="text-gray-600">
                    {amount} out of 100000 spent
                  </Label>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    size={'sm'}
                    onClick={() => setIsEditing(true)}
                  >
                    <Pen fontSize={12} />
                  </Button>
                </>
              ) : (
                <>
                  <Input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount"
                    className="w-[130px]"
                  />
                  <div className="flex flex-row items-center gap-3">
                    <Button variant="outline" className="cursor-pointer" onClick={handleCheck}>
                      <Check className="text-green-600" />
                    </Button>
                    <Button variant="outline" className="cursor-pointer" onClick={handleCancel}>
                      <X className="text-red-600" />
                    </Button>
                  </div>
                </>
              )}
            </div>
            <Progress value={50} className="mt-2" />
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          <div className="text-xs">
            <p className="text-gray-500">You have spent 50% of your budget.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Herosection;
