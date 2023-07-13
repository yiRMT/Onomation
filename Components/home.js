import Image from 'next/image'
import { Inter } from 'next/font/google'


function Home_onomation() {
    return(
        <>
            
            <div>
            <Image
                className="relative"
                src="/image/Onomation.png"
                alt="Onomation Logo"
                width={700}
                height={700}
                priority
            />
            </div>

        
        
        
        </>
    );

}
export default Home_onomation;