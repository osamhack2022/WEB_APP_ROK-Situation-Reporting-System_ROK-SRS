import Head from 'next/head'
import { Layout, Row, Col } from 'antd';
import ReportLayout from '../componenets/MemoReport'

export default function Memo() {
  const sampleData = [
    {
      'key': '1',
      'name': 'Choe',
      'memo': '거수자 1명 식별',
      'datetime': '1분 전'
    },
    {
      'key': '2',
      'name': 'Kim',
      'memo': '위병소 앞 화재 발생',
      'datetime': '23분 전',
      'comment': [
        {
          'key': '3',
          'name': 'Kim',
          'memo': '화재 상황 종료',
          'datetime': '16분 전'
        }
      ]
    },
    {
      'key': '4',
      'name': 'Jo',
      'memo': '미상의 비행체 관측',
      'datetime': '1시간 전'
    }
  ]

  function Header() {
    return (
      <div>
        <p style={styles.headerTitle}>
          3초소 거수자 발견[미종결]
        </p>
        <div style={styles.headerType}>
          <Row
            justify='end'
            gutter={12}
          >
            <Col>종류: 긴급사항</Col>
            <Col>중요도: 5</Col>
            <Col>2022-08-03 03:34</Col>
          </Row>
        </div>
      </div>
    )
  }

  function Footer() {
    return (
      <p style={styles.footer}>
        보고 체계: 중대
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
          </div>
        </Layout.Sider>
        <Layout.Content style={styles.contentLayout}>
          <div style={styles.contentMenu}>
            <ReportLayout
              header={<Header />}
              footer={<Footer />}
              name={sampleData[1].name}
              memo={sampleData[1].memo}
              datetime={sampleData[1].datetime}
              comment={sampleData[1].comment}
            />
          </div>
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