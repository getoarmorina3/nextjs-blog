import Image from 'next/image'

export default async function Home() {
  return (
    <main className='h-screen flex justify-center items-center'>
      <p>
        <Image src="/vercel.svg" alt="Vercel Logo" width={250} height={250} />
      </p>
    </main>
  )
}
