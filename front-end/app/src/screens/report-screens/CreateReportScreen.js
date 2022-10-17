import React, { useState } from 'react'
// prettier-ignore
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'
import { Colors, Searchbar, Text, Avatar, TextInput } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import DropDownPicker from 'react-native-dropdown-picker'
import { ReportGroup } from '../../components/ReportGroup'
import { MyButton } from '../../components/MyButton'
import { useNavigation } from '@react-navigation/native'
import { Profile } from '../../components/Profile'
import searchUserApi from '../../apis/searchUserApi'
import DATA from '../../data/procData'
import { window } from '../../constants/layout'

const rightIcon = ({ key, addedUser, setAddedUser }) => (
  <Avatar.Icon
    icon="alpha-x"
    style={{ backgroundColor: 'white' }}
    key={key}
    onPress={setAddedUser(
      addedUser.filter((user, idx) => idx.toString() !== key)
    )}
  />
)

export function CreateReportScreen() {
  const fetchUserHandler = async (query) => {
    const res = await searchUserApi(query)
    console.log(res)
    return res
  }

  let [fontsLoaded] = useNunitoFonts()

  const navigation = useNavigation()

  const [query, setQuery] = useState('')
  const [addedUser, setAddedUser] = useState([])

  console.log(addedUser)

  const [typeOpen, setTypeOpen] = useState(false)
  const [type, setType] = useState('')
  const [typeItem, setTypeItem] = useState([
    { label: '긴급사항', value: 'emergency' },
    { label: '보고사항', value: 'report' },
    { label: '지시사항', value: 'order' },
  ])

  const [groupOpen, setGroupOpen] = useState(false)
  const [groups, setGroups] = useState([])
  const [groupItem, setGroupItem] = useState([
    { label: '당직계통', value: 'onDuty' },
    { label: '본부중대', value: 'headquarter' },
  ])

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.view}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          label="제목"
          dense={true}
          style={styles.textInput}
          onChangeText={(title) => setTitle(title)}
          value={title}
          activeUnderlineColor="#008275"
        ></TextInput>
        <View style={{ width: '88%', alignItems: 'center' }}>
          <DropDownPicker
            placeholder="보고종류"
            open={typeOpen}
            value={type}
            items={typeItem}
            setOpen={setTypeOpen}
            setValue={setType}
            setItems={setTypeItem}
            style={styles.dropDown}
            zIndex={5001}
            textStyle={{
              fontSize: 16,
              color: type ? Colors.black : Colors.grey600,
              marginLeft: 7,
            }}
          />
          <DropDownPicker
            multiple={true}
            multipleText={`${groups.length}개 선택됨`}
            placeholder="보고체계"
            open={groupOpen}
            value={groups}
            items={groupItem}
            setOpen={setGroupOpen}
            setValue={setGroups}
            setItems={setGroupItem}
            style={[styles.dropDown, { marginBottom: 15 }]}
            textStyle={{
              fontSize: 16,
              color: groups.length ? Colors.black : Colors.grey600,
              marginLeft: 7,
            }}
          />
        </View>
        <View style={{ width: '85%' }}>
          {groups.includes('onDuty') && (
            <ReportGroup group={DATA.onDuty} name="onDuty" />
          )}
          {groups.includes('headquarter') && (
            <ReportGroup group={DATA.headquarter} name="headquarter" />
          )}
        </View>
        <TextInput
          label="추가 보고"
          dense={true}
          style={styles.textInput}
          onChangeText={(query) => setQuery(query)}
          onSubmitEditing={() =>
            setAddedUser([...addedUser, fetchUserHandler(query)])
          }
          onIconPress={() =>
            setAddedUser([...addedUser, fetchUserHandler(query)])
          }
          activeUnderlineColor="#008275"
        />
        <ScrollView horizontal={true}>
          {addedUser.map((user, idx) => (
            <Profile
              Rank={user.Rank}
              name={user.Name}
              Position={user.Position}
              key={idx.toString()}
              // right={rightIcon({
              //   key: idx.toString(),
              //   addedUser,
              //   setAddedUser,
              // })}
            />
          ))}
        </ScrollView>
        <TextInput
          label="내용"
          dense={true}
          style={styles.textInput}
          multiline={true}
          onChangeText={(text) => setText(text)}
          value={text}
          activeUnderlineColor="#008275"
        ></TextInput>
        {type && groups && text && (
          <MyButton
            text="보 고 하 기"
            onPress={() => navigation.navigate('RecdReportScreen')}
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
    paddingBottom: 50,
  },
  view: {
    width: '100%',
    alignItems: 'center',
  },
  dropDown: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: Colors.grey400,
    alignSelf: 'center',
    marginBottom: (30 / 812) * window.height,
  },
  textInput: {
    width: '85%',
    backgroundColor: 'white',
    marginBottom: (30 / 812) * window.height,
  },
})
