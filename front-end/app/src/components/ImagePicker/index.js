import React, { useState } from 'react'
import * as ExpoImagePicker from 'expo-image-picker'
import { Pressable, Image, Text, View } from 'react-native'
import { styles } from './style'

export function ImagePicker({ imageUrl, setImageUrl }) {
  const [status, requestPermission] =
    ExpoImagePicker.useMediaLibraryPermissions()

  const uploadImage = async () => {
    // 권한 확인 코드
    if (!status?.granted) {
      const permission = await requestPermission()
      if (!permission.granted) {
        return null
      }
    }
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowEditing: true,
      quality: 1,
      aspect: [1, 1],
    })
    if (result.cancelled) {
      return null // 이미지 업로드 취소한 경우
    }
    console.log(result)
    setImageUrl(result.uri)
  }

  return (
    <Pressable onPress={uploadImage} style={styles.pressable}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      {!imageUrl && (
        <View style={styles.absolute}>
          <Text style={styles.text}>{`부대 마크 변경하려면 클릭`}</Text>
        </View>
      )}
    </Pressable>
  )
}
