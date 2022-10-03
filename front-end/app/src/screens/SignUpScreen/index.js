import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { View, SafeAreaView } from 'react-native'
import { styles } from './style'
import { GuideText } from '../../components/GuideText'

const checkPasswordMatch = (password, confirmPassword) => {
  return password.length == 0
    ? `비밀번호를 입력해주세요.`
    : password === confirmPassword
    ? `비밀번호가 일치합니다.`
    : `비밀번호가 일치하지 않습니다.`
}

export function SignUpScreen() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signUpView}>
        <TextInput
          label="이름"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(name) => setName(name)}
          style={styles.signUpTextInput}
        ></TextInput>
        <View style={styles.guideTextView}></View>
        <TextInput
          label="군 번"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(id) => setId(id)}
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
          label="초대 코드"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(inviteCode) => setInviteCode(inviteCode)}
          style={styles.signUpTextInput}
        ></TextInput>
        <View style={styles.guideTextView}>
          <GuideText guideText={`2x-xxxxxxxx`} />
        </View>
      </View>
    </SafeAreaView>
  )
}
