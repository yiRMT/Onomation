import Image from 'next/image'
import { Inter } from 'next/font/google'
import * as React from 'react'
import HomeLogo from '@/Components/home_logo'
import { ChakraProvider } from '@chakra-ui/react'
import Form from '@/Components/form'
import Cssoutput from '@/Components/cssoutput'
import Onogen from '@/Components/Card/Onogen'
import { useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Gen() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let position = -300;

    const scrollBackground = () => {
      position += 1;
      container.style.top = `${position}px`;

      if (position >= 0) {
        position = -300;
        container.style.transition = '0.1s ease-out';
        container.style.top = `${position}px`;
      } else {
        container.style.transition = 'top 0.5s ease-out';
      }

      requestAnimationFrame(scrollBackground);
    };

    scrollBackground();

    return () => cancelAnimationFrame(scrollBackground);
  }, []);

  return (
    <main className='flex flex-col items-center justify-center' >
      
      <div className="container">
        <div ref={containerRef} className='-z-50 background-container'>
          <Image
            src = "/bgp2.png"
            alt = "bgp"
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='absolute left-5 top-5'>
          <Link href="/">
            <button>
              <ArrowLeftIcon w={8} h={8} color="Black" />
            </button>


            
          </Link>


        </div>
        <section className="flex min-h-screen flex-col items-center justify-center p-24" >
          <Form/>



        </section>
      </div>
    </main>
  )
}
