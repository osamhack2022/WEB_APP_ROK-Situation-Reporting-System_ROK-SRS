import React, { useState, useEffect } from 'react'
// prettier-ignore
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { Colors, FAB } from 'react-native-paper'
import { ChatListItem } from '../../components/ChatListItem'
import { Searchbar } from '../../components/Searchbar'
import { collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db } from '../../config/firebase'

export function ChatListScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)

  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [searchQuery, setSearchQuery] = useState('')
  const [chats, setChats] = useState([])

  useEffect(() => {
    const collectionRef = collection(db, 'chats')
    const q = query(collectionRef, orderBy('rectime', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setChats(
        querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          recentmsg: doc.data().recentmsg,
          rectime: doc.data().rectime.toDate(),
          severity: doc.data().severity,
          userdata: doc.data().userdata,
          users: doc.data().users,
          chatid: doc.id,
        }))
      )
    })
    return () => unsubscribe()
  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <Searchbar
          placeholder="검색어를 입력하세요."
          value={searchQuery}
          setQuery={setSearchQuery}
        />
        {chats &&
          chats.map(
            (chat) =>
              chat.users.includes(userMe._id) && (
                <ChatListItem
                  name={chat.name}
                  recentmsg={chat.recentmsg}
                  rectime={chat.rectime}
                  userdata={chat.userdata}
                  users={chat.users}
                  chatid={chat.chatid}
                  key={chat.chatid}
                />
              )
          )}
      </ScrollView>
      <FAB
        icon="message-plus"
        onPress={() =>
          navigation.navigate('ChatNavigator', {
            screen: 'CreateChatScreen',
            params: { userMe },
          })
        }
        style={styles.fab}
        color="white"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, alignItems: 'center' },
  fab: {
    borderRadius: 60,
    height: 55,
    width: 55,
    position: 'absolute',
    bottom: 15,
    right: 20,
    backgroundColor: '#009572',
  },
})

const borderColor = (focus) =>
  StyleSheet.create({
    borderBottomColor: focus ? Colors.green500 : Colors.grey400,
  })
