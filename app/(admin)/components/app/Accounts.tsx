'use client';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge, TrendingUpIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

type AccountDetails = {
  totalBalance: number;
  amountInvested: number;
  monthlyIncome: number;
  accountType: string;
  monthlyBudget: number;
  userId: string;
};
const Accounts = () => {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAccountDetails = async () => {
      setLoading(true);
      const res = await fetch('/api/user/get-account', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setAccountDetails(data.getAccountInfo);
        setLoading(false);
      }
    };
    getAccountDetails();
  }, []);
  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Net Worth</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {loading ? (
                <Skeleton className="w-full h-[50px]" />
              ) : (
                `$${accountDetails?.totalBalance || 0}.00`
              )}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">Total Assets</div>
            <div className="text-muted-foreground">Bank balance, cash etc</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Investments</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {loading ? (
                <Skeleton className="w-full h-[50px]" />
              ) : (
                `$${accountDetails?.amountInvested || 0}.00`
              )}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">Stocks, Bonds, Real Estate</div>
            <div className="text-muted-foreground">All investments of life</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Monthly Income</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {loading ? (
                <Skeleton className="w-full h-[50px]" />
              ) : (
                `$${accountDetails?.monthlyIncome || 0}.00`
              )}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge className="flex gap-1 rounded-lg text-xs">
                <TrendingUpIcon className="size-3" />
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">Regular Income</div>
            <div className="text-muted-foreground">Salary, Rents and Business</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Accounts;
