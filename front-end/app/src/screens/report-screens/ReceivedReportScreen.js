import { ReportListItem } from '../../components/ReportListItem'
// prettier-ignore
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'
import { Colors, FAB } from 'react-native-paper'
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
          style={{
            borderRadius: 60,
            height: 56,
            width: 56,
          }}
        ></FAB>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
    marginBottom: 10,
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
