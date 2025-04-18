'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/lib/features/user/UserSlice';

const Google = () => {
  const auth = getAuth(app);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleGoogleRequest = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: result?.user?.displayName?.split(' ')[0],
          lname: result?.user?.displayName?.split(' ').slice(1).join(' '),
          email: result.user.email,
          profileImg: result.user.photoURL,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        router.push('/app');
        dispatch(loginUser(data.user));
      } else {
        setError(true);
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMessage('An error occurred. Please try again.');
      setLoading(false);
    }
  };
  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Signup error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <button
        disabled={loading}
        onClick={handleGoogleRequest}
        className="w-full flex items-center justify-center cursor-pointer gap-2 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200"
      >
        <Image
          src={'/Google_icons.webp'}
          alt="Google-logo"
          width={20}
          height={20}
          className="w-6 h-6"
        />
        <span className="text-sm font-medium text-gray-700">
          {loading ? 'loading...' : 'Sign up with Google'}
        </span>
      </button>
    </>
  );
};

export default Google;
