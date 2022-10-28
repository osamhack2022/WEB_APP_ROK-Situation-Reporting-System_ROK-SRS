import React, { useState, useRef, useEffect } from 'react'
//prettier-ignore
import { SafeAreaView, StyleSheet, View, FlatList, Text, TextInput } from 'react-native'
import { IconButton } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import { ReportHeader } from '../../components/ReportHeader'
import { ReportContent } from '../../components/ReportContent'
import { ReportComment } from '../../components/ReportComment'
import { Colors } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import addCommentApi from '../../apis/report/addCommentApi'
import getReportsysApi from '../../apis/report-sys/getReportsysApi'
import { convertRank } from '../../helperfunctions/convertRank'

export function ReportScreen({ route }) {
  const {
    Title,
    Status,
    Content,
    Severity,
    date,
    Type,
    ReportingSystem,
    Invited,
    User,
  } = route.params

  const earlierComments = route.params.Comments

  console.log(earlierComments)

  const [userMe, setUserMe] = useRecoilState(userState)

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(earlierComments)
  const [reportsys, setReportsys] = useState(null)
  const [open, setOpen] = useState(false)
  const [commentType, setCommentType] = useState('')
  const [typeItem, setTypeItem] = useState([
    { label: '보고', value: '보고사항' },
    { label: '지시', value: '지시사항' },
    { label: '기밀', value: '기밀사항' },
  ])

  const [focus, setFocus] = useState(false)
  const inputRef = useRef(null)

  const ListHeaderComponent = () => (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <ReportHeader
        Title={Title}
        Status={Status}
        Severity={Severity}
        date={date}
        Type={Type}
      />
      <ReportContent
        Content={Content}
        ReportingSystem={reportsys}
        Invited={Invited}
        User={User}
      />
      <View
        style={{
          width: '97%',
          borderBottomWidth: 1,
          borderColor: Colors.grey500,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '500', padding: 5 }}>
          Comments.
        </Text>
      </View>
    </View>
  )

  const ItemSeparator = () => (
    <View
      style={{
        width: '97%',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey300,
        alignSelf: 'center',
      }}
    />
  )

  const renderItem = ({ item }) => (
    <ReportComment User={User} Content={item.Content} Type={item.Type} />
  )

  const addCommentHandler = async ({ Type, Content, Title, _id }) => {
    console.log({ Type, Content, Title, _id })
    const res = await addCommentApi({ Type, Content, Title, _id })
    console.log(res)
  }

  useEffect(() => {
    const getReportsysHandler = async () => {
      const res = await getReportsysApi(ReportingSystem)
      setReportsys(res[0])
    }
    getReportsysHandler()
  })

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={comments}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
      <View style={styles.commentView}>
        <DropDownPicker
          placeholder="유형"
          open={open}
          value={commentType}
          items={typeItem}
          setOpen={setOpen}
          setValue={setCommentType}
          setItems={setTypeItem}
          style={styles.dropDown}
          containerStyle={{ width: '15%' }}
          dropDownContainerStyle={styles.dropDown}
          placeholderStyle={styles.dropDownText}
          textStyle={styles.dropDownText}
          showArrowIcon={false}
          showTickIcon={false}
        />
        <View style={[styles.commentInput, borderColor(focus)]}>
          <TextInput
            placeholder={`댓글을 입력하세요.`}
            multiline={true}
            onChangeText={(text) => setComment(text)}
            value={comment}
            style={styles.input}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            ref={inputRef}
          />
          <IconButton
            icon="send-outline"
            size={25}
            color={focus ? '#008275' : Colors.grey500}
            onPress={() => {
              // 추후 수정 필요
              setComments([
                ...comments,
                {
                  Name: userMe.Name,
                  position: userMe.Position,
                  Content: comment,
                  Type: commentType,
                  Rank: convertRank(userMe.Rank),
                },
              ])
              addCommentHandler({
                Title,
                Type: commentType,
                Content: comment,
                _id: userMe._id,
              })
              setComment('')
              inputRef.current.blur()
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  commentView: {
    width: '98%',
    paddingTop: 5,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  commentInput: {
    width: '82%',
    backgroundColor: Colors.grey100,
    elevation: 4,
    marginLeft: 3,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderRadius: 8,
  },
  dropDown: {
    backgroundColor: Colors.red300,
    borderWidth: 0,
    borderRadius: 8,
    elevation: 4,
  },
  dropDownText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    fontSize: 15,
    flex: 1,
  },
})

const borderColor = (focus) =>
  StyleSheet.create({
    borderBottomColor: focus ? '#008275' : Colors.grey400,
  })
