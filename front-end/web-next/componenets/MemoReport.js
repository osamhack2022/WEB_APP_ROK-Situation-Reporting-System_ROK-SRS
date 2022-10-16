import { useState } from 'react';
import { Avatar, Button, List, Row, Col, Divider, Input } from 'antd';
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
  const [commentContent, setCommentContent] = useState('');

  function ButtonGroup() {
    return (
      <div>
        <Button
          type="primary"
          size="large"
          danger
        >
          종결하기
        </Button>
        <Button
          size="large"
        >
          상급보고
        </Button>
      </div>
    )
  }

  return (
    <div className={Styles.reportLayout}>
      <Row>
        <Col className={Styles.memoHeader}>
          {props.header}
        </Col>
      </Row>
      <Divider className={Styles.memoDivider} />
      <Row className={Styles.contentLayout}>
        <Col className={Styles.cardListLayout}>
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
      <div className={Styles.memoFooter}>
        <Input.Group compact>
          <Input
            style={{ width: 'calc(100% - 60px)' }}
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
          />
          <Button
            onClick={() => console.log(commentContent)}>
            전송
          </Button>
        </Input.Group>
        <Divider className={Styles.memoDivider} />
        <Row justify='space-between'>
          <Col>
            {props.footer}
          </Col>
          <Col>
            <ButtonGroup />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ReportLayout;
export { ReportCard, ReportList }