import { Avatar, Button, Comment, List } from 'antd';

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
      {!props.isChild && <ButtonGroup />}
    </>
  )
}

function replyList(data) {
  if (!data)
    return null;

  return (
    data.map((node) => (
      <ReportCard
        key={node.key}
        name={node.name}
        memo={node.memo}
        datetime={node.datetime}
        isChild
      >
        {node.children && listCard(node.children)}
      </ReportCard>
    ))
  )
}

function ReportList(props) {
  return (
    <List
      itemLayout="vertical"
      header={props.header && props.header}
      footer={props.footer && props.footer}
      dataSource={props.data}
      renderItem={(item) => (
        <List.Item>
          <ReportCard
            name={item.name}
            memo={item.memo}
            datetime={item.datetime}
          >
            {item.children && replyList(item.children)}
          </ReportCard>
        </List.Item>
      )}
    />
  )
}

export default ReportCard;
export { ReportList }