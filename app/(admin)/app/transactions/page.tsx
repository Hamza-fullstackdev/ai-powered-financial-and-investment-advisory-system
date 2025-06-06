'use client';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface IDBTransaction {
  amount: number;
  merchantName: string;
  date: string;
  category: string;
  description: string;
  createdAt: string;
}

export default function Page() {
  const [transactions, setTransactions] = useState<IDBTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / recordsPerPage);

  useEffect(() => {
    const fetchUserSpendings = async () => {
      setLoading(true);
      const res = await fetch('/api/user/transaction/get-spendings');
      const data = await res.json();
      if (res.ok) {
        setTransactions(data.transactions || []);
      }
      setLoading(false);
    };
    fetchUserSpendings();
  }, []);

  const paginatedData = transactions.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section>
      <h1 className="text-center text-2xl font-semibold">
        All previous <span className="text-green-600">Transactions </span>records
      </h1>
      <div className="mt-5">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Skeleton className="w-full h-[400px]" />
                </TableCell>
              </TableRow>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((transaction, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <TableRow>
                      <TableCell>{(currentPage - 1) * recordsPerPage + index + 1}</TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="capitalize">{transaction.merchantName}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>
                        <span className="bg-green-700 text-sm px-2 py-1 rounded text-white capitalize">
                          {transaction.category}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.description.slice(0, 20)}...</TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{transaction.merchantName}</DialogTitle>
                      <DialogDescription>{transaction.description}</DialogDescription>
                    </DialogHeader>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <p>
                        <span className="font-semibold">Amount:</span> ${transaction.amount}
                      </p>
                      <p className="capitalize">
                        <span className="font-semibold">Category:</span> {transaction.category}
                      </p>
                      <p>
                        <span className="font-semibold">Date:</span>{' '}
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p>
                        <span className="font-semibold">Transaction Added:</span>{' '}
                        {new Date(transaction?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <DialogFooter>
                      <DialogTrigger>
                        <Button className="cursor-pointer">Close</Button>
                      </DialogTrigger>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, idx) => (
                      <PaginationItem key={idx}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === idx + 1}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(idx + 1);
                          }}
                        >
                          {idx + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
