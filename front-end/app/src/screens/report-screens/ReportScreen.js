import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native'
import { TextInput } from 'react-native-paper'
import { ReportHeader } from '../../components/ReportHeader'
import { ReportContent } from '../../components/ReportContent'
import { ReportComment } from '../../components/ReportComment'
import { Colors } from 'react-native-paper'

const name = '상병 조영효'
const position = '본부중대 저격'

const DATA = []

export function ReportScreen() {
  const [comment, setComment] = useState('')

  const ListHeaderComponent = () => (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <ReportHeader />
      <ReportContent />
    </View>
  )

  const renderItem = ({ item }) => {
    return (
      <ReportComment
        name={item.name}
        position={item.position}
        text={item.text}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={DATA}
        renderItem={renderItem}
      />
      <View style={styles.commentInputView}>
        <TextInput
          style={styles.commentInput}
          placeholder="댓글을 입력하세요."
          multiline={true}
          dense={true}
          onChangeText={(text) => setComment(text)}
          value={comment}
          right={
            <TextInput.Icon
              icon="send-circle-outline"
              size={30}
              color={Colors.blue400}
              onPress={() => {
                DATA.push({
                  name: name,
                  position: position,
                  text: comment,
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
    backgroundColor: 'white',
    alignItems: 'center',
  },
  commentInputView: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  commentInput: {
    width: '100%',
  },
})
