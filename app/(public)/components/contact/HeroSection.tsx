'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        alert(data.message);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      setLoading(false);
      alert('Something went wrong, please try again later');
    }
  };
  return (
    <section id="contact" className="mx-4 sm:mx-16 my-20 relative">
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
        <Image src="/arrow-2.png" alt="Arrow" width={100} height={100} className="object-cover" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="font-bold text-4xl leading-tight">Connect with us for expert advice</h1>
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    <Phone size={16} className="text-white" />
                  </div>
                  <h3 className="text-gray-500">Phone Number</h3>
                </div>
                <p className="mt-2 font-semibold">(+92) 348 4088841</p>
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-md p-4">
                <div className="flex items-center gap-2">
                  <div className="bg-green-500 rounded-full w-[30px] h-[30px] flex items-center justify-center">
                    <Mail size={16} className="text-white" />
                  </div>
                  <h3 className="text-gray-500">Email Us</h3>
                </div>
                <p className="mt-2 font-semibold">hamzafullstackdev1gmail.com</p>
              </div>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.3123217832426!2d73.08693937438565!3d30.68148748810968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922b7fc5f65c751%3A0xb5f17e730625a55!2zVW5pdmVyc2l0eSBvZiBTYWhpd2FsINis2KfZhdi524Eg2LPYp9uB24zZiNin2YQ!5e0!3m2!1sen!2s!4v1754758467340!5m2!1sen!2s"
              width="100%"
              height="250"
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 md:p-8">
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <Label className="text-lg" htmlFor="name">
                Your Name
              </Label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="on"
                className="py-4 border-b border-gray-300 outline-none focus:border-green-500 placeholder:text-sm"
                placeholder="Input your name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-4">
                <Label className="text-lg" htmlFor="email">
                  Your Email
                </Label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="on"
                  className="py-4 border-b border-gray-300 outline-none focus:border-green-500 placeholder:text-sm"
                  placeholder="Input your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-4">
                <Label className="text-lg" htmlFor="subject">
                  Your Subject
                </Label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="py-4 border-b border-gray-300 outline-none focus:border-green-500 placeholder:text-sm"
                  placeholder="Input your subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label className="text-lg" htmlFor="message">
                Your Message
              </Label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full py-4 border-b border-gray-300 outline-none focus:border-green-500 placeholder:text-sm"
                placeholder="Input your message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <div>
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:!bg-green-500/90 text-white p-6 rounded-full cursor-pointer"
              >
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
