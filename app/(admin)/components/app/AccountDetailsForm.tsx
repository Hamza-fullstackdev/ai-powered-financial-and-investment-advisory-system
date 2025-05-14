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
import { BadgeHelp, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

const AccountDetailsForm = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/user/account-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        setSuccess(true);
        setSuccessMessage('Account has been created successfully');
        window.location.reload();
        setLoading(false);
        setFormData({});
      } else {
        setError(true);
        setErrorMessage(data.message || 'Unable to create account');
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMessage('Unable to create account, please try again later');
      setLoading(false);
    }
  };
  return (
    <>
      {error && (
        <div className="z-99 fixed top-5 right-8 bg-white p-3 rounded-md shadow-md">
          <p className="text-red-500 text-sm">Error: {errorMessage}</p>
        </div>
      )}
      {success && (
        <div className="z-99 fixed top-5 right-8 bg-white p-3 rounded-md shadow-md">
          <p className="text-green-500 text-sm">Success: {successMessage}</p>
        </div>
      )}
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
              Your financial details help us enhance your experience through our AI finance system —
              securely and privately.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <form onSubmit={handleFormData}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <Label htmlFor="totalBalance">Total Balance</Label>
                <Input
                  id="totalBalance"
                  name="totalBalance"
                  type="number"
                  placeholder="In banks, cash, etc."
                  required
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="accountType">Account Type</Label>
                <Select
                  name="accountType"
                  required
                  onValueChange={(value) => setFormData({ ...formData, accountType: value })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue id="accountType" placeholder="Select Account Type" />
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
                  <Label htmlFor="monthlyBudget">Monthly Budget</Label>
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
                  id="monthlyBudget"
                  name="monthlyBudget"
                  type="number"
                  placeholder="Target amount for the month"
                  required
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="cardCvc">CVC</Label>
                <Input
                  id="cardCvc"
                  name="cardCvc"
                  type="number"
                  placeholder="XXX"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Button disabled={loading} type="submit" className="w-full mt-4 cursor-pointer">
                Save Details
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountDetailsForm;
