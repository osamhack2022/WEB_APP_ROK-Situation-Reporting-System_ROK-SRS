import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

function renderBubble(props) {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: 'white',
        },
      }}
      textStyle={{
        left: {
          color: 'black',
        },
      }}
    />
  )
}
export function ChatRoomScreen() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: '만나서 반갑습니다.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: '김형민',
          avatar:
            'https://d2v80xjmx68n4w.cloudfront.net/gigs/rate/ApRqY1571825139.PNG',
        },
      },
      {
        _id: 2,
        text: '안녕하세요.',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: '김형민',
          avatar:
            'https://d2v80xjmx68n4w.cloudfront.net/gigs/rate/ApRqY1571825139.PNG',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages))
  }, [])

  return (
    <GiftedChat
      renderBubble={renderBubble}
      showAvatarForEveryMessage={true}
      messages={messages}
      onSend={(messages) => onSend(messages)}
      placeholder="메시지를 입력하세요."
      user={{ _id: 2, name: '김형민' }}
    />
  )
}
