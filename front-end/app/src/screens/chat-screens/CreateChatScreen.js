import React, { useState } from 'react'
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
import DropDownPicker from 'react-native-dropdown-picker'
import { convertRank } from '../../helperfunctions/convertRank'

export function CreateChatScreen({ route }) {
  const navigation = useNavigation()
  const { userMe } = route.params
  const [name, setName] = useState('')

  const [loading, setLoading] = useState(false)

  const [Invited, setInvited] = useState([])
  const [userOpen, setUserOpen] = useState(false)
  const [userItem, setUserItem] = useState([])

  const createChat = async () => {
    let users = [userMe._id]

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
      severity: 1,
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

  const searchUserHandler = async (query) => {
    const res = await searchUserApi({ query })
    setUserItem(
      res.map((user) => ({
        label: `${convertRank(user.Rank)} ${user.Name}`,
        value: user,
      }))
    )
  }

  const onRemove = (_id) => {
    setInvited(Invited.filter((user) => user._id !== _id))
  }

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
        <View style={{ width: '88%', alignSelf: 'center' }}>
          <DropDownPicker
            loading={loading}
            searchable={true}
            placeholder="추가 보고"
            multiple={true}
            multipleText={`${Invited.length}명 선택됨`}
            open={userOpen}
            value={Invited}
            setValue={setInvited}
            items={userItem}
            setOpen={setUserOpen}
            style={[styles.dropDown, { paddingBottom: 15 }]}
            textStyle={{
              fontSize: 16,
              color: Colors.grey600,
              marginLeft: 7,
            }}
            disableLocalSearch={true}
            onChangeSearchText={(query) => {
              searchUserHandler(query)
              setLoading(true)
            }}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
        </View>
        <ScrollView
          horizontal={true}
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {Invited.map((user) => (
            <Profile
              Rank={convertRank(user.Rank)}
              name={user.Name}
              Position={user.Role}
              source={{ uri: user.pic }}
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
        <MyButton text="채 팅 방   생 성" onPress={() => createChat()} />
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
    width: '100%',
    paddingBottom: 100,
  },
  scrollView: {
    width: '85%',
    paddingBottom: 120,
    alignSelf: 'center',
  },
  textInput: {
    width: '85%',
    backgroundColor: 'white',
    alignSelf: 'center',
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
  dropDown: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: Colors.grey400,
    alignSelf: 'center',
    marginBottom: 15,
  },
})
