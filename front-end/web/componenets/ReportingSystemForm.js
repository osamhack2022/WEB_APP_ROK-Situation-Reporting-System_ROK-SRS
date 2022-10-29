import { useState, useCallback, useEffect } from 'react';
import { Modal, Select, Button, Input, Row, Col } from 'antd';
import { PlusOutlined, DownOutlined, MinusOutlined } from '@ant-design/icons'
import { getCookie } from 'cookies-next';
import Router from "next/router";
import styles from '../styles/ReportSystemForm.module.css';
import { Convertrank } from '../helperfunction/convertrank'


function UserSelector(props) {
  const [selectedUser, selectUser] = useState(undefined);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (props.value)
      selectUser(props.value);
    
    return () => selectUser(undefined);
  }, [props]);

  const fetchUser = useCallback(async () => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user?index=0', {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getCookie('usercookie')}`
      }
    })
      .then(response => response.json())
      .then(data => setUserList(data))
  }, [setUserList]);

  const searchUser = useCallback(async (keyword) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user?search=' + keyword, {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getCookie('usercookie')}`
      }
    })
      .then(response => {
        if (response.status == 200)
          return response.json();
      })
      .then(data => setUserList(data))
  }, [setUserList]);

  return (
    <Select
      labelInValue
      showSearch
      className={styles.formAdditionInput}
      bordered={false}
      value={selectedUser}
      onFocus={fetchUser}
      onSearch={searchUser}
      onChange={(value) => {
        selectUser(value);
        props.onChange(value.key);
      }}
    >
      {userList?.map((item) => (
        item._id &&
        <Select.Option key={item._id} value={'' + item.Rank + ' ' + item.Name}>
          {item.Role + ' ' + Convertrank(item.Rank) + ' ' + item.Name}
        </Select.Option>
      ))}
    </Select>
  )
}

function ReportSystemForm(props) {
  const [reportTitle, setReportTitle] = useState('');
  const [reportList, setReportList] = useState([undefined]);

  useEffect(() => {
    if (props.data.Title)
      setReportTitle(props.data.Title);
    else
      setReportTitle('');

    if (props.data.List)
      setReportList([...props.data.List]);
    else
      setReportList([undefined]);
  }, [props.data]);

  const appendReportList = useCallback(() => {
    setReportList(reportList => [...reportList, undefined]);
  }, []);

  const removeReportList = useCallback((index) => {
    setReportList(reportList => {
      const listCopy = [...reportList];
      listCopy.splice(index, 1);
      return listCopy;
    });
  }, []);

  const editReportList = useCallback((index, value) => {
    setReportList(reportList => {
      reportList[index] = value;
      return reportList;
    });
  });

  const submitSystem = useCallback(async (title, list, _id) => {
    const submitData = {
      Title: title,
      List: list.filter(e => e),
    }

    if (_id) {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/reportsys/', {
        'method': 'PUT',
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${getCookie('usercookie')}`
        },
        'body': JSON.stringify({ ...submitData, _id: _id })
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      return;
    }

    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/reportsys/', {
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
      Router.reload();
  }, []);

  return (
    <Modal
      open={props.isOpen}
      okText="저장하기"
      cancelText="취소"
      onOk={() => {
        submitSystem(reportTitle, reportList, props.data._id);
        props.onSubmit();
      }}
      onCancel={props.onCancel}
    >
      <div className={styles.formLayout}>
        <p className={styles.formTitle}>{props.data._id ? '수정하기' : '추가하기'}</p>
        <div className="memoCustomForm">
          <div className={styles.formElement}>
            <p className={styles.formLabel}>제목</p>
            <Input
              className={styles.formTitleInput}
              value={reportTitle}
              onChange={(event) => setReportTitle(event.target.value)}
            />
          </div>
          <div className={styles.formElement}>
            <Row
              style={{ marginBottom: '15px' }}
              align="middle"
              justify="space-between"
            >
              <Col>
                <div className={styles.formLabel}>목록</div>
              </Col>
              <Col>
                <Button
                  icon={<PlusOutlined />}
                  shape="circle"
                  onClick={() => appendReportList()}
                />
              </Col>
            </Row>
            {reportList.map((report, index) => (
              report !== null &&
              <div key={'selection' + index}>
                {
                  index !== 0 &&
                  (
                    <Row style={{ margin: '5px 0' }} align="middle" justify="center">
                      <Col><DownOutlined style={{ fontSize: '16pt' }} /></Col>
                    </Row>
                  )
                }
                <Input.Group compact>
                  <Button
                    icon={<MinusOutlined />}
                    danger="true"
                    size="large"
                    onClick={() => removeReportList(index)}
                  />
                  <UserSelector
                    value={report ? { 'key': report._id, 'value': '' + report.Rank + ' ' + report.Name } : undefined}
                    onChange={(value) => editReportList(index, value)}
                  />
                </Input.Group>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ReportSystemForm;