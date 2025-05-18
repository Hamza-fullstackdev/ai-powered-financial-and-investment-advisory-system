'use client';
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
const TransactionTable = () => {
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

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
        setTransactions(data.transactions);
        setLoading(false);
        setShowCard(true);
      } else {
        setShowCard(false);
        setLoading(false);
      }
    };
    fetchUserSpendings();
  }, []);
  return (
    <div className="my-5">
      {loading ||
        (showCard && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Transactions</CardTitle>
              <CardDescription>Based on the last transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>A list of your recent transactions or spendings.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black dark:text-gray-400 font-semibold">
                      Merchant
                    </TableHead>
                    <TableHead className="text-black dark:text-gray-400 font-semibold">
                      Category
                    </TableHead>
                    <TableHead className="text-black dark:text-gray-400 font-semibold">
                      Date
                    </TableHead>
                    <TableHead className="text-black dark:text-gray-400 font-semibold text-right">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction: any) => (
                    <TableRow key={transaction?._id}>
                      <TableCell className="capitalize">{transaction?.merchantName}</TableCell>
                      <TableCell className="capitalize">{transaction?.category}</TableCell>
                      <TableCell>
                        {new Date(transaction?.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-right">${transaction?.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default TransactionTable;
