import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import * as React from 'react'
import Form from '../Components/GenForm'
import { useEffect, useRef } from 'react';
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
    <>
      <Head>
        <title>生成 - オノメーション</title>
      </Head>
      <main className='flex flex-col items-center justify-center' >
        <div className="container">
          <div ref={containerRef} className='-z-50 background-container'>
            <Image
              src="/bgp.svg"
              alt = "Background Image"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <div className='absolute left-5 top-5'>
            <Link href="/">
              <ArrowLeftIcon w={8} h={8} color="Black" />
            </Link>
          </div>
          <section className="flex min-h-screen flex-col items-center justify-center p-24" >
            <Form/>
          </section>
        </div>
      </main>
    </>
  )
}
