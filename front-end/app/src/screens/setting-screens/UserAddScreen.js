import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'
import { Colors, TextInput } from 'react-native-paper'
import RankItems from '../../data/ranks'
import { GuideText } from '../../components/GuideText'
import { window } from '../../constants/layout'
import DropDownPicker from 'react-native-dropdown-picker'
import { MyButton } from '../../components/MyButton'

const AccountTypeItems = [
  { label: '지휘관', value: 'Commander' },
  { label: '지휘자', value: 'Leader' },
  { label: '병사', value: 'Soldier' },
]

const addUserHandler = ({ rank, name, dodId, isAdmin }, cb) => {
  fetch(URL + '/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rank, name, dodId, isAdmin }),
  })
    .then((res) => res.json())
    .then((res) => console.log(res.invCode))
    .catch((error) => console.error(error))
}

export function UserAddScreen() {
  const [dodId, setDodId] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const [rankOpen, setRankOpen] = useState(false)
  const [rank, setRank] = useState(null)
  const [ranks, setRanks] = useState(RankItems)

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
          onChangeText={(dodId) => setDodId(dodId)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={`2x-xxxxxxxx`} />
        </View>
        <DropDownPicker
          placeholder="계급"
          open={rankOpen}
          value={rank}
          items={ranks}
          setOpen={setRankOpen}
          setValue={setRank}
          setItems={setRanks}
          style={styles.dropDown}
          textStyle={{
            fontSize: 16,
            color: rank ? Colors.black : Colors.grey600,
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
          onChangeText={(name) => setName(name)}
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
            color: rank ? Colors.black : Colors.grey600,
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
      {dodId && rank && name && accountType && role && (
        <MyButton
          text="사용자 추가"
          onPress={() =>
            addUserHandler({ rank, name, dodId, isAdmin: AccountType })
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
