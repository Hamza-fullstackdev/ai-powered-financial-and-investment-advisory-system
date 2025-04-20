'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { BadgeHelp, Plus, Wallet } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const CardDetails = () => {
  return (
    <div className="my-10">
      <div>
        <h2 className="text-xl font-semibold">Financial details</h2>
        <p className="text-gray-500">Add your expenses details below to get started</p>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full h-full bg-gray-50 border border-gray-500 border-dotted rounded-lg cursor-pointer">
              <div className="flex items-center justify-center h-full py-16">
                <div className="text-center">
                  <Plus size={35} className="mx-auto text-gray-500" />
                  <p className="mt-2 text-sm text-gray-600">Add Details to get started</p>
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="h-[500px] md:h-[550px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Financial Details</DialogTitle>
              <DialogDescription>
                Your financial details help us enhance your experience through our AI finance system
                — securely and privately.
              </DialogDescription>
            </DialogHeader>
            <Separator />
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="totalBalance">Total Balance</Label>
                  <Input
                    id="totalBalance"
                    name="totalBalance"
                    type="number"
                    placeholder="In banks, cash, etc."
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="amountInvested">Amount Invested</Label>
                  <Input
                    id="amountInvested"
                    name="amountInvested"
                    type="number"
                    placeholder="Stocks, bonds, etc."
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="monthlyIncome">Monthly Income</Label>
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    placeholder="Stocks, bonds, etc."
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="accountType">Account Type</Label>
                  <Select name="accountType" required onValueChange={(value) => console.log(value)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator className="my-4" />
              <DialogHeader>
                <DialogTitle>Budget Details</DialogTitle>
                <DialogDescription>
                  Your budget details help us enhance your experience
                </DialogDescription>
              </DialogHeader>
              <Separator className="my-4" />
              <div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <Label htmlFor="budgetAmount">Monthly Budget</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeHelp size={15} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Entered amount will be the targeted amount you want to save from monthly
                          income
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="budgetAmount"
                    name="budgetAmount"
                    type="number"
                    placeholder="Target amount for the month"
                    required
                  />
                </div>
              </div>
              <Separator className="my-4" />
              <DialogHeader>
                <DialogTitle>Card Details</DialogTitle>
                <DialogDescription>
                  Your card details are used to make payments and purchases securely.
                </DialogDescription>
              </DialogHeader>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    type="number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="cardHolder">Card Holder Name</Label>
                  <Input
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" name="cvc" type="number" placeholder="XXX" required />
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full mt-4">
                  Save Details
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <div className="relative w-full h-full py-5 px-5 border border-gray-500 rounded-lg bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] text-white">
          <div className="flex items-center justify-between">
            <Wallet size={30} />
            <Image
              src={'/visa-logo-white.webp'}
              alt="visa"
              width={50}
              height={50}
              className="size-auto rounded-full"
            />
          </div>
          <div className="mt-10">
            <div>
              <h3 className="text-2xl flex gap-5 tracking-widest">
                <span>1111</span>
                <span>1111</span>
                <span>1111</span>
                <span>1111</span>
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Card Holder</p>
                  <h4 className="text-lg tracking-widest">HAMZA ILYAS</h4>
                </div>
                <div>
                  <p className="text-sm text-gray-100">Cvc</p>
                  <h4 className="text-lg tracking-widest">333</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
