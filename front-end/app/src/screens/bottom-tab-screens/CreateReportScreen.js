import React, { useState } from 'react'
import { TextInput, SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Colors } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import DropDownPicker from 'react-native-dropdown-picker'
import { Profile } from '../../components/Profile'

export function CreateReportScreen() {
  let [fontsLoaded] = useNunitoFonts()
  const [typeOpen, setTypeOpen] = useState(false)
  const [groupOpen, setGroupOpen] = useState(false)
  const [type, setType] = useState('')
  const [group, setGroup] = useState([])
  const [types, setTypes] = useState([
    { label: '긴급상황', value: '긴급상황' },
    { label: '비상상황', value: '비상상황' },
  ])
  const [groups, setGroups] = useState([
    { label: '당직계통', value: '당직계통' },
    { label: '본부중대', value: '본부중대' },
  ])

  const DATA = {
    당직계통: [
      {
        name: '중사 김택수',
        position: '당직사관',
      },
      {
        name: '대위 정종찬',
        position: '당직사령',
      },
    ],
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.text}>제목</Text>
        <TextInput style={styles.titleInput}></TextInput>
      </View>
      <View style={styles.dropDownOuterView}>
        <View style={styles.dropDownView}>
          <Text style={styles.text}>보고종류</Text>
          <DropDownPicker
            placeholder="보고종류"
            open={typeOpen}
            value={type}
            items={types}
            setOpen={setTypeOpen}
            setValue={setType}
            setItems={setTypes}
            style={styles.dropDown}
          />
        </View>
        <View style={styles.dropDownView}>
          <Text style={styles.text}>보고체계</Text>
          <DropDownPicker
            multiple={true}
            multipleText={`${group.length}개 선택됨`}
            placeholder="보고체계"
            open={groupOpen}
            value={group}
            items={groups}
            setOpen={setGroupOpen}
            setValue={setGroup}
            setItems={setGroups}
            style={styles.dropDown}
            mode="SIMPLE"
          />
        </View>
      </View>
      <View style={styles.reportedPeopleView}>
        <Text style={styles.text}>보고된 인원</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Profile
            name="중사 김택수"
            position="당직사관"
            src={require('../../assets/images/avatar2.png')}
          />
          <Profile
            name="중사 김택수"
            position="당직사관"
            src={require('../../assets/images/avatar2.png')}
          />
          <Profile
            name="중사 김택수"
            position="당직사관"
            src={require('../../assets/images/avatar2.png')}
          />
        </View>
      </View>
      <View></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleView: { width: '90%', marginVertical: 10 },
  text: {
    fontFamily: 'NunitoSans_600SemiBold',
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 3,
  },
  titleInput: {
    backgroundColor: Colors.grey300,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    fontFamily: 'NunitoSans_400Regular',
  },
  dropDownOuterView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownView: {
    width: '48%',
    marginBottom: 10,
  },
  dropDown: {
    backgroundColor: Colors.grey300,
    borderWidth: 0,
    borderRadius: 10,
  },
  reportedPeopleView: {
    width: '90%',
  },
})
