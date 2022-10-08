import { useState, useCallback } from 'react';
import { Modal, Select, Button, Avatar, Row, Col } from 'antd';
import { PlusOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import styles from '../styles/MemoForm.module.css';

function LinkedPeople(peopleList) {
  if (peopleList.length === 0)
    return;

  const peopleLink = peopleList.reduce((preLink, person, index) => {
    preLink.push(
      <Col key={person.key}>
        <Row>
          <Col>
            <Avatar src={person.avatar} size={48} />
          </Col>
          <Col>
            <div>{person.rank} {person.name}</div>
            <div>{person.position}</div>
          </Col>
        </Row>
      </Col>
    );

    if (index === peopleList.length - 1)
      preLink.push(
        <Col>
          <CloseOutlined key='remover' />
        </Col>
      );
    else
      preLink.push(
        <Col key={'a' + person.key}>
          <ArrowRightOutlined />
        </Col>
      )

    return preLink;
  }, []);

  return <Row>{peopleLink}</Row>;
}

function MemoForm(props) {
  const [reportOrg, setReportOrg] = useState('');
  const [reportOrgList, setReportOrgList] = useState([]);
  const [addPerson, setAddPerson] = useState('');
  const [addPersonList, setAddPersonList] = useState([]);

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

  const additionPerson = [
    {
      id: 0,
      name: '대위 가나다'
    },
    {
      id: 1,
      name: '중위 나다라'
    },
    {
      id: 2,
      name: '소위 라마바'
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
    const listElement = findFromName(source, data[0]);
    if (!listElement) return;

    listState(list => [...list, listElement.list]);
    dataState('');
  }, [])

  const deleteList = useCallback((listState, index) => {
    listState([]);
  }, []);

  return (
    <Modal
      open={props.isOpen}
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
                {item.name}
              </Select.Option>
            ))}
          </Select>
          <Button
            className={styles.plusButton}
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => addList(reportOrg, setReportOrg, setReportOrgList, orgType)}
          />
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>보고 인원</p>
          {reportOrgList.map(org => LinkedPeople(org))}
        </div>
        <div className={styles.formElement}>
          <div>
            <p className={styles.formLabel}>추가 인원</p>
            <Select
              className={styles.formAdditionInput}
              mode="tags"
              bordered={false}
              onChange={setAddPerson}
            >
              {additionPerson.map((item) => (
                <Select.Option value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
            <Button
              className={styles.plusButton}
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => addList(addPerson, setAddPerson, setAddPersonList, additionPerson)}
            />
          </div>
          {addPersonList.map(person => LinkedPeople(person))}
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