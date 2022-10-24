import Head from 'next/head'
import Link from "next/link"
import { useState, useEffect, useCallback } from 'react';
import { Row, Col, Avatar, List, Button, Spin } from 'antd';
import { PlusOutlined, ArrowRightOutlined, EditOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons'
import { getCookie } from 'cookies-next';
import ReportSystemForm from '../../componenets/ReportingSystemForm';
import Styles from '../../styles/reportSystem.module.css'

function UserNode(props) {
  return (
    <Row gutter={10}>
      <Col>
        <Avatar
          src={props.avatar}
          icon={<UserOutlined />}
          size={48}
        />
      </Col>
      <Col>
        <div>{props.rank} {props.name}</div>
        <div>{props.position}</div>
      </Col>
    </Row>
  )
}

function LinkedUser(props) {
  if (props.list.length === 0)
    return <></>;

  const unitLink = props.list.reduce((preLink, user, index) => {
    preLink.push(
      <Col
        key={user.DoDID}
        className={Styles.linkedNode}
      >
        <UserNode
          avatar={user.pic}
          rank={user.Rank}
          name={user.Name}
          position={user.Position}
        />
      </Col>
    );

    if (index !== props.list.length - 1)
      preLink.push(
        <Col
          key={'arrow' + user.DoDID}
          className={Styles.linkedNode}
        >
          <ArrowRightOutlined style={{ fontSize: '20pt' }} />
        </Col>
      )

    return preLink;
  }, []);

  return (
    <Row
      key={props.title}
      gutter={5}
      align="middle"
    >
      {unitLink}
    </Row>
  )
}

const ReportSystem = (props) => {
  const [systemList, setSystemList] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    refreshSystem();
    props.setHeaderExtra(
      <Button
        className={Styles.formButton}
        icon={<PlusOutlined />}
        shape="circle"
        onClick={() => {
          setFormData({});
          setFormOpen(true);
        }}
      />
    );

    return () => {
      props.setHeaderExtra(undefined);
    }
  }, [refreshSystem, props.setHeaderExtra]);

  const refreshSystem = useCallback(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/reportsys', {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
    })
      .then(response => {
        if (response.status == 200)
          return response.json();
        return [];
      })
      .then(data => setSystemList(data));
  }, [setSystemList]);

  const removeSystem = useCallback(async (id) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/reportsys/', {
      'method': 'DELETE',
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
      'body': JSON.stringify({ _id: id })
    })
      .then(res => {
        if (res.status === 200)
          refreshSystem();
        else
          console.log(res);
      })
      .catch(err => console.log(err))
    return;
  }, [formOpen, refreshSystem]);

  return (
    <>
      <Head>
        <title>보고체계 설정</title>
      </Head>
      <div>
        {
          systemList.length === 0
            ? (
              <Row
                className={Styles.spinSkeleton}
                align="middle"
                justify="center"
              >
                <Col>
                  <Spin size="large" />
                </Col>
              </Row>
            )
            : (
              <div className={Styles.scrollableView}>
                <List
                  className={Styles.systemLayout}
                  itemLayout="vertical"
                  dataSource={systemList}
                  renderItem={(item) => (
                    <List.Item>
                      <Row
                        className={Styles.systemTitle}
                        gutter={5}
                      >
                        <Col>
                          {item.Title}
                        </Col>
                        <Col>
                          <Button
                            className={Styles.formButton}
                            icon={<EditOutlined style={{ fontSize: '12pt' }} />}
                            shape="circle"
                            onClick={() => {
                              setFormData(item);
                              setFormOpen(true);
                            }}
                          />
                        </Col>
                        <Col>
                          <Button
                            className={Styles.formButton}
                            icon={<CloseOutlined style={{ fontSize: '12pt' }} />}
                            shape="circle"
                            onClick={() => {
                              removeSystem(item._id);
                            }}
                          />
                        </Col>
                      </Row>
                      <LinkedUser title={item.Title} list={item.List} />
                    </List.Item>
                  )}
                />
              </div>
            )
        }
        <ReportSystemForm
          isOpen={formOpen}
          data={formData}
          onSubmit={() => {
            setFormOpen(false);
            setFormData({});
            refreshSystem();
          }}
          onCancel={() => {
            setFormOpen(false);
            setFormData({});
          }}
        />
      </div>
      )
    </>
  )
}

export default ReportSystem;