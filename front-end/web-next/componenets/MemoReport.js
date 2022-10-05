import { Avatar, Button, Comment, Layout, Divider } from 'antd';

function ReportCard(props) {
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
      <Comment
        author={props.name}
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        content={props.memo}
        datetime={props.datetime}
      >
        {props.children}
      </Comment>
      <ButtonGroup />
    </>
  )
}

function ReportLayout() {
	return (
		<Layout>
			<Layout.Sider style={styles.siderLayout}>
				<div style={styles.siderMenu}>
					<p>받은 메모 보고</p>
				</div>
			</Layout.Sider>
			<Layout.Content style={styles.contentLayout}>
				<div style={styles.contentMenu}>
					<p>3초소 거수자 발견[미종결]</p>
					<p>종류: 긴급사항</p>
					<p>중요도: 5</p>
					<p>2022-08-03 03:34</p>
					<Divider />
					<ReportCard
						name="상병 조용효"
						memo="충성! 당직사령닙 3초소에 사복을 입은 거수자가 나타났습니다.\n무기를 소지한것 같지는 않고 위병소 앞에서 두리번 거리고 있습니다.\n현재 경계중이며, 추가사항 발생시 보고드리겠습니다. "
						datetime="2022-08-03 03:34"
					/>
					<Divider />
					<ReportCard
						name="상병 조용효"
						memo="충성! 당직사령닙 3초소에 사복을 입은 거수자가 나타났습니다.\n무기를 소지한것 같지는 않고 위병소 앞에서 두리번 거리고 있습니다.\n현재 경계중이며, 추가사항 발생시 보고드리겠습니다. "
						datetime="2022-08-03 03:34"
					/>
					<Divider />
					<p>보고 체계: 중대</p>
				</div>
			</Layout.Content>
		</Layout>
	)
}

export default ReportCard;
export { ReportLayout };

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