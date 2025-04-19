'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { LogInIcon } from 'lucide-react';
import { format } from 'date-fns';

const page = () => {
  type Notification = {
    _id: string;
    title: string;
    message: string;
    createdAt: string;
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await fetch('/api/user/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (res.ok) {
          setNotifications(data.notifications);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, []);
  return (
    <section>
      <div>
        <Card className="w-full md:w-[700px] mx-auto my-10">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Your activity arround app will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Alert key={notification._id} className="w-full" variant="default">
                    <LogInIcon className="h-4 w-4" />
                    <AlertTitle>{notification.title}</AlertTitle>
                    <AlertDescription>
                      {notification.message} ({format(new Date(notification.createdAt), 'PPpp')})
                    </AlertDescription>
                  </Alert>
                ))
              ) : (
                <div className="text-center text-muted-foreground">No notifications yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default page;
