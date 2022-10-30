import { useState, useEffect, useCallback } from "react";
import { Modal, Select, Button, Avatar, Row, Col } from "antd";
import {
  PlusOutlined,
  ArrowRightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { getCookie } from "cookies-next";
import styles from "../styles/MemoForm.module.css";
import { Convertrank } from "../helperfunction/convertrank";

function linkedUnit(unitList, key, onRemove = null) {
  if (unitList.length === 0) return;

  const unitLink = unitList.reduce((preLink, user, index) => {
    preLink.push(
      <Col key={user.DoDID}>
        <UserNode
          avatar={user.pic}
          rank={Convertrank(user.Rank)}
          name={user.Name}
          role={user.Role}
        />
      </Col>
    );

    if (index === unitList.length - 1)
      preLink.push(
        <Col key={"del" + key}>
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
        <Col key={"a" + user.key}>
          <ArrowRightOutlined />
        </Col>
      );

    return preLink;
  }, []);

  return (
    <Row key={"linkP" + key} gutter={5} align="middle">
      {unitLink}
    </Row>
  );
}

function additionalPerson(user, key, onRemove = null) {
  return (
    <Row key={"addP" + key} gutter={5} align="middle">
      <Col>
        <UserNode
          avatar={user.pic}
          rank={Convertrank(user.Rank)}
          name={user.Name}
          role={user.Role}
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
  );
}

function UserNode(props) {
  return (
    <Row gutter={10}>
      <Col>
        <Avatar src={props.avatar} size={48} />
      </Col>
      <Col>
        <div>
          {Convertrank(props.rank)} {props.name}
        </div>
        <div>{props.role}</div>
      </Col>
    </Row>
  );
}

function MemoForm(props) {
  const setMemoRenderList = props.setMemoRenderList;
  const memonoteType = props.memonoteType;
  const setMemonoteType = props.setMemonoteType;
  const [memoTitle, setMemoTitle] = useState("");
  const [memoType, setMemoType] = useState(null);
  const [reportOrg, setReportOrg] = useState([]);
  const [reportOrgList, setReportOrgList] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [addUserList, setAddUserList] = useState([]);
  const [memoContent, setMemoContent] = useState("");
  const [fetchedInvitedList, setFetchedInvitedList] = useState([]);
  const [fetchedReportingSystem, setFetchedReportingSystem] = useState([]);

  useEffect(() => {
    // remove all form data when unmounted
    setMemoTitle("");
    setMemoType(null);
    setReportOrg([]);
    setReportOrgList([]);
    setAddUser([]);
    setAddUserList([]);
    setMemoContent("");
  }, [props.isOpen]);

  const fetchReportingSystem = useCallback(async () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + "api/reportsys", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("usercookie")}`,
      },
    })
      .then((response) => {
        if (response.status == 200) return response.json();
        return [];
      })
      .then((data) => setFetchedReportingSystem(data));
  }, [setFetchedReportingSystem]);

  const fetchInvited = useCallback(async () => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + "api/user?index=0", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("usercookie")}`,
      },
    })
      .then((response) => {
        if (response.status == 200) return response.json();
        return [];
      })
      .then((data) => setFetchedInvitedList(data));
  }, [setFetchedInvitedList]);

  const fetchInvitedFromKeyword = useCallback(
    async (keyword) => {
      await fetch(
        process.env.NEXT_PUBLIC_BACKEND_ROOT + "api/user?search=" + keyword,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getCookie("usercookie")}`,
          },
        }
      )
        .then((response) => {
          if (response.status == 200) return response.json();
          return [];
        })
        .then((data) => setFetchedInvitedList(data));
    },
    [setFetchedInvitedList]
  );

  const submitMemo = useCallback(
    async (memoTitle, memoType, reportOrgList, addUserList, memoContent) => {
      const submitData = {
        Title: memoTitle,
        Type: memoType,
        ReportingSystem: reportOrgList.map((org) => org._id),
        Invited: addUserList.map((user) => user._id),
        Content: memoContent,
      };

      await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + "api/report/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getCookie("usercookie")}`,
        },
        body: JSON.stringify(submitData),
      })
        .then((res) => res.json())
        .then((data) =>
          memonoteType === "sendMemo"
            ? setMemoRenderList((p) => [data, ...p])
            : setMemonoteType("sendMemo")
        )
        .catch((err) => console.log(err));
    },
    []
  );

  const findFromId = useCallback((list, target, id) => {
    for (let element of list) {
      if (element[id] == target) return element;
    }
    return null;
  }, []);

  const addList = useCallback((key, id, dataState, listState, source) => {
    const listElement = findFromId(source, key, id);
    if (!listElement) return;

    listState((list) => [...list, listElement]);
    dataState("");
  }, []);

  const deleteList = useCallback((listState, id) => {
    listState((list) => list.filter((e) => e._id !== id));
  }, []);

  return (
    <Modal
      open={props.isOpen}
      okText="보고하기"
      cancelText="취소"
      onOk={() => {
        submitMemo(
          memoTitle,
          memoType,
          reportOrgList,
          addUserList,
          memoContent
        );
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
              onFocus={fetchReportingSystem}
              onChange={setReportOrg}
            >
              {fetchedReportingSystem.map((item) => (
                <Select.Option key={item._id} value={item.Title}>
                  {item.Title}
                </Select.Option>
              ))}
            </Select>
            <Button
              className={styles.plusButton}
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => {
                if (reportOrg.length !== 0)
                  reportOrg.forEach(({ key }) =>
                    addList(
                      key,
                      "_id",
                      setReportOrg,
                      setReportOrgList,
                      fetchedReportingSystem
                    )
                  );
              }}
            />
          </div>
          {reportOrgList.length !== 0 && (
            <div className={styles.formElement}>
              <p className={styles.formLabel}>보고 인원</p>
              {reportOrgList.map((org) =>
                linkedUnit(org.List, org._id, () =>
                  deleteList(setReportOrgList, org._id)
                )
              )}
            </div>
          )}
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
                {fetchedInvitedList?.map(
                  (item) =>
                    item._id && (
                      <Select.Option
                        key={item._id}
                        value={"" + item.Rank + " " + item.Name}
                      >
                        {item.Role +
                          " " +
                          Convertrank(item.Rank) +
                          " " +
                          item.Name}
                      </Select.Option>
                    )
                )}
              </Select>
              <Button
                className={styles.plusButton}
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (addUser.length !== 0)
                    addUser.forEach(({ key }) =>
                      addList(
                        key,
                        "_id",
                        setAddUser,
                        setAddUserList,
                        fetchedInvitedList
                      )
                    );
                }}
              />
            </div>
            {addUserList.length !== 0 &&
              addUserList.map((user, index) =>
                additionalPerson(user, index, () =>
                  deleteList(setAddUserList, user._id)
                )
              )}
          </div>
          <div className={styles.formElement}>
            <p className={styles.formLabel}>내용</p>
            <textarea
              className={styles.formContentInput}
              value={memoContent}
              onChange={(event) => setMemoContent(event.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MemoForm;
