import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import * as React from 'react'
import { useEffect, useRef } from 'react';
import Post from '../Components/Post';
import Link from 'next/link';
import axios from 'axios';
import { ArrowLeftIcon } from '@chakra-ui/icons';

const inter = Inter({ subsets: ['latin'] })

export default function Posted() {
  const sample = {
    uid: "1102",
    displayName: "マサキング",
    postDate: "2023-7-15",
    original_text: "ザーザー",
    comment: "かわいい",
    animation: {
      html: '<!DOCTYPE html><html><head><title>ザーザー Animation</title></head><body><div id="container"><div id="circle"></div></div></body></html>',
      css: '#container { position: relative; width: 200px; height: 200px; overflow: hidden; } #circle { position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: blue; } ',
      javascript: 'var circle = document.getElementById("circle"); function animateCircle() { circle.style.transform = "scale(2)"; circle.style.transition = "transform 0.5s ease-in-out"; setTimeout(function() { circle.style.transform = "scale(1)"; circle.style.transition = "transform 0.5s ease-in-out"; }, 500); setTimeout(animateCircle, 1000); } animateCircle(); ',
    }
  }

  const postsSample = [ sample ]
  const [posts, setPosts] = React.useState([])

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

  useEffect(() => {
    get_posteddata()
  }, [])

  const sortedPosts = posts.sort((a, b) => {
    if (a.postDate < b.postDate) return 1
    if (a.postDate > b.postDate) return -1
    return 0
  })

  const get_posteddata = async () => {
    try {
      const url = 'http://127.0.0.1:8000/api/v1/posts'
      const res = await axios.get(url)
      setPosts(res.data)
      console.log(res.data)
    } catch (error) {
      alert('投稿データの取得に失敗しました')
      console.log(error);
    }
  }
  return (
    <>
      <Head>
        <title>投稿 - オノメーション</title>
      </Head>
      <main className='flex min-h-screen' >
        <div ref={containerRef} className='-z-50 background-container'>
          <Image
            src = "/bgp.png"
            alt = "bgp"
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
        <ul className='flex flex-col mx-10 md:mx-16 lg:mx-32 xl:mx-64 my-20 w-full gap-5'>
          {sortedPosts.map((post) => (
            <li key={post.postDate} >
              <Post post={ post } />
            </li>
          ))}
        </ul>
        
      </main>
    </>
  )
}
