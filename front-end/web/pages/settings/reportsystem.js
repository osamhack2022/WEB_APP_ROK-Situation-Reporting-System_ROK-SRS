import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Row, Col, Avatar, List, Button, Spin } from "antd";
import {
  PlusOutlined,
  ArrowRightOutlined,
  EditOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getCookie } from "cookies-next";
import ReportSystemForm from "../../componenets/ReportingSystemForm";
import Styles from "../../styles/reportSystem.module.css";
import { Convertrank } from '../../helperfunction/convertrank'

function UserNode(props) {
  return (
    <Row gutter={10}>
      <Col>
        <Avatar src={props.avatar} icon={<UserOutlined />} size={48} />
      </Col>
      <Col>
        <div>
          {Convertrank(props.rank)} {props.name}
        </div>
        <div>{props.position}</div>
      </Col>
    </Row>
  );
}

function LinkedUser(props) {
  if (props.list.length === 0) return <></>;

  const unitLink = props.list.reduce((preLink, user, index) => {
    preLink.push(
      <Col key={user.DoDID} className={Styles.linkedNode}>
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
        <Col key={"arrow" + user.DoDID} className={Styles.linkedNode}>
          <ArrowRightOutlined style={{ fontSize: "20pt" }} />
        </Col>
      );

    return preLink;
  }, []);

  return (
    <Row key={props.title} gutter={5} align="middle">
      {unitLink}
    </Row>
  );
}

const ReportSystem = (props) => {
  const [systemList, setSystemList] = useState([]);
  const [isListLoaded, setListLoaded] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const refreshSystem = useCallback(() => {
    setListLoaded(false);
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + "api/reportsys", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("usercookie")}`,
      },
    })
      .then((response) => {
        if (response.status == 200) {
          setListLoaded(true);
          return response.json();
        }
        return [];
      })
      .then((data) => setSystemList(data));
  }, [setListLoaded, setSystemList]);

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
    };
  }, [refreshSystem, props.setHeaderExtra]);

  const removeSystem = useCallback(
    async (id) => {
      await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + "api/reportsys/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("usercookie")}`,
        },
        body: JSON.stringify({ _id: id }),
      })
        .then((res) => {
          if (res.status === 200) refreshSystem();
          else console.log(res);
        })
        .catch((err) => console.log(err));
      return;
    },
    [formOpen, refreshSystem]
  );

  return (
    <>
      <Head>
        <title>보고체계 설정</title>
      </Head>
      <div>
        {
          !isListLoaded
            ? (
              <Row className={Styles.spinSkeleton} align="middle" justify="center">
                <Col>
                  <Spin size="large" />
                </Col>
              </Row>
            )
            :
            systemList.length === 0
              ? (
                <Row className={Styles.spinSkeleton} align="middle" justify="center">
                  <Col>
                    <p className={Styles.failedText}>{'설정된 보고체계가 없습니다.\n우측 상단의 버튼을 눌러 새 보고체계를 생성하십시오.'}</p>
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
                        <Row className={Styles.systemTitle} gutter={5}>
                          <Col>{item.Title}</Col>
                          <Col>
                            <Button
                              className={Styles.formButton}
                              icon={<EditOutlined style={{ fontSize: "12pt" }} />}
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
                              icon={<CloseOutlined style={{ fontSize: "12pt" }} />}
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
  );
};

export default ReportSystem;
