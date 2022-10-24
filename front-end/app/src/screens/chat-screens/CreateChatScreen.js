import React, { useState, useRef, useCallback } from 'react'
// prettier-ignore
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { Colors, TextInput, IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { window } from '../../constants/layout'
import { GuideText } from '../../components/GuideText'
import { MyButton } from '../../components/MyButton'
import { Profile } from '../../components/Profile'
import searchUserApi from '../../apis/user/searchUserApi'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'

export function CreateChatScreen({ route }) {
  const navigation = useNavigation()
  const { userMe } = route.params
  const [name, setName] = useState('')
  const [query, setQuery] = useState('')
  const [Invited, setInvited] = useState([])
  const plusRef = useRef(null)

  console.log(Invited)

  const createChat = async () => {
    let users = [userMe._id]
    console.log(users, name)

    let userdata = [
      {
        full: `${userMe.Rank} ${userMe.Name}`,
        name: userMe.Name,
        rank: userMe.Rank,
        color: '#aa2d06',
      },
    ]
    Invited.map((user) => {
      users.push(user._id)
      userdata.push({
        full: `${user.Rank} ${user.Name}`,
        name: user.Name,
        rank: user.Rank,
        color: '#aa2d06',
      })
    })
    const docRef = await addDoc(collection(db, 'chats'), {
      name,
      users,
      userdata,
      recentmsg: '...',
    })
    navigation.navigate('ChatNavigator', {
      screen: 'ChatRoomScreen',
      params: {
        users,
        userdata,
        chatid: docRef.id,
        name,
      },
    })
  }

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
          onChangeText={(name) => setName(name)}
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
            style={{ width: '80%' }}
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
    width: '100%',
    marginBottom: (45 / 812) * window.height,
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
