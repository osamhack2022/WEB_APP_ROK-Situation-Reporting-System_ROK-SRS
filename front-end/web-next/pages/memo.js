import Head from 'next/head'
import { Layout, Divider, List } from 'antd';
import ReportCard, { ReportList } from '../componenets/MemoReport'

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
      'children': [
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

  return (
    <>
      <Head>
        <title>메모 보고</title>
      </Head>
      {/* {listCard(sampleData)} */}
      <Layout>
        <Layout.Sider style={styles.siderLayout}>
          <div style={styles.siderMenu}>
            <p>받은 메모 보고</p>
          </div>
        </Layout.Sider>
        <Layout.Content style={styles.contentLayout}>
          <div style={styles.contentMenu}>
            <ReportList
              header={
                <>
                  <p>3초소 거수자 발견[미종결]</p>
                  <p>종류: 긴급사항</p>
                  <p>중요도: 5</p>
                  <p>2022-08-03 03:34</p>
                </>
              }
              footer={<p>보고 체계: 중대</p>}
              data={sampleData}
            />
          </div>
        </Layout.Content>
      </Layout>
    </>
  )
}


const styles = {
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
    backgroundColor: 'transparent',
    padding: '10px 20px'
  },
  contentMenu: {
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '3px 4px 5px #777'
  }
}