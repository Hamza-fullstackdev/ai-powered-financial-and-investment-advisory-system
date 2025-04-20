'use client';
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/lib/features/user/UserSlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        dispatch(deleteUser());
        router.push('/');
      } else {
        setError(true);
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setErrorMessage('An error occurred while deleting the account.');
      setLoading(false);
    }
  };
  return (
    <>
      {error && (
        <div className="fixed top-5 right-8 bg-white p-3 rounded-md shadow-md">
          <p className="text-red-500 text-sm">Error: {errorMessage}</p>
        </div>
      )}
      <Button
        disabled={loading}
        onClick={handleDelete}
        variant={'destructive'}
        className="cursor-pointer"
        size={'lg'}
      >
        {loading ? 'Deleting...' : 'Delete Account'}
      </Button>
    </>
  );
};

export default DeleteAccount;
