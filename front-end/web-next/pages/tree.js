import Head from 'next/head';
import dynamic from 'next/dynamic';

const Organogram = dynamic(() => import('../componenets/Organogram'), { ssr: false })

export default function Tree() {
  return (
    <>
      <Head>
        <title>조직도</title>
      </Head>
      <Organogram />
    </>
  )
}