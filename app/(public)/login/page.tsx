'use client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginUser } from '@/lib/features/user/UserSlice';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const page = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate.push('/app');
        dispatch(loginUser(data.user));
      } else {
        setError(true);
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMessage('Invalid email or password');
      setLoading(false);
    }
  };
  return (
    <Card className="w-full md:w-[500px] mx-auto my-10">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login Form</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials below to start using your Ai Assistant
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleFormData}>
        <CardContent>
          {error && (
            <Alert variant={'destructive'} className="mb-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="on"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="passwrod">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="on"
                onChange={handleChange}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-5">
          <Button type="submit" className="w-full cursor-pointer" size={'lg'}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </CardFooter>
      </form>
      <div className="mx-6">
        <span className="text-sm">
          Don't have a account?{' '}
          <Link href={'/'} className="text-green-500 font-semibold">
            Register Now!
          </Link>
        </span>
      </div>
    </Card>
  );
};

export default page;
