import { ReportListItem } from '../../components/ReportListItem'
// prettier-ignore
import { SafeAreaView, View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { FAB } from 'react-native-paper'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export function ReceivedReportScreen() {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
        <ReportListItem />
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <FAB
          icon="pencil-plus-outline"
          onPress={() => navigation.navigate('CreateReportScreen')}
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
