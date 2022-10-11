import React, { useState } from 'react'
import { Colors, TextInput, FAB } from 'react-native-paper'
import { View, SafeAreaView, StyleSheet } from 'react-native'
import { GuideText } from '../../components/GuideText'
import { window } from '../../constants/layout'
import DropDownPicker from 'react-native-dropdown-picker'
import { MyButton } from '../../components/MyButton'
import { useNavigation } from '@react-navigation/native'
import RankItems from '../../data/ranks'

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
      <FAB
        icon="account-plus"
        style={styles.fab}
        onPress={() => navigation.navigate('UserAddScreen')}
      />
    </SafeAreaView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
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
