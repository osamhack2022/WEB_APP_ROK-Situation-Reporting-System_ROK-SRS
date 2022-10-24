import React, { useState, useRef } from 'react'
// prettier-ignore
import { SafeAreaView, View, StyleSheet, ScrollView, Alert } from 'react-native'
import { Colors, TextInput, IconButton } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import DropDownPicker from 'react-native-dropdown-picker'
import { ReportGroup } from '../../components/ReportGroup'
import { MyButton } from '../../components/MyButton'
import { useNavigation } from '@react-navigation/native'
import { Profile } from '../../components/Profile'
import searchUserApi from '../../apis/user/searchUserApi'
import addReportApi from '../../apis/report/addReportApi'
import DATA from '../../data/procData'
import { window } from '../../constants/layout'

export function CreateReportScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const navigation = useNavigation()

  const [userMe, setUserMe] = useRecoilState(userState)

  const [query, setQuery] = useState('')
  const [Invited, setInvited] = useState([])

  const onRemove = (_id) => {
    console.log(Invited)
    setInvited(Invited.filter((user) => user._id !== _id))
  }

  const [TypeOpen, setTypeOpen] = useState(false)
  const [Type, setType] = useState('')
  const [TypeItem, setTypeItem] = useState([
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

  const [Title, setTitle] = useState('')
  const [text, setText] = useState('')

  const plusRef = useRef(null)

  const getOneUserHandler = async () => {
    const res = await searchUserApi({ query })
    setInvited([...Invited, res[0]])
  }

  const addReportHandler = async () => {
    const res = await addReportApi({
      Title,
      ReportingSystem: '당직',
      Invited,
      Content: text,
      Type,
      User: userMe,
    })
    if (res.Content) {
      Alert.alert('메모보고 등록에 성공하였습니다.')
      navigation.navigate('SentReportScreen')
    } else {
      Alert.alert(res.message)
    }
  }

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
          onChangeText={(Title) => setTitle(Title)}
          value={Title}
          activeUnderlineColor="#008275"
        ></TextInput>
        <View style={{ width: '88%', alignItems: 'center' }}>
          <DropDownPicker
            placeholder="보고종류"
            open={TypeOpen}
            value={Type}
            items={TypeItem}
            setOpen={setTypeOpen}
            setValue={setType}
            setItems={setTypeItem}
            style={styles.dropDown}
            zIndex={5001}
            textStyle={{
              fontSize: 16,
              color: Type ? Colors.black : Colors.grey600,
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
            <ReportGroup List={DATA.onDuty} Title="onDuty" />
          )}
          {groups.includes('headquarter') && (
            <ReportGroup List={DATA.headquarter} Title="headquarter" />
          )}
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
        <TextInput
          label="내용"
          dense={true}
          style={styles.textInput}
          multiline={true}
          onChangeText={(text) => setText(text)}
          value={text}
          activeUnderlineColor="#008275"
        ></TextInput>
        {Type && groups && text && (
          <MyButton
            text="보 고 하 기"
            onPress={() => {
              addReportHandler()
            }}
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
    paddingBottom: 20,
  },
  view: {
    width: '100%',
    alignItems: 'center',
  },
  scrollView: {
    width: '85%',
    marginBottom: (15 / 812) * window.height,
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
