import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Draggable from 'react-draggable';

const Organogram = dynamic(async () => await import('../componenets/Organogram.js'), { ssr: false })

const myData = {
  1: {
    'key': 1,
    'username': 'Kim',
    'department': 'rok_srs',
    'position': '보안팀장',
    'roles': 'editable',
    'rank': '대위',
    'DoDID': '00-12345678',
    'phoneNumber': '010-0000-1111',
    'voipNumber': 'voip',
    'email': '@@@',
    'parent': null,
  },
  2: {
    'key': 2,
    'username': 'Jo',
    'department': 'rok_srs',
    'position': '백엔드',
    'roles': 'viewable',
    'rank': '상병',
    'DoDID': '99-00112233',
    'phoneNumber': '010-2222-3333',
    'voipNumber': 'voip',
    'email': '@@@',
    'parent': 1
  },
  3: {
    'key': 3,
    'username': 'Kim',
    'department': 'rok_srs',
    'position': '프론트엔드(APP)',
    'roles': 'viewable',
    'rank': '병장',
    'DoDID': '98-76543210',
    'phoneNumber': '010-6666-7777',
    'voipNumber': 'voip',
    'email': '@@@',
    'parent': 1
  },
  4: {
    'key': 4,
    'username': 'Choe',
    'department': 'rok_srs',
    'position': '프론트엔드(WEB)',
    'roles': 'none',
    'rank': '일병',
    'DoDID': '88-44556677',
    'phoneNumber': '010-4444-5555',
    'voipNumber': 'voip',
    'email': '@@@',
    'parent': 2
  },
  5: {
    'key': 5,
    'username': 'Annoymous',
    'department': 'rok_srs',
    'position': 'TEST',
    'roles': 'none',
    'rank': '이병',
    'DoDID': '-',
    'phoneNumber': '-',
    'voipNumber': '-',
    'email': '@@@',
    'parent': null
  }
};

export default function Tree() {
  const [draggableDisabled, setDraggableDisabled] = useState(false);

  return (
    <>
      <Head>
        <title>조직도</title>
      </Head>
      <Draggable disabled={draggableDisabled}>
        <div style={{ width: '200vw', height: '200vh' }}>
          <Organogram
            renderData={myData}
            onPreventDraggable={setDraggableDisabled}
          />
        </div>
      </Draggable>
    </>
  )
}