import { useState } from 'react';
import Head from 'next/head'
import { Layout, Row, Col, List, Button, Input, Divider } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import ReportLayout from '../componenets/MemoReport';
import MemoForm from '../componenets/MemoForm';
import Styles from '../styles/MemoLayout.module.css';

export default function Memo() {
  const [selectedItem, setSelection] = useState(undefined);
  const [formOpened, setFormOpened] = useState(false);

  const sampleData = [
    {
      'key': 0,
      'name': 'Choe',
      'position': '통신지원반',
      'memo': 'XX시 XX분 부 위병소 앞 거수자 1명 식별. 긴급출동조는 지금 즉시 출동 바람.',
      'datetime': '5분 전',
      'title': '위병소 거수자 1명 식별',
      'type': '긴급사항',
      'level': 5,
      'unit': '대대',
      'isDone': false,
      'comment': [
        {
          'name': 'Joe',
          'position': '통신지원반',
          'memo': '이상 무',
          'datetime': '10분 전',
        }
      ]
    },
    {
      'key': 1,
      'name': 'Joe',
      'position': '통신지원반',
      'memo': '이상 무',
      'datetime': '10분 전',
      'title': '저녁 점호간 특이사항 보고',
      'type': '보고사항',
      'level': 0,
      'unit': '중대',
      'isDone': true
    }
  ];

  function Header(props) {
    return (
      <div>
        <p className={Styles.headerTitle}>
          {props.title}
          {props.isDone ? ' [종결]' : ' [미종결]'}
        </p>
        <div className={Styles.headerType}>
          <Row
            justify='end'
            gutter={12}
          >
            <Col>종류: {props.type}</Col>
            <Col>중요도: {props.level}</Col>
            <Col>{props.datetime}</Col>
          </Row>
        </div>
      </div>
    )
  }

  function Footer(props) {
    return (
      <p className={Styles.footer}>
        보고 체계: {props.unit}
      </p>
    )
  }

  return (
    <>
      <Head>
        <title>메모 보고</title>
      </Head>
      <Layout className={Styles.mainLayout}>
        <Layout.Sider
          className={Styles.siderLayout}
          width={400}
        >
          <div className={Styles.siderMenu}>
            <div className={Styles.siderHeader}>
            <Row
              align="middle"
              justify="space-between"
            >
              <Col>
                <div className={Styles.siderTitle}>받은 메모 보고</div>
              </Col>
              <Col>
                <Button
                  className={Styles.formButton}
                  shape="circle"
                  icon={<FormOutlined />}
                  onClick={() => setFormOpened(true)}
                />
              </Col>
            </Row>
            <Input.Search className={Styles.menuSearcher} />
            </div>
            <Divider className={Styles.bottomDivider} />
            <div className={Styles.scrollableDiv}>
              <List
                itemLayout="horizontal"
                dataSource={sampleData}
                renderItem={(item) => (
                  <div>
                    <Button
                      className={Styles.siderMenuButton}
                      type="link"
                      onClick={() => setSelection(item.key)}
                    >
                      <div className={Styles.siderMenuTitle}>
                        {item.title}
                        {item.isDone ? ' [종결]' : ' [미종결]'}
                      </div>
                      <div className={Styles.siderMenuContent}>
                        {item.memo}
                      </div>
                      <Row
                        className={Styles.siderMenuFooter}
                        gutter={10}
                        justify="end"
                      >
                        <Col>중요도: {item.level}</Col>
                        <Col>{item.datetime}</Col>
                      </Row>
                    </Button>
                    <Divider className={Styles.bottomDivider} />
                  </div>
                )}
              />
            </div>
          </div>
        </Layout.Sider>
        <Layout.Content className={Styles.contentLayout}>
          {
            (selectedItem !== undefined) &&
            <div className={Styles.contentMenu}>
              <ReportLayout
                header={
                  <Header
                    title={sampleData[selectedItem].title}
                    type={sampleData[selectedItem].type}
                    level={sampleData[selectedItem].level}
                    datetime={sampleData[selectedItem].datetime}
                    isDone={sampleData[selectedItem].isDone}
                  />
                }
                footer={
                  <Footer unit={sampleData[selectedItem].unit} />
                }
                height="710px"
                name={sampleData[selectedItem].name}
                position={sampleData[selectedItem].position}
                memo={sampleData[selectedItem].memo}
                datetime={sampleData[selectedItem].datetime}
                comment={sampleData[selectedItem].comment}
              />
            </div>
          }
        </Layout.Content>
      </Layout>
      <MemoForm
        isOpen={formOpened}
        onSubmitted={() => setFormOpened(false)}
        onCancel={() => setFormOpened(false)}
      />
    </>
  )
}
