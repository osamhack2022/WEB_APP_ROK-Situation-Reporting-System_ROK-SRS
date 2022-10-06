import { useState } from 'react';
import Head from 'next/head'
import { Layout, Row, Col, List, Button, Input } from 'antd';
import ReportLayout from '../componenets/MemoReport'

export default function Memo() {
  const [selectedItem, setSelection] = useState(undefined);
  const sampleData = [
    {
      'key': 0,
      'name': 'Choe',
      'position': '통신지원반',
      'memo': 'test',
      'datetime': '5분 전'
    },
    {
      'key': 1,
      'name': 'Joe',
      'position': '통신지원반',
      'memo': '이상 무',
      'datetime': '10분 전'
    },
    
  ];

  function Header(props) {
    return (
      <div>
        <p style={styles.headerTitle}>
          {props.title}
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
            <Input.Search />
            <List
              itemLayout="horizontal"
              dataSource={sampleData}
              renderItem={(item) => (
                <Button
                  style={{ width: '100%', color: '#000' }}
                  type="link"
                  onClick={() => setSelection(item.key)}
                >
                  {item.memo}
                </Button>
              )}
            />
          </div>
        </Layout.Sider>
        <Layout.Content style={styles.contentLayout}>
          {
            (selectedItem !== undefined) &&
            <div style={styles.contentMenu}>
              <ReportLayout
                header={<Header />}
                footer={<Footer />}
                name={sampleData[selectedItem].name}
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
    backgroundColor: '#777',
  },
  siderLayout: {
    backgroundColor: 'transparent',
    padding: '10px 20px'
  },
  siderMenu: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '3px 4px 5px #777'
  },
  contentLayout: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: '10px 20px'
  },
  contentMenu: {
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

  }
}