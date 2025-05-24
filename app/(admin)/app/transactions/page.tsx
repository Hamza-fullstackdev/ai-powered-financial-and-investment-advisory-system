'use client';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useEffect, useState } from 'react';

interface IDBTransaction {
  amount: number;
  merchantName: string;
  date: string;
  category: string;
  description: string;
}
export default function page() {
  const [transactions, setTransactions] = useState<IDBTransaction[]>([]);
  const [loading, setLoading] = useState(false);

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
      } else {
        setLoading(false);
      }
    };
    fetchUserSpendings();
  }, []);
  return (
    <section>
      <h1 className="text-center text-2xl font-semibold">
        All previous <span className="text-green-600">Transactions </span>records
      </h1>
      <div className="mt-5">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="text-black dark:text-gray-400 font-semibold">#</TableHead>
              <TableHead className="text-black dark:text-gray-400 font-semibold">Date</TableHead>
              <TableHead className="text-black dark:text-gray-400 font-semibold">Title</TableHead>
              <TableHead className="text-black dark:text-gray-400 font-semibold">Amount</TableHead>
              <TableHead className="text-black dark:text-gray-400 font-semibold">
                Category
              </TableHead>
              <TableHead className="text-black dark:text-gray-400 font-semibold">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <Skeleton className="w-full h-[400px]" />
                </TableCell>
              </TableRow>
            )}
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium">
                  {new Date(transaction?.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {transaction?.merchantName}
                </TableCell>
                <TableCell className="font-medium">${transaction?.amount}</TableCell>
                <TableCell className="capitalize">
                  <span className="bg-green-700 text-sm px-2 py-1 rounded text-white">
                    {transaction?.category}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {transaction?.description.slice(0, 20).concat('...')}
                </TableCell>
              </TableRow>
            )) || (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
