import React, { useState } from 'react'
//prettier-ignore
import { SafeAreaView, StyleSheet, View, FlatList, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import DropDownPicker from 'react-native-dropdown-picker'
import { ReportHeader } from '../../components/ReportHeader'
import { ReportContent } from '../../components/ReportContent'
import { ReportComment } from '../../components/ReportComment'
import { Colors } from 'react-native-paper'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/userState'
import addCommentApi from '../../apis/report/addCommentApi'

const addCommentHandler = async ({ Type, Content, Title, _id }) => {
  const res = await addCommentApi({ Type, Content, Title, _id })
  console.log(res)
}

export function ReportScreen({ route }) {
  const { Title, isEnd, Content, severity, date, Type } = route.params

  const [userMe, setUserMe] = useRecoilState(userState)

  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const [open, setOpen] = useState(false)
  const [commentType, setCommentType] = useState('')
  const [typeItem, setTypeItem] = useState([
    { label: '보고', value: 'report' },
    { label: '지시', value: 'order' },
    { label: '긴급', value: 'emergency' },
  ])

  const ListHeaderComponent = () => (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <ReportHeader
        Title={Title}
        isEnd={isEnd}
        severity={severity}
        date={date}
      />
      <ReportContent Content={Content} Type={Type} />
      <View
        style={{
          width: '97%',
          borderBottomWidth: 1,
          borderColor: Colors.grey700,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '500', padding: 5 }}>
          Comments.
        </Text>
      </View>
    </View>
  )

  const renderItem = ({ item }) => {
    return (
      <ReportComment
        name={item.Name}
        position={item.position}
        Content={item.Content}
        Type={item.Type}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={comments}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
          containerStyle={{ width: '15%', marginRight: 0 }}
          dropDownContainerStyle={styles.dropDown}
          placeholderStyle={styles.dropDownText}
          textStyle={styles.dropDownText}
          showArrowIcon={false}
          showTickIcon={false}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="댓글을 입력하세요."
          activeUnderlineColor={Colors.green500}
          activeOutlineColor={Colors.green500}
          multiline={true}
          dense={true}
          onChangeText={(text) => setComment(text)}
          value={comment}
          right={
            <TextInput.Icon
              icon="send-outline"
              style={{
                paddingTop: 8,
              }}
              size={25}
              color={Colors.green500}
              onPress={() => {
                setComments([
                  ...comments,
                  {
                    Name: userMe.Name,
                    position: userMe.Position,
                    Content: comment,
                    Type: commentType,
                  },
                ])
                addCommentHandler({
                  Title,
                  Type: commentType,
                  Content: comment,
                  _id: userMe._id,
                })
                setComment('')
              }}
            />
          }
        ></TextInput>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingBottom: 60,
  },
  commentView: {
    bottom: 0,
    position: 'absolute',
    width: '99%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  commentInput: {
    paddingTop: 10,
    width: '82%',
    backgroundColor: Colors.grey100,
    elevation: 4,
    marginLeft: 3,
  },
  dropDown: {
    backgroundColor: Colors.red300,
    borderWidth: 0,
    borderRadius: 5,
    elevation: 4,
  },
  dropDownText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
})
