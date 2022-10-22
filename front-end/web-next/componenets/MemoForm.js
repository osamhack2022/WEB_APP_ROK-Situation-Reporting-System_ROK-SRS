import { useState, useCallback } from 'react';
import { Modal, Select, Button, Avatar, Row, Col } from 'antd';
import { PlusOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { getCookie } from 'cookies-next';
import styles from '../styles/MemoForm.module.css';

const orgType = [
  {
    key: 0,
    title: '당직계통',
    list: [
      {
        DoDID: 0,
        pic: "https://joeschmoe.io/api/v1/random",
        Name: 'OOO',
        Rank: '상사',
        Position: '당직사관',
      },
      {
        DoDID: 1,
        pic: "https://joeschmoe.io/api/v1/random",
        Name: 'XXX',
        Rank: '대위',
        Position: '당직사령',
      }
    ]
  },
  {
    key: 1,
    title: '3중대',
    list: [
      {
        DoDID: 0,
        pic: "https://joeschmoe.io/api/v1/random",
        Name: 'OOO',
        Rank: '소위',
        Position: '3중대 1소대장',
      },
      {
        DoDID: 1,
        pic: "https://joeschmoe.io/api/v1/random",
        Name: 'XXX',
        Rank: '상사',
        Position: '3중대 행정보급관',
      },
      {
        DoDID: 2,
        pic: "https://joeschmoe.io/api/v1/random",
        Name: 'XOX',
        Rank: '대위',
        Position: '3중대장',
      }
    ]
  }
]

function linkedUnit(unitList, key, onRemove = null) {
  if (unitList.length === 0)
    return;

  const unitLink = unitList.reduce((preLink, user, index) => {
    preLink.push(
      <Col key={user.DoDID}>
        <UserNode
          avatar={user.pic}
          rank={user.Rank}
          name={user.Name}
          position={user.Position}
        />
      </Col>
    );

    if (index === unitList.length - 1)
      preLink.push(
        <Col key={'del' + key}>
          <Button
            className={styles.removeButton}
            shape="circle"
            icon={<CloseOutlined />}
            onClick={onRemove}
          />
        </Col>
      );
    else
      preLink.push(
        <Col key={'a' + user.key}>
          <ArrowRightOutlined />
        </Col>
      )

    return preLink;
  }, []);

  return (
    <Row
      key={'linkP' + key}
      gutter={5}
      align="middle"
    >
      {unitLink}
    </Row>
  )
}

function additionalPerson(user, key, onRemove = null) {
  return (
    <Row
      key={'addP' + key}
      gutter={5}
      align="middle"
    >
      <Col>
        <UserNode
          avatar={user.pic}
          rank={user.Rank}
          name={user.Name}
          position={user.Position}
        />
      </Col>
      <Col>
        <Button
          className={styles.removeButton}
          shape="circle"
          icon={<CloseOutlined />}
          onClick={onRemove}
        />
      </Col>
    </Row>
  )
}

function UserNode(props) {
  return (
    <Row>
      <Col>
        <Avatar src={props.avatar} size={48} />
      </Col>
      <Col>
        <div>{props.rank} {props.name}</div>
        <div>{props.position}</div>
      </Col>
    </Row>
  )
}

function MemoForm(props) {
  const [memoTitle, setMemoTitle] = useState('');
  const [memoType, setMemoType] = useState(null);
  const [reportOrg, setReportOrg] = useState([]);
  const [reportOrgList, setReportOrgList] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [addUserList, setAddUserList] = useState([]);
  const [memoContent, setMemoContent] = useState('');
  const [fetchedInvitedList, setFetchedInvitedList] = useState([]);

  const fetchInvited = useCallback(async () => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user?index=0', {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getCookie('usercookie')}`
      }
    })
      .then(response => response.json())
      .then(data => setFetchedInvitedList(data))
  }, [setFetchedInvitedList]);

  const fetchInvitedFromKeyword = useCallback(async (keyword) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user?search=' + keyword, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getCookie('usercookie')}`
      }
    })
    .then(response => response.json())
    .then(data => setFetchedInvitedList(data))
  }, [setFetchedInvitedList]);
  
  const submitMemo = useCallback(async(memoTitle, memoType, reportOrgList, addUserList, memoContent) => {
    const submitData = {
      Title: memoTitle,
      Type: memoType,
      ReportingSystem: reportOrgList.map((org) => (org.title)),
      Invited: addUserList,
      Content: memoContent
    }

    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/report/', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
      'body': JSON.stringify(submitData)
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
}, []);

  const findFromId = useCallback((list, target, id) => {
    for (let element of list) {
      if (element[id] == target)
        return element;
    }
    return null;
  }, []);

  const addList = useCallback((key, id, dataState, listState, source) => {
    const listElement = findFromId(source, key, id);
    if (!listElement) return;

    listState(list => [...list, listElement]);
    dataState('');
  }, [])

  const deleteList = useCallback((listState, key) => {
    listState(list => list.filter(e => (e.key !== key)));
  }, []);


  return (
    <Modal
      open={props.isOpen}
      onOk={() => {
        submitMemo(memoTitle, memoType, reportOrgList, addUserList, memoContent);
        props.onSubmitted();
      }}
      onCancel={props.onCancel}
    >
      <div className={styles.formLayout}>
        <div className="memoCustomForm">
          <div className={styles.formElement}>
            <p className={styles.formLabel}>제목</p>
            <input
              className={styles.formTitleInput}
              value={memoTitle}
              onChange={(event) => setMemoTitle(event.target.value)}
            />
          </div>
          <div className={styles.formElement}>
            <p className={styles.formLabel}>보고 종류</p>
            <Select
              className={styles.formTypeInput}
              bordered={false}
              value={memoType}
              onChange={setMemoType}
            >
              <Select.Option value="보고사항">보고사항</Select.Option>
              <Select.Option value="지시사항">지시사항</Select.Option>
              <Select.Option value="긴급사항">긴급사항</Select.Option>
            </Select>
          </div>
          <div className={styles.formElement}>
            <p className={styles.formLabel}>보고 체계</p>
            <Select
              labelInValue
              className={styles.formOrgInput}
              mode="multiple"
              bordered={false}
              value={reportOrg.length !== 0 ? reportOrg : undefined}
              onChange={setReportOrg}
            >
              {orgType.map((item) => (
                <Select.Option key={item.key} value={item.title}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
            <Button
              className={styles.plusButton}
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {
                if (reportOrg.length !== 0)
                  reportOrg.forEach(({ key }) => addList(key, 'key', setReportOrg, setReportOrgList, orgType));
              }}
            />
          </div>
          {
            reportOrgList.length !== 0 &&
            <div className={styles.formElement}>
              <p className={styles.formLabel}>보고 인원</p>
              {reportOrgList.map((org) => linkedUnit(org.list, org.key, () => deleteList(setReportOrgList, org.key)))}
            </div>
          }
          <div className={styles.formElement}>
            <div>
              <p className={styles.formLabel}>추가 인원</p>
              <Select
                labelInValue
                className={styles.formAdditionInput}
                mode="multiple"
                bordered={false}
                value={addUser.length !== 0 ? addUser : undefined}
                onFocus={fetchInvited}
                onChange={setAddUser}
                onSearch={fetchInvitedFromKeyword}
              >
                {fetchedInvitedList?.map((item) => (
                  item.DoDID &&
                  <Select.Option key={item.DoDID} value={'' + item.Rank + ' ' + item.Name}>
                    {'' + item.Rank + ' ' + item.Name}
                  </Select.Option>
                ))}
              </Select>
              <Button
                className={styles.plusButton}
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (addUser.length !== 0)
                    addUser.forEach(({ key }) => addList(key, 'DoDID', setAddUser, setAddUserList, fetchedInvitedList));
                }}
              />
            </div>
            {
              addUserList.length !== 0 &&
              addUserList.map((user, index) => additionalPerson(user, index, () => deleteList(setAddUserList, user.key)))
            }
          </div>
          <div className={styles.formElement}>
            <p className={styles.formLabel}>내용</p>
            <textarea
              className={styles.formContentInput}
              value={memoContent}
              onChange={(event) => setMemoContent(event.target.value)}
            >
            </textarea>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default MemoForm;