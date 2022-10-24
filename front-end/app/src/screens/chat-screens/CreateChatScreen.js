import React, { useState, useRef, useCallback } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Colors, TextInput, IconButton } from 'react-native-paper'
import { GuideText } from '../../components/GuideText'
import { MyButton } from '../../components/MyButton'
import { Profile } from '../../components/Profile'
import searchUserApi from '../../apis/user/searchUserApi'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export function CreateChatScreen() {
  const [name, setName] = useState('')
  const [query, setQuery] = useState('')
  const [Invited, setInvited] = useState([])
  const plusRef = useRef(null)

  const createChat = useCallback(() => {
    const users = []
    const userdata = []
    Invited.map((user) => {
      users.append(user._id)
      userdata.append({
        full: `${user.Rank} ${user.Name}`,
        name: user.Name,
        rank: user.Rank,
        color: '#aa2d06',
      })
    })
    addDoc(collection(db, 'chats'), {
      name,
      users,
      userdata,
      recentmsg: '...',
    })
  }, [])

  const getOneUserHandler = async () => {
    const res = await searchUserApi({ query })
    setInvited([...Invited, res[0]])
  }

  const onRemove = useCallback((_id) => {
    console.log(Invited)
    setInvited(Invited.filter((user) => user._id !== _id))
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
        <TextInput
          label="채팅방 이름"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(name) => setName(Name)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
        <TextInput
          label="추가 보고"
          dense={true}
          style={[styles.textInput, { marginBottom: 15 }]}
          onChangeText={(query) => setQuery(query)}
          ref={plusRef}
          right={
            <TextInput.Icon
              icon="plus"
              color={query ? '#009975' : Colors.grey500}
              size={25}
              style={{ marginTop: 15 }}
              onPress={() => {
                getOneUserHandler()
                plusRef.current.blur()
              }}
              forceTextInputFocus={false}
            />
          }
          onSubmitEditing={() => getOneUserHandler()}
          activeUnderlineColor="#008275"
        />
        <ScrollView
          horizontal={true}
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {Invited.map((user) => (
            <Profile
              Rank={user.Rank}
              name={user.Name}
              Position={user.Position}
              style={styles.profile}
              key={user._id}
              right={
                <IconButton
                  icon="window-close"
                  size={20}
                  style={styles.icon}
                  color={Colors.red700}
                  onPress={() => onRemove(user._id)}
                />
              }
            />
          ))}
        </ScrollView>
        {name && Invited && (
          <MyButton
            text="채팅방 생성"
            onPress={() => createChat()}
            style={{ marginBottom: 50 }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  guideTextView: {
    marginBottom: (15 / 812) * window.height,
    width: '100%',
    alignItems: 'flex-end',
  },
  view: {
    width: '85%',
  },
  scrollView: {
    width: '85%',
    marginBottom: (15 / 812) * window.height,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'white',
  },
  dropDown: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: Colors.grey400,
  },
  fab: {
    borderRadius: 60,
    height: 56,
    width: 56,
    position: 'absolute',
    bottom: 25,
    right: 20,
  },
  profile: {
    marginRight: 10,
    backgroundColor: Colors.grey200,
    paddingLeft: 5,
    paddingVertical: 5,
    borderRadius: 8,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    backgroundColor: Colors.grey200,
  },
})
