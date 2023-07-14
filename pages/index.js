import { useEffect, useRef } from 'react';
import Image from 'next/image'
import { ChakraProvider } from '@chakra-ui/react'
import Home_onomation from '@/Components/home'
import bgp from '../assets/images/bgp.png'
import Onogen from '@/Components/Card/Onogen'
import Onologin from '@/Components/Card/Onologin'

export default function Home() {
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
    <ChakraProvider>
      <main className='flex flex-col items-center justify-center'>
        <div className="container">
          <div ref={containerRef} className='-z-50 background-container'>
            <Image
              src="/bgp2.png"
              alt="bgp"
              layout='fill'
              objectFit='cover'
            />
          </div>
          <section className="flex min-h-screen flex-col items-center justify-center">
            <Home_onomation/>
          </section>
          <section className="flex items-center justify-center mx-1">
            <Onogen />
            <Onologin />
          </section>
        </div>
      </main>
    </ChakraProvider>
  )
}
