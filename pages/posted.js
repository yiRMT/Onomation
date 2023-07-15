import Image from 'next/image'
import { Inter } from 'next/font/google'
import * as React from 'react'
import { useEffect, useRef } from 'react';
import HomeLogo from '@/Components/home_logo'
import Form from '@/Components/form'
import Cssoutput from '@/Components/cssoutput'
import Onogen from '@/Components/Card/Onogen'
import Posted_comp from '@/Components/Post/posted_component';
import Link from 'next/link';
import { Button ,ArrowLeftIcon } from '@chakra-ui/react';
const inter = Inter({ subsets: ['latin'] })

export default function Posted() {
  const sample = {
    uid:"1102",
    postDate:"2023-7-15",
    original_text:"ザーザー",
    comment:"かわいい",
    animation: {
      html:'<!DOCTYPE html><html><head><title>ザーザー Animation</title><link rel="stylesheet" type="text/css"></head><body><div id="container"><div id="circle"></div></div></body></html>',
      css:'#container { position: relative; width: 200px; height: 200px; overflow: hidden; } #circle { position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: blue; } ',
      javascript:'const circle = document.getElementById("circle"); function animateCircle() { circle.style.transform = "scale(2)"; circle.style.transition = "transform 0.5s ease-in-out"; setTimeout(function() { circle.style.transform = "scale(1)"; circle.style.transition = "transform 0.5s ease-in-out"; }, 500); setTimeout(animateCircle, 1000); } animateCircle(); ',


    }









  }
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
      <section className="flex min-h-screen flex-col items-center justify-center" >
        <Posted_comp posts={sample}/>
      </section>
    </main>
  )
}
