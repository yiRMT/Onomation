import { useContext,useEffect, useRef } from 'react';
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link';
import HomeLogo from '@/Components/HomeLogo'
import AuthContext from "../libs/context/AuthContext";
import { ArrowLeftIcon } from '@chakra-ui/icons';
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
    <>
      <Head>
        <title>プライバシーポリシー - オノメーション</title>
      </Head>
      <main className='flex flex-col items-center justify-center'>
        <div className="">
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
          <div className='absolute left-5 top-5'>
            <Link href="/">
              <ArrowLeftIcon w={8} h={8} color="Black" />
            </Link>
          </div>
          <div className='flex flex-col min-h-screen items-center'>
            <div className="flex flex-col items-center justify-center my-10">
              <HomeLogo/>
            </div>
            <h1 className='text-4xl font-bold text-center my-10'>
              プライバシーポリシー
            </h1>
            <p className='text-justify w-1/2 my-2'>
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
              このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
              この規約に関しての詳細はGoogleアナリティクスサービス利用規約のページやGoogleポリシーと規約ページをご覧ください。
            </p>
            <br/>
            <p className='text-justify w-1/2 my-2'>
              当サイトでは、アカウント認証にFirebase Authenticationを使用しています。
              認証時にはGoogleアカウントから情報を取得し、ユーザーの識別および投稿に使用しています。
              また、当サイトでは、生成したしたオノメーションの投稿にFirebase Cloud Firestoreを使用しています。
            </p>
            <br/>
            <p className='text-justify w-1/2 my-2'>
              当サイトでは、OpenAI API Keyを入力して頂きますが、これはローカルに保存され、サーバーに保存されません。
              ただし、オノメーション生成をリクエストした際にOpenAI API Keyを外部サーバーに送信致します。
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
