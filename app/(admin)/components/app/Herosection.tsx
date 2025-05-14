'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Check, Pen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { error } from 'console';

interface AccountDetails {
  totalBalance: number;
  amountInvested: number;
  monthlyIncome: number;
  accountType: string;
  monthlyBudget: number;
  userId: string;
}

const Herosection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [accountInfo, setAccountInfo] = useState<AccountDetails>({
    totalBalance: 0,
    amountInvested: 0,
    monthlyIncome: 0,
    accountType: '',
    monthlyBudget: 0,
    userId: '',
  });
  const [spendings, setSpendings] = useState(1000);
  useEffect(() => {
    const getUserAccountInfo = async () => {
      const res = await fetch('/api/user/get-account', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        setAccountInfo(data.getAccountInfo);
      }
    };
    getUserAccountInfo();
  }, []);

  const handleCheck = async () => {
    setIsEditing(false);
    if (accountInfo?.monthlyBudget > spendings) {
      const res = await fetch('/api/user/update-account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          monthlyBudget: accountInfo?.monthlyBudget,
        }),
      });
      await res.json();
      if (res.ok) {
        window.location.reload();
      } else {
        console.log('Smoething went wrong');
      }
    } else {
      alert('Monthly budget should be greater than spendings');
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const percentage = parseFloat(((spendings / accountInfo?.monthlyBudget) * 100).toFixed(0));
  return (
    <div>
      <div className="mt-5 mb-3">
        <h1 className="text-3xl md:text-[32px] font-bold">Dashboard</h1>
      </div>
      <Card>
        <CardContent>
          <div className="mt-4 flex flex-col gap-1">
            <h2 className="font-semibold text-sm">Monthly Budget ({accountInfo?.accountType})</h2>
            <div className="flex flex-row items-center gap-3">
              {!isEditing ? (
                <>
                  <Label htmlFor="amount" className="text-gray-600">
                    ${spendings || 0} out of ${accountInfo?.monthlyBudget || 0} spent
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
                    className="w-[130px]"
                    value={accountInfo?.monthlyBudget}
                    onChange={(e) =>
                      setAccountInfo({ ...accountInfo, monthlyBudget: +e.target.value })
                    }
                    min={0}
                    max={accountInfo?.monthlyBudget}
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
            <Progress
              color="red"
              value={percentage}
              className={`mt-2 [&>div]:${percentage > 80 ? 'bg-destructive' : 'bg-primary'}`}
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          <div className="text-xs">
            <p className="text-gray-500">You have spent {percentage || 0}% of your budget.</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Herosection;
