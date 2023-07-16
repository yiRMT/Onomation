import { useContext,useEffect, useRef } from 'react';
import Image from 'next/image'
import Head from 'next/head'
import HomeLogo from '@/Components/HomeLogo'
import GenCard from '../Components/Card/GenCard'
import PostCard from '../Components/Card/PostCard'
import AuthCard from '../Components/Card/AuthCard';
import AuthContext from "../libs/context/AuthContext";
export default function Home() {
  const containerRef = useRef(null);
  const {authState, authDispatch} = useContext(AuthContext);

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
        <title>オノメーション</title>
      </Head>
      <main className='flex flex-col items-center justify-center'>
        <div className="container">
          <div ref={containerRef} className='-z-50 background-container'>
            <Image
              src="/bgp.svg"
              alt="bgp"
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
          <div className="flex min-h-screen flex-col items-center justify-center">
            <HomeLogo/>
          </div>
          <div className="flex gap-6 items-center justify-center my-20">
            <GenCard />
            <PostCard />
            <AuthCard />
          </div>
        </div>
      </main>
    </>
  )
}
