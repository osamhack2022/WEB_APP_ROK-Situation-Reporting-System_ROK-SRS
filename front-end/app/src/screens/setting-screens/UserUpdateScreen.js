import React, { useCallback, useState } from 'react'
import { SafeAreaView, View, StyleSheet, Alert, ScrollView } from 'react-native'
import { Colors, TextInput } from 'react-native-paper'
import RankItems from '../../data/ranks'
import { GuideText } from '../../components/GuideText'
import { window } from '../../constants/layout'
import DropDownPicker from 'react-native-dropdown-picker'
import { MyButton } from '../../components/MyButton'
import { userState } from '../../states/userState'
import { useRecoilState } from 'recoil'

export function UserUpdateScreen() {
  const [userMe, setUserMe] = useRecoilState(userState)

  const updateUserHandler = useCallback(
    async ({ Rank, Name, email, milNumber, Number }) => {
      const res = await updateUserApi({
        Rank,
        Name,
        email,
        milNumber,
        Number,
      })
      if (res.message) Alert.alert(res.message)
      else {
        setUserMe({ ...userMe, Rank, Name, email, milNumber, Number })
        Alert.alert('사용자 정보가 변경되었습니다.')
      }
    }
  )

  const [Name, setName] = useState(userMe.Name)
  const [email, setEmail] = useState(userMe.email)
  const [Number, setNumber] = useState(userMe.Number)
  const [milNumber, setMilNumber] = useState(userMe.milNumber)

  const [RankOpen, setRankOpen] = useState(false)
  const [Rank, setRank] = useState(userMe.Rank)
  const [Ranks, setRanks] = useState(RankItems)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
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
        <TextInput
          label="이메일"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(email) => setEmail(email)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
        <TextInput
          label="전화번호"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(Number) => setNumber(Number)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={`010-xxxx-xxxx`} />
        </View>
        <TextInput
          label="군 전화번호 (보유시)"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(milNumber) => setMilNumber(milNumber)}
          style={styles.textInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={``} />
        </View>
      </ScrollView>
      {DoDID && Rank && Name && AccountType && Position && (
        <MyButton
          text="내 정보 수정"
          onPress={() =>
            updateUserHandler({
              Rank,
              Name,
              email,
              Number,
              milNumber,
            })
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
