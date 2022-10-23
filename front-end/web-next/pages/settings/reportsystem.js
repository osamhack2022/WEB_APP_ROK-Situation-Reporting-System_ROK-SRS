import Head from 'next/head'
import Link from "next/link"
import RegisterHeader from '../../componenets/registerheader'
import { useState, useEffect } from 'react';
import { PageHeader, Breadcrumb, Row, Col, Avatar, List } from 'antd';
import { PlusOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { getCookie } from 'cookies-next';

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

function LinkedUser(props) {
  if (props.list.length === 0)
    return <></>;

  const unitLink = props.list.reduce((preLink, user, index) => {
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

    if (index !== props.list.length - 1)
      preLink.push(
        <Col key={'a' + user.DoDID}>
          <ArrowRightOutlined />
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

const ReportSystem = () => {
  const [systemList, setSystemList] = useState([]);

  useEffect(() => {
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
    }, []);
    useEffect(() => {

      console.log(systemList);
    }, [systemList]);

  return (
    <>
      <Head>
        <title>보고체계 설정</title>
      </Head>
      <PageHeader
        className="site-page-header"
        style={{
          backgroundColor: "white",
          boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)'
        }}
        title="보고체계 설정"
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/settings">계정설정</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/settings/unit">부대설정</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ color: 'black', cursor: 'pointer' }}>보고체계 설정</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a style={{ display: 'none' }}>Null</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
      />
      {
        systemList.length !== 0 && 
        <List
          itemLayout="vertical"
            dataSource={systemList}
            renderItem={(item) => (
              <List.Item>
                <div>{item.Title}</div>
                <LinkedUser title={item.Title} list={item.List} />
              </List.Item>
  )}
          />
      }
    </>
  )
}

export default ReportSystem;