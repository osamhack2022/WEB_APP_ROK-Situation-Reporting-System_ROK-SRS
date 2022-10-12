import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Draggable from 'react-draggable';

const Organogram = dynamic(async() => await   import('../componenets/Organogram.js'), { ssr: false })

export default function Tree() {
  const [draggableDisabled, setDraggableDisabled] = useState(false);
  
  return (
    <>
      <Head>
        <title>조직도</title>
      </Head>
      <Draggable disabled={draggableDisabled}>
        <div>
          <Organogram onPreventDraggable={setDraggableDisabled} />
        </div>
      </Draggable>
    </>
  )
}