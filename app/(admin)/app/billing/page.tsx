'use client';
import { Button } from '@/components/ui/button';
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
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [formData, setFormData] = useState({
    totalBalance: 0,
    amountInvested: 0,
    monthlyIncome: 0,
    accountType: '',
    monthlyBudget: 0,
  });
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    cardCvc: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const getUserDetails = async () => {
      const apis = ['/api/user/get-account', '/api/user/card-details'];
      const data = await Promise.all(
        apis.map((api) =>
          fetch(api)
            .then((res) => res.json())
            .catch((error) => console.log(error))
        )
      );
      setFormData(data[0].getAccountInfo);
      setCardDetails(data[1].getCardInfo[0]);
    };
    getUserDetails();
  }, []);
  const handleInputChangeForAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeForCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/account-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, ...cardDetails }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/app');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Something went wrong, please try again later');
    }
  };
  return (
    <section>
      <h1 className="text-center text-2xl font-semibold">
        Update your <span className="text-green-600">Billing </span>details
      </h1>
      <form className="my-5" onSubmit={handleFormData}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <Label htmlFor="totalBalance">Total Balance</Label>
            <Input
              type="number"
              id="totalBalance"
              name="totalBalance"
              value={formData.totalBalance}
              onChange={handleInputChangeForAccount}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="amountInvested">Amount Invested</Label>
            <Input
              type="number"
              id="amountInvested"
              name="amountInvested"
              value={formData.amountInvested}
              onChange={handleInputChangeForAccount}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="monthlyIncome">Monthly Income</Label>
            <Input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleInputChangeForAccount}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="monthlyBudget">Monthly Budget</Label>
            <Input
              type="number"
              id="monthlyBudget"
              name="monthlyBudget"
              value={formData.monthlyBudget}
              onChange={handleInputChangeForAccount}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="accountType">Account Type</Label>
            <Select
              name="accountType"
              required
              value={formData.accountType}
              onValueChange={(value) => setFormData({ ...formData, accountType: value })}
            >
              <SelectTrigger className="w-full">
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
        <div className="my-5">
          <h2 className="text-xl font-semibold">Card details</h2>
          <Separator className="my-3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                type="number"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails?.cardNumber}
                onChange={handleInputChangeForCard}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="cardHolder">Card Holder Name</Label>
              <Input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={cardDetails?.cardHolder}
                onChange={handleInputChangeForCard}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="cardCvc">CVC</Label>
              <Input
                type="number"
                id="cardCvc"
                name="cardCvc"
                value={cardDetails?.cardCvc}
                onChange={handleInputChangeForCard}
              />
            </div>
          </div>
        </div>
        <div>
          <Button type="submit" className="w-full cursor-pointer" size={'lg'}>
            Update
          </Button>
        </div>
      </form>
    </section>
  );
}
