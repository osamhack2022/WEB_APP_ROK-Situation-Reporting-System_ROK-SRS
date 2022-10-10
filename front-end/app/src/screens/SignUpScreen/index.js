import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native'
import { styles } from './style'
import { GuideText } from '../../components/GuideText'
import RankItems from '../../data/ranks'
import DropDownPicker from 'react-native-dropdown-picker'
import URL from '../../../url'

const checkPasswordMatch = (password, confirmPassword) => {
  return password.length == 0
    ? `비밀번호를 입력해주세요.`
    : password === confirmPassword
    ? `비밀번호가 일치합니다.`
    : `비밀번호가 일치하지 않습니다.`
}

const registerHandler = (data) => {
  fetch(URL + '/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => console.log(res.message))
    .catch((error) => console.error(error))
}

export function SignUpScreen() {
  const [rankOpen, setRankOpen] = useState(false)
  const [rank, setRank] = useState(null)
  const [ranks, setRanks] = useState(RankItems)

  const [dodId, setDodId] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const userData = {
    rank,
    dodId,
    password,
    name,
    email,
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.signUpView}>
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
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText guideText={``} />
          </View>
          <TextInput
            label="군 번"
            dense={true}
            activeUnderlineColor="#008275"
            onChangeText={(dodId) => setDodId(dodId)}
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
            onChangeText={(inviteCode) => setInviteCode(inviteCode)}
            style={styles.signUpTextInput}
          ></TextInput>
          <View style={styles.guideTextView}>
            <GuideText guideText={`부대에서 받은 초대코드 입력`} />
          </View>
        </View>
        {rank &&
          id &&
          password &&
          password === confirmPassword &&
          name &&
          inviteCode && (
            <TouchableOpacity
              onPress={() => registerHandler(userData)}
              style={styles.signUpButtonView}
            >
              <Text style={styles.signUpText}>사 용 신 청</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    </SafeAreaView>
  )
}
