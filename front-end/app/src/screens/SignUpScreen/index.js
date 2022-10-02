import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
import { View, SafeAreaView } from 'react-native'
import { styles } from './style'

export default function SignUpScreen() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [rank, setRank] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.signUpView}>
        <TextInput
          label="군 번"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(id) => setId(id)}
          style={styles.signUpTextInput}
        ></TextInput>
        <TextInput
          label="비밀번호"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(password) => setPassword(password)}
          style={styles.signUpTextInput}
        ></TextInput>
        <TextInput
          label="비밀번호 확인"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
          style={styles.signUpTextInput}
        ></TextInput>
        <TextInput
          label="이름"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(name) => setName(name)}
          style={styles.signUpTextInput}
        ></TextInput>
        <TextInput
          label="계급"
          dense={true}
          activeUnderlineColor="#008275"
          onChangeText={(rank) => setRank(rank)}
          style={styles.signUpTextInput}
        ></TextInput>
      </View>
    </SafeAreaView>
  )
}
