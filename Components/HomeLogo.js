import Image from 'next/image'

function HomeLogo() {
  return(
    <>
      <Image
        className="relative"
        src="/image/Onomation.png"
        alt="Onomation Logo"
        width={700}
        height={700}
      />
    </>
  );
}

export default HomeLogo;