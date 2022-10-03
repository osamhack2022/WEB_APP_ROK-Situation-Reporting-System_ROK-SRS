import { CardListItem } from '../../components/CardListItem'
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'
import { FAB } from 'react-native-paper'
import { Alert } from 'react-native'

export function ReceivedReportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
        <CardListItem />
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <FAB
          icon="pencil-plus-outline"
          onPress={() => Alert.alert('Button Pressed.')}
          style={{ borderRadius: 20, height: 56, width: 56 }}
        ></FAB>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
})
