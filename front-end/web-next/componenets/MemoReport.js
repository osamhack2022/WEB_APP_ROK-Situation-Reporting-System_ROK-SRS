import { Avatar, Button, Comment, List, Row, Col, Divider } from 'antd';

function ReportCard(props) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Row
        align="middle"
        justify='space-between'
      >
        <Col>
          <Row gutter={12}>
            <Col>
              <Avatar src="https://joeschmoe.io/api/v1/random" size={48} />
            </Col>
            <Col>
              <div style={styles.cardName}>{props.name}</div>
              <div style={styles.cardPosition}>{props.position}</div>
            </Col>
          </Row>
        </Col>
        <Col style={styles.cardDatetime}>
          {props.datetime}
        </Col>
      </Row>
      <div style={styles.cardMemo}>
        {props.memo}
      </div>
    </div>
  )
}

function ReportList(props) {
  return (
    <List
      itemLayout="vertical"
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item>
          <ReportCard
            name={item.name}
            position={item.position}
            memo={item.memo}
            datetime={item.datetime}
          />
        </List.Item>
      )}
    />
  )
}

function ReportLayout(props) {
  function ButtonGroup() {
    return (
      <>
        <Button
          type="dashed"
          danger
        >
          종결하기
        </Button>
        <Button>
          상급보고
        </Button>
      </>
    )
  }

  return (
    <>
      <Row>
        <Col style={{ width: '100%' }}>
          {props.header}
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col style={styles.contentLayout(props.height)}>
          <ReportCard
            name={props.name}
            position={props.position}
            memo={props.memo}
            datetime={props.datetime}
          />
          {
            props.comment &&
            <div style={{ paddingLeft: '30px' }}>
              <ReportList data={props.comment} />
            </div>
          }
        </Col>
      </Row>
      <Divider />
      <Row justify='space-between'>
        <Col>
          {props.footer}
        </Col>
        <Col>
          <ButtonGroup />
        </Col>
      </Row>
    </>
  )
}

export default ReportLayout;
export { ReportCard, ReportList }

const styles = {
  cardName: {
    fontSize: '12pt',
    fontWeight: 'bold',
  },
  cardPosition: {
    fontSize: '10pt',
    color: '#4d4d4d'
  },
  cardDatetime: {
    fontSize: '12pt',
    fontWeight: 'bold'
  },
  cardMemo: {
    marginTop: '10px',
    paddingLeft: '5px',
    fontSize: '11pt'
  },
  contentLayout: (height) => ({
    width: '100%',
    maxHeight: height && '660px',
    overflow: 'auto'
  })
}