import React, { useState } from 'react'
import { Colors, TextInput } from 'react-native-paper'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { GuideText } from '../../components/GuideText'
import { window } from '../../constants/layout'
import DropDownPicker from 'react-native-dropdown-picker'
import { MyButton } from '../../components/MyButton'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

const RankItems = [
  { label: '대장', value: 'GEN' },
  { label: '준장', value: 'LG' },
  { label: '소장', value: 'MG' },
  { label: '대령', value: 'BG' },
  { label: '중령', value: 'COL' },
  { label: '소령', value: 'LTC' },
  { label: '대위', value: 'MAJ' },
  { label: '중위', value: 'CPT' },
  { label: '소위', value: 'LIU' },
  { label: '준위', value: 'SECLIU' },
  { label: '원사', value: 'SGM' },
  { label: '상사', value: 'MST' },
  { label: '중사', value: 'SFC' },
  { label: '하사', value: 'SST' },
  { label: '병장', value: 'SGT' },
  { label: '상병', value: 'CPL' },
  { label: '일병', value: 'PFC' },
  { label: '이병', value: 'PVT' },
]

const AccountTypeItems = [
  { label: '지휘관', value: 'Commander' },
  { label: '지휘자', value: 'Leader' },
  { label: '병사', value: 'Soldier' },
]

export function UserMgtScreen() {
  const navigation = useNavigation()

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
        <MyButton text="사용자 추가" onPress={() => navigation.goBack()} />
      )}
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
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
})
