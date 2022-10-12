import { Avatar, Button, List, Row, Col, Divider } from 'antd';
import Styles from '../styles/MemoReport.module.css';

function ReportCard(props) {
  return (
    <div className={Styles.cardLayout}>
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
              <div className={Styles.cardName}>{props.name}</div>
              <div className={Styles.cardPosition}>{props.position}</div>
            </Col>
          </Row>
        </Col>
        <Col className={Styles.cardDatetime}>
          {props.datetime}
        </Col>
      </Row>
      <div className={Styles.cardMemo}>
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
        <Col className={Styles.memoHeader}>
          {props.header}
        </Col>
      </Row>
      <Divider className={Styles.memoDivider} />
      <Row>
        <Col
          className={Styles.contentLayout}
          style={(height) => { height: height ? height : '700px' }}
        >
          <ReportCard
            name={props.name}
            position={props.position}
            memo={props.memo}
            datetime={props.datetime}
          />
          {
            props.comment &&
            <div className={Styles.memoComment}>
              <ReportList data={props.comment} />
            </div>
          }
        </Col>
      </Row>
      <input></input>
      <Divider className={Styles.memoDivider} />
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