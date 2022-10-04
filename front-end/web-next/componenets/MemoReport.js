import { Avatar, Button, Comment } from 'antd';

function ReportCard(props, { children }) {
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
    <Comment
      author={props.name}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      content={props.memo}
      datetime={props.datetime}
      actions={<ButtonGroup />}
    >
      {children}
    </Comment>
  )
}

export default ReportCard;