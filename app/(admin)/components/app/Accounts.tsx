import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, TrendingUpIcon } from 'lucide-react';
import React from 'react';

const Accounts = () => {
  return (
    <div className="my-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Net Worth</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              $1,250
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
              $1,000
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
              $30,000
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
