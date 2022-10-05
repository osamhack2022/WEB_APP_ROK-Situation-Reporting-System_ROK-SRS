import Head from 'next/head'
import ReportCard, {ReportLayout} from '../componenets/MemoReport'

function listCard(data) {
  if(!data)
    return null;

  return (
    data.map((node) => (
      <ReportCard
        key={node.key}
        name={node.name}
        memo={node.memo}
        datetime={node.datetime}
      >
        { node.children && listCard(node.children) }
      </ReportCard>
    ))
  )
}

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
      <ReportLayout />
    </>
  )
}