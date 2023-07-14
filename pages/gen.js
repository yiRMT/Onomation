import Image from 'next/image'
import { Inter } from 'next/font/google'
import * as React from 'react'
import Home_onomation from '@/Components/home'
import { ChakraProvider } from '@chakra-ui/react'
import Form from '@/Components/form'
import Cssoutput from '@/Components/cssoutput'
import bgp from '../assets/images/bgp.png'
import Onogen from '@/Components/Card/Onogen'

const inter = Inter({ subsets: ['latin'] })

export default function Gen() {
  return (
    <ChakraProvider>
    <main className='flex flex-col items-center justify-center' >
      
        <div className='-z-50'>
          <Image
            src = "/bgp1.png"
            alt = "bgp"
            layout='fill'
            objectFit='cover'
          />
        </div>



      

      <section className="flex min-h-screen flex-col items-center justify-center p-24" >
      <Form/>
      
      
      </section>
      




    
      
    </main>
    </ChakraProvider>
  )
}
