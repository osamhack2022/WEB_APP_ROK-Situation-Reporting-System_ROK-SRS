import Chatsidebar from "../componenets/Chatsidebar";
import { Avatar, Form, Select, Input } from "antd";
import styles from "../styles/chatpage.module.css";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { collection, query, addDoc, updateDoc, doc } from "@firebase/firestore";
import { getCookie } from "cookies-next";
import { decodeJwt } from "jose";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { orderBy } from "firebase/firestore";
import { db } from "../firebaseauth";

export function getServerSideProps({ req, res }) {
  const JWTtoken = req.cookies["usercookie"];

  console.log(JWTtoken);
  if (!JWTtoken)
    return {
      redirect: `{
      destination: '/',
      permanent: false,
      },`,
    };

  const { id } = decodeJwt(JWTtoken);
  if (!id)
    return {
      redirect: `{
      destination: '/',
      permanent: false,
      },`,
    };

  return {
    props: {
      userId: id,
    },
  };
}

function Page({ userId }) {
  const [form] = Form.useForm();
  const bottomOfChat = useRef();
  const router = useRouter();
  const { id } = router.query;

  const scrollToBottom = useCallback(
    () =>
      bottomOfChat.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      }),
    []
  );

  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  if (!snapshot) return <div>Loading...</div>;

  let chatdata = null;
  for (let i = 0; i < snapshot.docs.length; i++) {
    if (snapshot.docs[i].id == id) {
      chatdata = snapshot.docs[i].data();
    }
  }

  let submitnewmessage = async (values) => {
    console.log(values);
    let chattype = values.type;
    let message = values.message;
    if (!message) {
      return;
    }
    let endpoint =
      process.env.NEXT_PUBLIC_BACKEND_ROOT + "api/chat/score?text=";
    const options = {
      // The method is POST because we are sending data.
      method: "GET",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("usercookie"),
      },
    };
    //Fetch data from external API
    const res = await fetch(endpoint + message, options);
    const data = await res.json();

    let newscore = Math.round(
      0.4 * parseInt(chatdata["severity"]) + 0.6 * parseInt(data.score)
    );
    if (!chattype) {
      chattype = "regular";
    }
    await addDoc(collection(db, "chats", id, "messages"), {
      sender: userId,
      text: message,
      timestamp: new Date(),
      type: chattype,
    });
    const collectionref = collection(db, "chats");
    await updateDoc(doc(collectionref, id), {
      recentmsg: message,
      rectime: new Date(),
      severity: newscore,
    });
  };

  function Getparticipants() {
    let userdatas = chatdata["userdata"];
    return Object.entries(userdatas).map(([key, value]) => (
      <Avatar key={key} style={{ backgroundColor: value.color }}>
        {" "}
        {value.name}{" "}
      </Avatar>
    ));
  }
  function Getparticipantbyid(id) {
    let userdatas = chatdata["userdata"];
    for (const [key, value] of Object.entries(userdatas)) {
      if (key == id) {
        return value;
      }
    }
  }
  function Generatechat({ id, scrollToBottom }) {
    const [tmpMessages, setTmpMessages] = useState([]);
    const [messages, loading, error] = useCollectionData(
      query(collection(db, "chats", id, "messages"), orderBy("timestamp"))
    );

    useEffect(() => {
      if (messages) {
        setTmpMessages(messages);
      }
    }, [messages]);
    useEffect(() => {
      scrollToBottom();
    }, [tmpMessages]);

    return tmpMessages.map((message, index) => {
      let participant = Getparticipantbyid(message.sender);
      return generatechatelement(
        message.sender != userId ? "theirs" : "mine",
        message.type,
        message.text,
        participant.name,
        participant.color,
        index
      );
    });
  }
  return (
    <>
      <Chatsidebar userId={userId} snapshot={snapshot}>
        {id && (
          <div className={styles.container}>
            <div className={styles.header}>
              <div
                style={{
                  width: "90%",
                  margin: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h1 className={styles.title}>{chatdata.name}</h1>
                <div className={styles.participants}>
                  <h3>참가자: </h3>
                  <Avatar.Group>
                    <Getparticipants></Getparticipants>
                  </Avatar.Group>
                </div>
              </div>
            </div>
            <div className={styles.chatarea} style={{ flex: "1" }}>
              <Generatechat id={id} scrollToBottom={scrollToBottom} />
              <div ref={bottomOfChat} />
            </div>
            <div className={styles.footer}>
              <Form
                form={form}
                initialValues={{ remember: true }}
                className={styles.messageform}
                onFinish={submitnewmessage}
              >
                <Form.Item name="type">
                  <Select
                    id="type"
                    name="type"
                    placeholder="메세지 종류"
                    optionFilterProp="children"
                    style={{ width: "140px" }}
                  >
                    <Select.Option value="regular">일반메세지</Select.Option>
                    <Select.Option value="report">상황보고</Select.Option>
                    <Select.Option value="order">지시사항</Select.Option>
                    <Select.Option value="secret">암구호</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="message" style={{ flex: "1" }}>
                  <Input
                    id="message"
                    name="message"
                    placeholder="메세지를 입력해주세요"
                  />
                </Form.Item>
                <button className={styles.button} type="primary">
                  보내기
                </button>
              </Form>
            </div>
          </div>
        )}
      </Chatsidebar>
    </>
  );
}

function generatechatelement(which, type, content, name, color, key) {
  if (which == "mine") {
    if (type == "regular") {
      return (
        <>
          <div className={styles.mychatelem} key={key}>
            {content}
          </div>
        </>
      );
    } else if (type == "report") {
      return (
        <>
          <div className={styles.mychatelem} key={key}>
            <p
              style={{
                color: "green",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              [상황보고]
            </p>
            {content}
          </div>
        </>
      );
    } else if (type == "order") {
      return (
        <>
          <div className={styles.mychatelem} key={key}>
            <p
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              [지시사항]
            </p>
            {content}
          </div>
        </>
      );
    } else if (type == "secret") {
      function ScretText({ content }) {
        const [isVisible, setIsVisible] = useState(false);

        return (
          <div
            className={styles.mychatelem}
            onClick={() => setIsVisible((p) => !p)}
            style={{ cursor: "pointer" }}
            key={key}
          >
            <p
              style={{ color: "red", textAlign: "center", fontWeight: "bold" }}
            >
              [기밀사항]
            </p>
            {isVisible ? content : <>클릭해 주세요.</>}
          </div>
        );
      }

      return <ScretText content={content} key={key} />;
    }
  } else if (which == "theirs") {
    if (type == "regular") {
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
            key={key}
          >
            <div className={styles.theirchatelem}>{content}</div>
            <div
              style={{
                width: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar style={{ backgroundColor: color, margin: "auto" }}>
                {" "}
                {name}{" "}
              </Avatar>
              <div style={{ margin: 0, margin: "auto" }}>{name}</div>
            </div>
          </div>
        </>
      );
    } else if (type == "report") {
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
            key={key}
          >
            <div className={styles.theirchatelem}>
              <p
                style={{
                  color: "green",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                [상황보고]
              </p>
              {content}
            </div>
            <div
              style={{
                width: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar style={{ backgroundColor: color, margin: "auto" }}>
                {" "}
                {name}{" "}
              </Avatar>
              <div style={{ margin: 0, margin: "auto" }}>{name}</div>
            </div>
          </div>
        </>
      );
    } else if (type == "order") {
      return (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
            key={key}
          >
            <div className={styles.theirchatelem}>
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                [지시사항]
              </p>
              {content}
            </div>
            <div
              style={{
                width: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar style={{ backgroundColor: color, margin: "auto" }}>
                {" "}
                {name}{" "}
              </Avatar>
              <div style={{ margin: 0, margin: "auto" }}>{name}</div>
            </div>
          </div>
        </>
      );
    } else if (type == "secret") {
      function ScretText({ content }) {
        const [isVisible, setIsVisible] = useState(false);

        return (
          <>
            <div
              onClick={() => setIsVisible((p) => !p)}
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-end",
                cursor: "pointer",
              }}
              key={key}
            >
              <div className={styles.theirchatelem}>
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  [기밀사항]
                </p>
                {isVisible ? content : <>클릭해 주세요.</>}
              </div>
              <div style={{ width: "50px" }}>
                <Avatar style={{ backgroundColor: color, margin: "auto" }}>
                  {" "}
                  {name}{" "}
                </Avatar>
                <div style={{ margin: 0, margin: "auto" }}>{name}</div>
              </div>
            </div>
          </>
        );
      }

      return <ScretText content={content} key={key} />;
    }
  }
}

export default Page;
