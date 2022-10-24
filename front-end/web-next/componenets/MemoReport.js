import { useState, useCallback } from 'react';
import { Avatar, Button, List, Row, Col, Divider, Input } from 'antd';
import { getCookie } from 'cookies-next';
import koreanTimeFormat from '../helperfunction/koreanDateFormat';
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
              <div className={Styles.cardName}>{props.name} {props.rank}</div>
              <div className={Styles.cardPosition}>{props.position}</div>
            </Col>
          </Row>
        </Col>
        <Col className={Styles.cardDatetime}>
          {koreanTimeFormat(props.datetime)}
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
            name={item.User?.Name}
            rank={item.User?.Rank}
            position={item.User?.Position}
            memo={item.Content}
            datetime={item.createdAt}
          />
        </List.Item>
      )}
    />
  )
}

function ReportLayout(props) {
  const [commentContent, setCommentContent] = useState('');

  const submitComment = useCallback((content) => {
    const submitData = {
      ReportId: props.id,
      Type: '보고사항',
      Content: content
    }
    
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/comment/', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
      'body': JSON.stringify(submitData)
    })
      .then(res => {
        console.log(res);
        if(res.status === 200 || res.status === 201)
          setCommentContent('');
      })
      .catch(err => console.log(err))
  }, [props.id]);

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
console.log(props.comment)
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
            rank={props.rank}
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
      <div className={Styles.memoFooterGroup}>
        <Input.Group compact>
          <Input
            style={{ width: 'calc(100% - 60px)' }}
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
          />
          <Button onClick={() => submitComment(commentContent)}>
            전송
          </Button>
        </Input.Group>
        <Divider className={Styles.memoDivider} />
        <Row
          className={Styles.memoFooter}
          justify='space-between'
        >
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