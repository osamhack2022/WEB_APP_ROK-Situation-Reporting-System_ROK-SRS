import React, { useState } from 'react'
// prettier-ignore
import { TextInput, SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'
import { Colors, Searchbar, Text } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import DropDownPicker from 'react-native-dropdown-picker'
import { ReportGroup } from '../../components/ReportGroup'
import { MyButton } from '../../components/MyButton'
import { useNavigation } from '@react-navigation/native'
import DATA from '../../data/procData'

export function CreateReportScreen() {
  let [fontsLoaded] = useNunitoFonts()

  const navigation = useNavigation()

  const [query, setQuery] = useState('')

  const [typeOpen, setTypeOpen] = useState(false)
  const [type, setType] = useState('')
  const [typeItem, setTypeItem] = useState([
    { label: '긴급상황', value: 'urgent' },
    { label: '비상상황', value: 'emergency' },
  ])

  const [groupOpen, setGroupOpen] = useState(false)
  const [groups, setGroups] = useState([])
  const [groupItem, setGroupItem] = useState([
    { label: '당직계통', value: 'onDuty' },
    { label: '본부중대', value: 'headquarter' },
  ])

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ width: '100%', alignItems: 'center' }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleView}>
          <Text style={styles.text}>제목</Text>
          <TextInput
            style={styles.titleInput}
            onChangeText={(title) => setTitle(title)}
            value={title}
          ></TextInput>
        </View>
        <View style={styles.dropDownOuterView}>
          <View style={styles.dropDownView}>
            <Text style={styles.text}>보고종류</Text>
            <DropDownPicker
              placeholder="보고종류"
              open={typeOpen}
              value={type}
              items={typeItem}
              setOpen={setTypeOpen}
              setValue={setType}
              setItems={setTypeItem}
              style={styles.dropDown}
            />
          </View>
          <View style={styles.dropDownView}>
            <Text style={styles.text}>보고체계</Text>
            <DropDownPicker
              multiple={true}
              multipleText={`${groups.length}개 선택됨`}
              placeholder="보고체계"
              open={groupOpen}
              value={groups}
              items={groupItem}
              setOpen={setGroupOpen}
              setValue={setGroups}
              setItems={setGroupItem}
              style={styles.dropDown}
            />
          </View>
        </View>
        <View style={styles.width90}>
          <Text style={styles.text}>보고된 인원</Text>
          {groups.includes('onDuty') && (
            <ReportGroup group={DATA.onDuty} name="onDuty" />
          )}
          {groups.includes('headquarter') && (
            <ReportGroup group={DATA.headquarter} name="headquarter" />
          )}
        </View>
        <View
          style={[styles.width90, groups.length === 0 && { marginTop: 15 }]}
        >
          <Text style={styles.text}>추가된 인원</Text>
          <Searchbar
            style={styles.searchBar}
            inputStyle={{ fontSize: 15 }}
            onChangeText={(query) => setQuery(query)}
          />
        </View>
        <View style={[styles.width90, { marginTop: 15 }]}>
          <Text style={styles.text}>내용</Text>
          <TextInput
            style={styles.contentInput}
            multiline={true}
            onChangeText={(text) => setText(text)}
            value={text}
          ></TextInput>
        </View>
        {type && groups && text && (
          <MyButton
            text="보 고 하 기"
            onPress={() => navigation.navigate('RecdReportScreen')}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleView: { width: '90%', marginVertical: 10 },
  text: {
    fontFamily: 'NunitoSans_600SemiBold',
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 3,
  },
  titleInput: {
    backgroundColor: Colors.grey200,
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
    backgroundColor: Colors.grey200,
    borderWidth: 0,
    borderRadius: 10,
  },
  width90: {
    width: '90%',
  },
  searchBar: {
    backgroundColor: Colors.grey200,
    borderRadius: 10,
    elevation: 0,
    height: 40,
  },
  contentInput: {
    backgroundColor: Colors.grey200,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 15,
    fontFamily: 'NunitoSans_400Regular',
    marginBottom: 20,
  },
})
