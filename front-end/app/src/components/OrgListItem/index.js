import { View } from 'react-native'
import { List, Avatar } from 'react-native-paper'
import { useNunitoFonts } from '../../hooks/useNunitoFonts'
import { styles } from './style'

const LeftImage = () => (
  <Avatar.Image
    source={require('../../assets/images/avatar.png')}
    size={40}
    style={{ alignSelf: 'center', marginLeft: 15, marginRight: 5 }}
  />
)

const tempData = [
  {
    title: '중위 이원빈',
    description: '통신소대장',
  },
  {
    title: '중사 구창우',
    description: '통신부소대장',
  },
]

export function OrgListItem(props) {
  let [fontsLoaded] = useNunitoFonts()
  return (
    <View style={{ width: '100%' }}>
      <List.Section style={styles.section}>
        <List.Accordion
          title="통신소대"
          left={(props) => <List.Icon icon="access-point-network" />}
        >
          {tempData.map((item, idx) => (
            <List.Item
              title={item.title}
              description={item.description}
              left={LeftImage}
              titleStyle={styles.titleStyle}
              descriptionStyle={styles.descriptionStyle}
              key={idx}
              onPress={props.showModal}
            />
          ))}
          <List.Accordion
            title="용사"
            left={(props) => (
              <Avatar.Image
                source={require('../../assets/images/soldier.png')}
                size={40}
                style={styles.img}
              />
            )}
          >
            <List.Item title="분대장 병장 김형민" />
          </List.Accordion>
        </List.Accordion>
      </List.Section>
    </View>
  )
}
