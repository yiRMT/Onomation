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

  const dateStr = new Date(post.postDate).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })

  return (
    <>
      <div className='flex flex-col gap-4 p-4 bg-gray-100 rounded-xl shadow-md'>
        <div className='flex justify-center p-10 rounded-xl w-full bg-white'>
          <Animation {...post.animation} />
        </div>
        <div className='p-2'>
          <h1 className='font-bold text-xl'>{post.originalText}</h1>
          <p>投稿者: {post.displayName}</p>
          <p>投稿日時: {dateStr}</p>
          <p>コメント: {post.comment}</p>
        </div>
      </div>
    </>
  )
}