'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RootState } from '@/lib/store';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClient } from '@supabase/supabase-js';
import { updateUser } from '@/lib/features/user/UserSlice';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const page = () => {
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const [previewUrl, setPreviewUrl] = useState(currentUser?.profileImg || '/logo.png');
  const [progress, setProgress] = useState(13);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(60), 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const fileURL = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileURL);
    setUploading(true);
    const fileExt = selectedFile.name.split('.').pop();
    const filePath = `${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage.from('user').upload(filePath, selectedFile);

    setUploading(false);

    if (error) {
      setError(true);
      setErrorMessage('An error occurred while uploading the file.');
      return;
    }
    const { data: publicUrlData } = supabase.storage.from('user').getPublicUrl(filePath);

    if (publicUrlData?.publicUrl) {
      setPreviewUrl(publicUrlData.publicUrl);
      setError(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profileImg: previewUrl,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        dispatch(updateUser(data.user));
        router.push('/app/profile');
      } else {
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };
  return (
    <section className="w-full my-10">
      <Card className="mx-auto w-full md:w-[700px]">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            {currentUser?.fname} {currentUser?.lname} Profile
          </CardTitle>
          <CardDescription className="text-center">Update you profile</CardDescription>
          {uploading && <Progress value={progress} className={`w-[${progress}%]`} />}
          {error && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
              <div className="w-[120px] h-[120px] rounded-full overflow-hidden relative">
                <Image
                  src={`${previewUrl || currentUser.profileImg}`}
                  alt="Profile Image"
                  width={120}
                  height={120}
                  onClick={handleImageClick}
                  priority
                  className="object-cover cursor-pointer"
                />
              </div>
              <Input
                type="file"
                name="fileUpload"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="fname">First Name:</Label>
                <Input
                  type="text"
                  id="fname"
                  name="fname"
                  defaultValue={currentUser.fname || ''}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="lname">Last Name:</Label>
                <Input
                  type="text"
                  id="lname"
                  name="lname"
                  defaultValue={currentUser?.lname || ''}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email:</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={currentUser?.email || ''}
                  readOnly
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  onChange={handleChange}
                />
                {currentUser?.signupMethod === 'google' ? (
                  <span className="text-xs text-red-500">
                    Since you are signed using google, we recommend you to set password for the
                    future
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="mt-4">
              <Button
                disabled={uploading || loading}
                type="submit"
                className="w-full cursor-pointer"
                size={'lg'}
              >
                Update Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
