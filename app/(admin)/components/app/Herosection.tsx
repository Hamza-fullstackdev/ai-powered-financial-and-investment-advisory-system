'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Check, Pen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

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
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [spendings, setSpendings] = useState(0);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUserAccountInfo = async () => {
      const res = await fetch('/api/user/get-account', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setAccountInfo(data.getAccountInfo);
        setLoading(false);
      } else {
        setShowButton(false);
      }
    };
    const getSpendings = async () => {
      setLoading(true);
      const res = await fetch('/api/user/transaction/get-spendings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setSpendings(data.totalAmount);
        setLoading(false);
      } else {
        setError(true);
        setErrorMessage(data.message);
        setTimeout(() => {
          setError(false);
          setErrorMessage('');
        }, 2000);
        setLoading(false);
      }
    };
    getUserAccountInfo();
    getSpendings();
  }, []);

  const handleCheck = async () => {
    setIsEditing(false);
    if (accountInfo?.monthlyBudget > spendings) {
      setLoading(true);
      try {
        const res = await fetch('/api/user/update-account', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            monthlyBudget: accountInfo?.monthlyBudget,
          }),
        });
        const data = await res.json();
        setLoading(false);
        if (res.ok) {
          setLoading(false);
        } else {
          setError(true);
          setErrorMessage(data.message);
          setTimeout(() => {
            setError(false);
            setErrorMessage('');
          }, 2000);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setErrorMessage('Something went wrong!');
        setTimeout(() => {
          setError(false);
          setErrorMessage('');
        }, 2000);
        setLoading(false);
      }
    } else {
      setError(true);
      setErrorMessage('Monthly budget cannot be less than spendings');
      window.location.reload();
      setLoading(false);
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
          {error && (
            <Alert variant={'destructive'}>
              <AlertTitle>Error</AlertTitle>
              <X className="w-4 h-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="mt-4 flex flex-col gap-1">
            <div className="flex flex-row flex-wrap items-center justify-between gap-x-5 gap-y-3">
              <h2 className="font-semibold text-sm">
                Monthly Budget{' '}
                <span className="capitalize">({accountInfo?.accountType} account)</span>
              </h2>
              {showButton && (
                <div>
                  <Link href="/app/spendings">
                    <Button variant="outline" className="cursor-pointer" size={'sm'}>
                      Add Spendings
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-3">
              {!isEditing ? (
                <>
                  {loading ? (
                    <Skeleton className="w-[200px] h-[30px]" />
                  ) : (
                    <Label htmlFor="amount" className="text-gray-600">
                      ${spendings.toFixed(2) || 0} out of ${accountInfo?.monthlyBudget || 0} spent
                    </Label>
                  )}
                  {showButton && (
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      size={'sm'}
                      onClick={() => setIsEditing(true)}
                    >
                      <Pen fontSize={12} />
                    </Button>
                  )}
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
              value={percentage}
              className={`mt-2 ${
                percentage > 80 ? '[&>div]:bg-destructive' : '[&>div]:bg-primary'
              }`}
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-end justify-end">
          <div className="text-xs">
            {spendings > accountInfo?.monthlyBudget ? (
              <p className="text-red-500">
                {`You have exceeded your budget by $${(
                  spendings - accountInfo?.monthlyBudget
                ).toFixed(2)}`}
              </p>
            ) : (
              <p className="text-gray-500">You have spent {percentage || 0}% of your budget.</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Herosection;
