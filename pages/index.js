import { useEffect, useRef } from 'react';
import Image from 'next/image'
import { ChakraProvider } from '@chakra-ui/react'
import Home_onomation from '@/Components/home'
import bgp from '../assets/images/bgp.png'
<<<<<<< Updated upstream

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ChakraProvider>
    <main className='bg-gray-100' >
      <section className="flex min-h-screen flex-col items-center justify-center p-24" style={{backgroundImage: `url(${bgp})`} }>
      
      <Home_onomation/>
=======
import Onogen from '@/Components/Card/Onogen'
import Onologin from '@/Components/Card/Onologin'

export default function Home() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let position = -300;
>>>>>>> Stashed changes

    const scrollBackground = () => {
      position += 1;
      container.style.top = `${position}px`;

<<<<<<< Updated upstream

      </section>
      
=======
      if (position >= 0) {
        position = -300;
        container.style.transition = '0.1s ease-out';
        container.style.top = `${position}px`;
      } else {
        container.style.transition = 'top 0.5s ease-out';
      }

      requestAnimationFrame(scrollBackground);
    };
>>>>>>> Stashed changes

    scrollBackground();

<<<<<<< Updated upstream
      <section className="flex flex-col items-center justify-center p-24">
        <Form/>


      </section>

    
      
      
    </main>
=======
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
>>>>>>> Stashed changes
    </ChakraProvider>
  )
}
