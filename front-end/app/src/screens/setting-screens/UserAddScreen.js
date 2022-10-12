import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, Alert } from 'react-native'
import { Colors, TextInput } from 'react-native-paper'
import RankItems from '../../data/ranks'
import { GuideText } from '../../components/GuideText'
import { window } from '../../constants/layout'
import DropDownPicker from 'react-native-dropdown-picker'
import { MyButton } from '../../components/MyButton'
import addUserApi from '../../apis/addUserApi'

const AccountTypeItems = [
  { label: '지휘관', value: 'Commander' },
  { label: '지휘자', value: 'Leader' },
  { label: '병사', value: 'Soldier' },
]

const addUserHandler = async ({ Rank, Name, DoDID, Type }, cb) => {
  const res = await addUserApi({ Rank, Name, DoDID, Type })
  if (res.Invcode)
    Alert.alert(`사용자 등록에 성공했습니다, 초대 코드는 ${res.Invcode}입니다.`)
  else Alert.alert(res.message)
  cb()
}

export function UserAddScreen() {
  const [DoDID, setDoDID] = useState('')
  const [Name, setName] = useState('')
  const [role, setRole] = useState('')

  const [rankOpen, setRankOpen] = useState(false)
  const [Rank, setRank] = useState(null)
  const [Ranks, setRanks] = useState(RankItems)

  const [typeOpen, setTypeOpen] = useState(false)
  const [accountType, setAccountType] = useState(null)
  const [accountTypes, setAccountTypes] = useState(AccountTypeItems)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <TextInput
          label="군 번"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(DoDID) => setDoDID(DoDID)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={`2x-xxxxxxxx`} />
        </View>
        <DropDownPicker
          placeholder="계급"
          open={RankOpen}
          value={Rank}
          items={Ranks}
          setOpen={setRankOpen}
          setValue={setRank}
          setItems={setRanks}
          style={styles.dropDown}
          textStyle={{
            fontSize: 16,
            color: Rank ? Colors.black : Colors.grey600,
            marginLeft: 2,
          }}
          zIndex={5001}
        />
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
        <TextInput
          label="이름"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(Name) => setName(Name)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
        <DropDownPicker
          placeholder="계정 유형"
          open={typeOpen}
          value={accountType}
          items={accountTypes}
          setOpen={setTypeOpen}
          setValue={setAccountType}
          setItems={setAccountTypes}
          style={styles.dropDown}
          textStyle={{
            fontSize: 16,
            color: Rank ? Colors.black : Colors.grey600,
            marginLeft: 2,
          }}
        />
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
        <TextInput
          label="직책"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(role) => setRole(role)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
      </View>
      {DoDID && Rank && Name && accountType && role && (
        <MyButton
          text="사용자 추가"
          onPress={() =>
            addUserHandler({ Rank, Name, DoDID, Type: AccountType })
          }
        />
      )}
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
})
