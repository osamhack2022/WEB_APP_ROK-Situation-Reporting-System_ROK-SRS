import { useState } from 'react';
import Head from 'next/head'
import { Layout, Row, Col, List, Button, Input, Divider } from 'antd';
import ReportLayout from '../componenets/MemoReport'

export default function Memo() {
  const [selectedItem, setSelection] = useState(undefined);
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
        <p style={styles.headerTitle}>
          {props.title}
          {props.isDone ? ' [종결]' : ' [미종결]'}
        </p>
        <div style={styles.headerType}>
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
      <p style={styles.footer}>
        보고 체계: {props.unit}
      </p>
    )
  }

  return (
    <>
      <Head>
        <title>메모 보고</title>
      </Head>
      <Layout style={styles.mainLayout}>
        <Layout.Sider
          style={styles.siderLayout}
          width={400}
        >
          <div style={styles.siderMenu}>
            <p>받은 메모 보고</p>
            <Input.Search style={styles.menuSearcher} />
            <div style={styles.scrollableDiv}>
              <List
                itemLayout="horizontal"
                dataSource={sampleData}
                renderItem={(item) => (
                  <Button
                    style={styles.siderMenuButton}
                    type="link"
                    onClick={() => setSelection(item.key)}
                  >
                    <p style={styles.siderMenuTitle}>
                      {item.title}
                      {item.isDone ? ' [종결]' : ' [미종결]'}
                    </p>
                    <p style={styles.siderMenuContent}>
                      {item.memo}
                    </p>
                    <Row
                      style={styles.siderMenuFooter}
                      gutter={10}
                      justify="end"
                    >
                      <Col>중요도: {item.level}</Col>
                      <Col>{item.datetime}</Col>
                    </Row>
                  </Button>
                )}
              />
            </div>
          </div>
        </Layout.Sider>
        <Layout.Content style={styles.contentLayout}>
          {
            (selectedItem !== undefined) &&
            <div style={styles.contentMenu}>
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
                height="660px"
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
    </>
  )
}


const styles = {
  mainLayout: {
    height: '100%',
    padding: '20px 30px',
    backgroundColor: '#777'
  },
  siderLayout: {
    height: '100%',
    backgroundColor: 'transparent',
    padding: '10px 20px'
  },
  siderMenu: {
    height: '100%',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '3px 4px 5px #777'
  },
  contentLayout: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    padding: '10px 20px'
  },
  contentMenu: {
    height: '100%',
    padding: '20px 40px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '3px 4px 5px #777'
  },
  headerTitle: {
    fontSize: '14pt',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  headerType: {
    textAlign: 'right'
  },
  footer: {

  },
  menuSearcher: {
    marginBottom: '15px'
  },
  scrollableDiv: {
    maxHeight: 'calc(100% - 100px)',
    overflow: 'auto'
  },
  siderMenuButton: {
    width: '100%',
    height: 'auto',
    color: '#000',
    textAlign: 'left'
  },
  siderMenuTitle: {
    fontSize: '11pt'
  },
  siderMenuContent: {
    fontSize: '10pt',
    paddingLeft: '10pt',
    maxWidth: '288pt',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  siderMenuFooter: {
    fontSize: '10pt'
  }
}