'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import React from 'react';
import { useSelector } from 'react-redux';
import Logout from '../../components/Logout';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const page = () => {
  const currentUser = useSelector((state: RootState) => state.user);
  return (
    <section>
      <div>
        <Card className="mx-auto w-full md:w-[700px] my-10">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="shadow p-4">
                <div className="flex flex-wrap md:flex-nowrap gap-y-3 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-[60px] h-[60px] overflow-hidden">
                      <Image
                        src={`${currentUser.profileImg}`}
                        alt={`${currentUser.fname}-img`}
                        width={60}
                        height={60}
                        priority
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">
                        {currentUser.fname} {currentUser.lname}
                      </h2>
                      <p className="text-sm text-muted-foreground">Email: {currentUser.email}</p>
                    </div>
                  </div>
                  <div>
                    <div className="border border-gray-300 cursor-pointer rounded-sm">
                      <Logout />
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">Current Session: </h3>
                  <p className="text-green-500 italic text-sm">{currentUser.userAgent}</p>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">Login Method: </h3>
                    <p className="text-green-500 italic text-sm capitalize">
                      Sign up using {currentUser.signupMethod}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">Last updated: </h3>
                    <p className="text-green-500 italic text-sm capitalize">
                      Last fetched data: {format(new Date(currentUser.updatedAt!), 'dd/MM/yyyy')} at{' '}
                      {format(new Date(currentUser.updatedAt!), 'hh:mm a')}
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="mt-4 flex items-end justify-end">
                  <Button variant={'destructive'} className="cursor-pointer" size={'lg'}>
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default page;
