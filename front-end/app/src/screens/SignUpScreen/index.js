import React, { useState, useCallback } from 'react'
import { TextInput } from 'react-native-paper'
// prettier-ignore
import { View ,SafeAreaView, TouchableOpacity, ScrollView, Text, Alert } from 'react-native'
import { styles } from './style'
import { GuideText } from '../../components/GuideText'
import RankItems from '../../data/ranks'
import DropDownPicker from 'react-native-dropdown-picker'
import registerApi from '../../apis/registerApi'
import { Colors } from 'react-native-paper'

const checkPasswordMatch = (password, confirmPassword) => {
  return password.length == 0
    ? `비밀번호를 입력해주세요.`
    : password === confirmPassword
    ? `비밀번호가 일치합니다.`
    : `비밀번호가 일치하지 않습니다.`
}

export function SignUpScreen() {
  const registerHandler = useCallback(async (userData) => {
    const res = await registerApi(userData)
    if (res.token) Alert.alert('회원가입에 성공하였습니다.')
    else Alert.alert(res.message)
  })

  const [RankOpen, setRankOpen] = useState(false)
  const [Rank, setRank] = useState(null)
  const [Ranks, setRanks] = useState(RankItems)

  const [pic, setPic] = useState('')
  const [DoDID, setDoDID] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [Name, setName] = useState('')
  const [Invcode, setInvcode] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signUpView}>
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
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText guideText={``} />
          </View>
          <TextInput
            label="군 번"
            dense={true}
            activeUnderlineColor="#008275"
            onChangeText={(DoDID) => setDoDID(DoDID)}
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText guideText={`2x-xxxxxxxx`} />
          </View>
          <TextInput
            label="비밀번호"
            dense={true}
            activeUnderlineColor="#008275"
            onChangeText={(password) => setPassword(password)}
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText guideText={`${password.length}/15`} />
          </View>
          <TextInput
            label="비밀번호 확인"
            dense={true}
            activeUnderlineColor="#008275"
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText
              guideText={checkPasswordMatch(password, confirmPassword)}
            />
          </View>
          <TextInput
            label="이메일"
            dense={true}
            activeUnderlineColor="#008275"
            onChangeText={(email) => setEmail(email)}
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText guideText={``} />
          </View>
          <TextInput
            label="초대 코드"
            dense={true}
            activeUnderlineColor="#008275"
            onChangeText={(Invcode) => setInvcode(Invcode)}
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText guideText={`부대에서 받은 초대코드 입력`} />
          </View>
        </View>
        {Rank &&
          id &&
          password &&
          password === confirmPassword &&
          Name &&
          Invcode && (
            <TouchableOpacity
              onPress={() =>
                registerHandler({
                  Rank,
                  DoDID,
                  password,
                  Name,
                  email,
                  pic,
                  Invcode,
                })
              }
              style={styles.signUpButtonView}
            >
              <Text style={styles.signUpText}>사 용 신 청</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    </SafeAreaView>
  )
}
