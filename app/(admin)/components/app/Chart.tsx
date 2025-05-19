'use client';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  amount: {
    label: 'Amount',
    color: '#000000',
  },
  label: {
    color: '#000000',
  },
} satisfies ChartConfig;

const Chart = () => {
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([
    {
      category: '',
      amount: 0,
    },
  ]);

  useEffect(() => {
    const fetchUserSpendings = async () => {
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
        setChartData(
          (data.transactions as { amount: number; category: string }[]).map(
            ({ amount, category }) => ({
              amount,
              category,
            })
          )
        );
        setLoading(false);
        setShowCard(true);
      } else {
        setShowCard(false);
        setLoading(false);
      }
    };
    fetchUserSpendings();
  }, []);

  const barHeight = 32;
  const chartPadding = 48;
  const minHeight = 120;
  const maxHeight = 400;

  const calculatedHeight = Math.min(
    Math.max(chartData.length * barHeight + chartPadding, minHeight),
    maxHeight
  );
  return (
    <div className={`my-5 hidden:${chartData.length === 0}`}>
      {loading ||
        (chartData.length > 0 && showCard && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Most Recent Spendings</CardTitle>
              <CardDescription>
                <div className="leading-none text-muted-foreground">
                  Showing last 5 transactions in which you spend
                  <strong className="text-black dark:text-red-600">
                    {' '}
                    ${chartData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                  </strong>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chartConfig}
                style={{ width: '100%', height: calculatedHeight }}
              >
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                    right: 16,
                  }}
                >
                  <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="category"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <XAxis dataKey="amount" type="number" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Bar dataKey="amount" layout="vertical" fill="var(--color-desktop)" radius={4}>
                    <LabelList
                      dataKey="category"
                      position="insideLeft"
                      offset={8}
                      fill="#FFFFFF"
                      fontSize={12}
                    />
                    <LabelList
                      dataKey="amount"
                      position="right"
                      offset={8}
                      className="#000000"
                      fontSize={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default Chart;
