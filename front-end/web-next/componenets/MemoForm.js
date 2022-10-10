import { useState, useCallback } from 'react';
import { Modal, Select, Button, Avatar, Row, Col } from 'antd';
import { PlusOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '../styles/MemoForm.module.css';

function linkedUnit(unitList, key, onRemove = null) {
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

function additionalPerson(person, key, onRemove = null) {
  return (
    <Row
      key={'addP' + key}
      gutter={5}
      align="middle"
    >
      <Col>
        <UserNode
          avatar={person.avatar}
          rank={person.rank}
          name={person.name}
          position={person.position}
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
  const [reportOrg, setReportOrg] = useState([]);
  const [reportOrgList, setReportOrgList] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [addUserList, setAddUserList] = useState([]);

  const orgType = [
    {
      key: 0,
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
      key: 1,
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

  const findFromKey = useCallback((list, target) => {
    for (let element of list) {
      if (element.key == target)
        return element;
    }
    return null;
  }, []);

  const addList = useCallback((key, dataState, listState, source) => {
    const listElement = findFromKey(source, key);
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
            labelInValue
            className={styles.formOrgInput}
            mode="multiple"
            bordered={false}
            value={reportOrg.length !== 0 ? reportOrg : undefined}
            onChange={setReportOrg}
          >
            {orgType.map((item) => (
              <Select.Option key={item.key} value={item.name}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button
            className={styles.plusButton}
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              if (reportOrg.length !== 0)
                reportOrg.forEach(({ key }) => addList(key, setReportOrg, setReportOrgList, orgType));
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
              onChange={setAddUser}
            >
              {additionUser.map((item) => (
                <Select.Option key={item.key} value={'' + item.rank + ' ' + item.name}>
                  {item.rank} {item.name}
                </Select.Option>
              ))}
            </Select>
            <Button
              className={styles.plusButton}
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {
                if (addUser.length !== 0)
                  addUser.forEach(({ key }) => addList(key, setAddUser, setAddUserList, additionUser));
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
          <textarea className={styles.formContentInput}></textarea>
        </div>
      </div>
    </Modal>
  )
}

export default MemoForm;