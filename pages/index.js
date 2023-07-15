import { useContext,useEffect, useRef } from 'react';
import Image from 'next/image'
import HomeLogo from '@/Components/home_logo'
import Onogen from '@/Components/Card/Onogen'
import Onopost from '@/Components/Card/Onopost'
import OnoSignIn from '@/Components/Card/OnoSignIn';
import AuthContext from "@/libs/context/AuthContext";
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
        <div className="flex min-h-screen flex-col items-center justify-center">
          <HomeLogo/>
        </div>
        {authState.user ? ( <p className='flex items-center justify-center'>{authState.user.displayName}</p>) :null}
        <div className="flex gap-6 items-center justify-center my-20">
          <Onogen />
          <Onopost />
          <OnoSignIn />
        </div>
      </div>
    </main>
  )
}
