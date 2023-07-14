import Image from 'next/image'
import { Inter } from 'next/font/google'
import * as React from 'react'
import Home_onomation from '@/Components/home'
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'
import Form from '@/Components/form'
import Cssoutput from '@/Components/cssoutput'
import bgp from '../assets/images/bgp.png'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ChakraProvider>
    <main className='bg-gray-100' >
      <section className="flex min-h-screen flex-col items-center justify-center p-24" style={{backgroundImage: `url(${bgp})`} }>
      
      <Home_onomation/>



      </section>
      


      <section className="flex flex-col items-center justify-center p-24">
        <Form/>


      </section>

    
      
      
    </main>
    </ChakraProvider>
  )
}
