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
  {
    title: '병장 김형민',
    description: '분대장',
  },
]

export function OrgListItem(props) {
  let [fontsLoaded] = useNunitoFonts()
  return (
    <View style={styles.container}>
      <List.Section style={styles.section}>
        <List.Accordion
          title={props.title}
          left={() => <List.Icon icon="access-point-network" />}
          style={styles.padding_0}
        >
          {tempData.map((item, idx) => (
            <List.Item
              title={item.title}
              description={item.description}
              left={LeftImage}
              titleStyle={styles.titleStyle}
              descriptionStyle={styles.descriptionStyle}
              key={idx.toString()}
              onPress={() =>
                props.showModal({
                  name: item.title,
                  role: item.description,
                  team: '통신소대',
                  tel: '010-1234-5678',
                })
              }
            />
          ))}
        </List.Accordion>
      </List.Section>
    </View>
  )
}
