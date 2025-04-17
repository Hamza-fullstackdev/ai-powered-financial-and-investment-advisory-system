import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className='py-4'>
      <div className='flex items-center justify-between'>
        <div>
          <Link href={"/"}>
            <Image
              src={"/logo.png"}
              width={120}
              height={80}
              alt='site-logo'
              className='size-auto object-cover'
            />
          </Link>
        </div>
        <nav>
          <ul className='hidden md:flex items-center justify-between gap-x-14'>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/"}>Service</Link>
            </li>
            <li>
              <Link href={"/"}>Pages</Link>
            </li>
            <li>
              <Link href={"/"}>Blog</Link>
            </li>
            <li>
              <Link href={"/"}>Contact</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className='rounded-full cursor-pointer' size={"xl"}>
                Get Started
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='text-center text-2xl'>
                  Register your account
                </DialogTitle>
                <DialogDescription className='text-center'>
                  Signup to start getting Ai powered Financial advise.
                </DialogDescription>
              </DialogHeader>
              <div>
                <form>
                  <div className='flex flex-col gap-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      <div>
                        <Label htmlFor='fname' className='mb-2'>
                          First Name
                        </Label>
                        <Input
                          type='text'
                          id='fname'
                          name='fname'
                          autoComplete='on'
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor='lname' className='mb-2'>
                          Last Name
                        </Label>
                        <Input
                          type='text'
                          id='lname'
                          name='lname'
                          autoComplete='on'
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor='email' className='mb-2'>
                        Email
                      </Label>
                      <Input
                        type='email'
                        id='email'
                        name='email'
                        autoComplete='on'
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor='password' className='mb-2'>
                        Password
                      </Label>
                      <Input
                        type='password'
                        id='password'
                        name='password'
                        autoComplete='on'
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter className='mt-4'>
                    <Button
                      type='submit'
                      className='w-full cursor-pointer mb-2'
                      size={"lg"}
                    >
                      Register
                    </Button>
                  </DialogFooter>
                  <span className='text-sm'>
                    Already have a account?{" "}
                    <Link
                      className='text-green-600 font-semibold'
                      href={"/login"}
                    >
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
