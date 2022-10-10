import Head from 'next/head';
import dynamic from 'next/dynamic';
import Draggable from 'react-draggable';

const Organogram = dynamic(async() => await   import('../componenets/Organogram.js'), { ssr: false })

export default function Tree() {
  return (
    <>
      <Head>
        <title>조직도</title>
      </Head>
      <Draggable>
        <div>
          <Organogram />
        </div>
      </Draggable>
    </>
  )
}