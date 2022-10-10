import { useState, useCallback } from 'react';
import { Modal, Select, Button, Avatar, Row, Col } from 'antd';
import { PlusOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '../styles/MemoForm.module.css';

function linkedUnit(unitList) {
  if (unitList.length === 0)
    return;

  const unitLink = unitList.reduce((preLink, user, index) => {
    preLink.push(
      <Col key={user.key}>
        <UserNode
          avatar={user.avatar}
          rank={user.rank}
          name={user.name}
          position={user.position}
        />
      </Col>
    );

    if (index === unitList.length - 1)
      preLink.push(
        <Col>
          <CloseOutlined key='remover' />
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
      gutter={5}
      align="middle"
    >
      {unitLink}
    </Row>
  )
}

function additionalPerson(props) {
  return (
    <Row
      gutter={5}
      align="middle"
    >
      <Col>
        <UserNode
          avatar={props.avatar}
          rank={props.rank}
          name={props.name}
          position={props.position}
        />
      </Col>
      <Col>
        <CloseOutlined key='remover' />
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
  const [reportOrg, setReportOrg] = useState([]);
  const [reportOrgList, setReportOrgList] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [addUserList, setAddUserList] = useState([]);

  const orgType = [
    {
      id: 0,
      name: '당직계통',
      list: [
        {
          key: 0,
          avatar: "https://joeschmoe.io/api/v1/random",
          name: 'OOO',
          rank: '상사',
          position: '당직사관',
        },
        {
          key: 1,
          avatar: "https://joeschmoe.io/api/v1/random",
          name: 'XXX',
          rank: '대위',
          position: '당직사령',
        }
      ]
    },
    {
      id: 1,
      name: '3중대',
      list: [
        {
          key: 0,
          avatar: "https://joeschmoe.io/api/v1/random",
          name: 'OOO',
          rank: '소위',
          position: '3중대 1소대장',
        },
        {
          key: 1,
          avatar: "https://joeschmoe.io/api/v1/random",
          name: 'XXX',
          rank: '상사',
          position: '3중대 행정보급관',
        },
        {
          key: 2,
          avatar: "https://joeschmoe.io/api/v1/random",
          name: 'XOX',
          rank: '대위',
          position: '3중대장',
        }
      ]
    }
  ]

  const additionUser = [
    {
      key: 0,
      avatar: "https://joeschmoe.io/api/v1/random",
      name: 'OOO',
      rank: '소위',
      position: '3중대 1소대장',
    },
    {
      key: 1,
      avatar: "https://joeschmoe.io/api/v1/random",
      name: 'XXX',
      rank: '상사',
      position: '3중대 행정보급관',
    },
    {
      key: 2,
      avatar: "https://joeschmoe.io/api/v1/random",
      name: 'XOX',
      rank: '대위',
      position: '3중대장',
    }
  ]

  const findFromName = useCallback((list, target) => {
    for (let element of list) {
      if (element.name === target)
        return element;
    }
    return null;
  }, []);

  const addList = useCallback((data, dataState, listState, source) => {
    const listElement = findFromName(source, data);
    if (!listElement) return;

    if (listElement.list)
      listState(list => [...list, listElement.list]);
    else
      listState(list => [...list, listElement]);
    dataState('');
  }, [])

  const deleteList = useCallback((listState, index) => {
    listState([]);
  }, []);

  return (
    <Modal
      open={props.isOpen}
      onOk={props.onSubmitted}
      onCancel={props.onCancel}
    >
      <div className={styles.formLayout}>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>제목</p>
          <input className={styles.formTitleInput} />
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>보고 종류</p>
          <Select
            className={styles.formTypeInput}
            bordered={false}
          >
            <Select.Option>보고사항</Select.Option>
            <Select.Option>지시사항</Select.Option>
            <Select.Option>긴급사항</Select.Option>
          </Select>
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>보고 체계</p>
          <Select
            className={styles.formOrgInput}
            mode="multiple"
            bordered={false}
            onChange={setReportOrg}
          >
            {orgType.map((item) => (
              <Select.Option value={item.name}>
                {item.rank} {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button
            className={styles.plusButton}
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              reportOrg.forEach((org) => addList(org, setReportOrg, setReportOrgList, orgType));
            }}
          />
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>보고 인원</p>
          {reportOrgList.map(org => linkedUnit(org))}
        </div>
        <div className={styles.formElement}>
          <div>
            <p className={styles.formLabel}>추가 인원</p>
            <Select
              className={styles.formAdditionInput}
              mode="tags"
              bordered={false}
              onChange={setAddUser}
            >
              {additionUser.map((item) => (
                <Select.Option value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
            <Button
              className={styles.plusButton}
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {
                addUser.forEach((user) => addList(user, setAddUser, setAddUserList, additionUser));
                console.log(addUserList)
              }}
            />
          </div>
          {addUserList.map(user => additionalPerson(user))}
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>내용</p>
          <textarea className={styles.formContentInput}></textarea>
        </div>
      </div>
    </Modal>
  )
}

export default MemoForm;