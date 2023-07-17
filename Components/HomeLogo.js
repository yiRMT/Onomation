import Image from 'next/image'

function HomeLogo() {
  return(
    <>
      <Image
        className="relative p-4"
        src="/onomation.svg"
        alt="Onomation Logo"
        width={700}
        height={700}
      />
    </>
  );
}

export default HomeLogo;