import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { Helmet } from 'react-helmet';

export default function Post ({ post }) {
  const Animation = (animation) => {
    return (
      <>
        <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: animation.html }} />
        <style suppressHydrationWarning >{ animation.css }</style>
        <Helmet>
          <script suppressHydrationWarning type='text/javascript' >{ animation.javascript }</script>
        </Helmet>
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col gap-4 p-4 bg-gray-100 hover:bg-gray-300 rounded-xl'>
        <div className='flex justify-center p-10 rounded-xl w-full drop-shadow bg-white'>
          <Animation {...post.animation} />
        </div>
        <div className='p-2'>
          <h1 className='font-bold sm:text-lg text-base'>{post.original_text}</h1>
          <p>日付: {post.postDate}</p>
          <p>コメント: {post.comment}</p>
          <p>投稿者: {post.displayName}</p>
        </div>
      </div>
    </>
  )
}