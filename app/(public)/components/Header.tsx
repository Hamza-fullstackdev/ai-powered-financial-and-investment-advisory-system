import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className='py-4'>
      <div className='flex items-center justify-between'>
        <div>
          <Image
            src={"/logo.png"}
            width={120}
            height={80}
            alt='site-logo'
            className='size-auto'
          />
        </div>
        <nav>
          <ul className='flex items-center justify-between gap-x-14'>
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
          <Link href={"/"}>
            <Button className='rounded-full cursor-pointer' size={"xl"}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
