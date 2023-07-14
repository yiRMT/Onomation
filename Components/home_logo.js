import Image from 'next/image'

function HomeLogo() {
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

export default HomeLogo;