'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Header = () => {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push('/login');
      } else {
        setError(true);
        setErrorMessage(data.message || 'Something went wrong!');
      }
    } catch (err) {
      setError(true);
      setErrorMessage('Error occured while submitting form data');
    }
  };
  return (
    <header className="py-4">
      <div className="flex items-center justify-between">
        <div>
          <Link href={'/'}>
            <Image
              src={'/logo.png'}
              width={120}
              height={80}
              alt="site-logo"
              className="size-auto object-cover"
            />
          </Link>
        </div>
        <nav>
          <ul className="hidden md:flex items-center justify-between gap-x-14">
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/'}>Service</Link>
            </li>
            <li>
              <Link href={'/'}>Pages</Link>
            </li>
            <li>
              <Link href={'/'}>Blog</Link>
            </li>
            <li>
              <Link href={'/'}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full cursor-pointer" size={'xl'}>
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">Register your account</DialogTitle>
                <DialogDescription className="text-center">
                  Signup to start getting Ai powered Financial advise.
                </DialogDescription>
              </DialogHeader>
              <div>
                <form onSubmit={handleFormData}>
                  <div className="flex flex-col gap-3">
                    {error && (
                      <Alert variant={'destructive'}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="fname" className="mb-2">
                          First Name
                        </Label>
                        <Input
                          type="text"
                          id="fname"
                          name="fname"
                          autoComplete="on"
                          required
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lname" className="mb-2">
                          Last Name
                        </Label>
                        <Input
                          type="text"
                          id="lname"
                          name="lname"
                          autoComplete="on"
                          required
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="mb-2">
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="on"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="mb-2">
                        Password
                      </Label>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="on"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <DialogFooter className="mt-4">
                    <Button type="submit" className="w-full cursor-pointer mb-2" size={'lg'}>
                      {loading ? 'Loading...' : 'Register Now'}
                    </Button>
                  </DialogFooter>
                  <span className="text-sm">
                    Already have a account?{' '}
                    <Link className="text-green-600 font-semibold" href={'/login'}>
                      Login now
                    </Link>
                  </span>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
