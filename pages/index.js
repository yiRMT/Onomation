import Image from 'next/image'
import { Inter } from 'next/font/google'
import * as React from 'react'
import Home_onomation from '@/Components/home'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import Form from '@/Components/form'
import Cssoutput from '@/Components/cssoutput'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ChakraProvider>
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center p-24">
      <Cssoutput/>
      <Home_onomation/>



      </section>
      


      <section className="flex min-h-screen flex-col items-center justify-center p-24">
        <Form/>


      </section>

      <section className="flex min-h-screen flex-col items-center justify-center p-24">

        <Cssoutput/>
      </section>
      
      
    </main>
    </ChakraProvider>
  )
}
