import {
  Avatar,
  List,
  Button,
  Input,
  Upload,
  Image,
  TreeSelect,
  Form,
} from "antd";
import styles from "../../styles/unitsettings.module.css";
import unitlogo from "../../img/unitlogo.png";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { Convertrank } from '../../helperfunction/convertrank'
import { decodeJwt } from 'jose';

const { TextArea } = Input;
const backendroot = process.env.NEXT_PUBLIC_BACKEND_ROOT;

const treeData1 = [
  {
    title: "병사",
    value: "title1",
    children: [
      { title: "이병", value: "PVT" },
      { title: "일병", value: "PFC" },
      { title: "상병", value: "CPL" },
      { title: "병장", value: "SGT" },
    ],
  },
  {
    title: "부사관",
    value: "title2",
    children: [
      { title: "하사", value: "SST" },
      { title: "중사", value: "SFC" },
      { title: "상사", value: "MST" },
      { title: "원사", value: "SGM" },
    ],
  },
  {
    title: "장교",
    value: "title3",
    children: [
      { title: "소위", value: "SECLIU" },
      { title: "중위", value: "LIU" },
      { title: "대위", value: "CPT" },
      { title: "소령", value: "MAJ" },
      { title: "중령", value: "LTC" },
      { title: "대령", value: "COL" },
    ],
  },
  {
    title: "장군",
    value: "title4",
    children: [
      { title: "준장", value: "BG" },
      { title: "소장", value: "MG" },
      { title: "중장", value: "LG" },
      { title: "대장", value: "GEN" },
    ],
  },
];

const treeData2 = [
  {
    title: "용사",
    value: "soldier",
  },
  {
    title: "지휘자",
    value: "leader",
  },
];

const UnitSettings = (props) => {
    let props1 = props['data'][0]
    let props2 = props['data2'][0]
    const [uploadedunitlogo, setuploadedunitlogo] = useState("none")
    const [uploadedunitname, setuploadedunitname] = useState("none")
    const [uploadedunitslogan, setuploadedunitslogan] = useState("none")




    //user loading function
    const count = 4;
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [unitUsers, setUnitUsers] = useState([]);

    useEffect(() => {
      fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user/unit', {
          'method': 'GET',
          'headers': {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getCookie('usercookie')}`
          }
      })
          .then(response => {
              if (response.status == 200)
                  return response.json()
          })
          .then(data => setUnitUsers(data));
    }, [setUnitUsers]);

  //Submit NewUser
  const [DoDID, setDoDID] = useState();
  //TreeData1
  const [Rank, setRank] = useState();
  const onChange1 = (newValue) => {
    if (
      newValue == "title1" ||
      newValue == "title2" ||
      newValue == "title3" ||
      newValue == "title4"
    ) {
      setRank();
      return;
    } else {
      setRank(newValue);
    }
  };
  //TreeData2
  const [Type, setType] = useState();
  const onChange2 = (newValue) => {
    setType(newValue);
  };
  const [Name, setName] = useState();
  const [Position, setPosition] = useState();

  const [error1, seterror1] = useState();
  const [success1, setsuccess1] = useState();
  const [error2, seterror2] = useState();
  const [success2, setsuccess2] = useState();
  const [error3, seterror3] = useState();
  const [success3, setsuccess3] = useState();

  let submitnewuser = async (event) => {
    let endpoint = backendroot + "api/user/add";
    const data = {
      DoDID: DoDID,
      Name: Name,
      Rank: Rank,
      Type: Type,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("usercookie"),
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user/unit', {
        'method': 'GET',
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getCookie('usercookie')}`
        }
    })
        .then(response => {
            if (response.status == 200)
                return response.json()
        })
        .then(data => setUnitUsers(data));
    if (result["Invcode"]) {
      seterror3("");
      setsuccess3("성공");
    } else {
      setsuccess3("");
      seterror3(result["message"]);
    }
  };

  let submitunitinfo = async (event) => {
    let endpoint = backendroot + "api/unit/";
    console.log(uploadedunitname)
    console.log(uploadedunitslogan)
    const data = {
      Unitname: uploadedunitname,
      Unitslogan: uploadedunitslogan,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      // The method is POST because we are sending data.
      method: "PUT",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("usercookie"),
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result["Unitname"]) {
      seterror1("");
      setsuccess1("성공. 초대코드: " + result["Unitname"]);
    } else {
      setsuccess1("");
      seterror1(result["message"]);
    }

  };
  let submitlogo = async (event) => {
    if (uploadedunitlogo == "none" || uploadedunitlogo.fileList.length == 0) {
      seterror2("사진이 없습니다.")

    } else {
      seterror2("데모에서 사진을 바꾸실 수 없습니다.")
      // const formData = new FormData();
      // formData.append("Logo", uploadedunitlogo.file);
      // const request = new XMLHttpRequest();
      // request.open("POST", "/updateunitlogo");
      // request.send(formData);
    }
  };

  return (
    <>
    <Head>
      <title>부대 설정</title>
    </Head>
      <div className={styles.background}>
        <div className={styles.formarea}>
          <div className={styles.formarea1}>
            <Form className={styles.changeunitinfo} onFinish={submitunitinfo}>
              <h1>부대정보 번경</h1>
              <h2>부대이름</h2>
              <Form.Item name="부대이름" rules={[{ required: true }]}>
                <Input
                  placeholder="부대이름 변경"
                  defaultValue={props2.Unitname}
                  allowClear
                  onChange={(event) => {
                    setuploadedunitname(event.target.value);
                  }}
                  name="Unitname"
                />
              </Form.Item>
              <h2>부대슬로건</h2>
              <Form.Item name="부대슬로건" rules={[{ required: true }]}>
                <TextArea
                  showCount
                  maxLength={50}
                  placeholder="부대슬로건 변경"
                  defaultValue={props2.Unitslogan}
                  allowClear
                  onChange={(event) => {
                    setuploadedunitslogan(event.target.value);
                  }}
                  name="Unitslogan"
                />
              </Form.Item>
              <Form.Item>
                <div style={{ display: "flex" }}>
                  <button className={styles.submitbutton} type="primary">
                    부대정보 변경
                  </button>
                  <p id={styles.error1}>{error1}</p>
                  <p id={styles.success1}>{success1}</p>
                </div>
              </Form.Item>
            </Form>
            <Form className={styles.changeunitlogo} onFinish={submitlogo}>
              <h1>부대마크 번경</h1>
              <div style={{ display: "flex" }}>
                <div className={styles.unitlogo}>
                  <Image
                    width={170}
                    src={unitlogo.src}
                    fallback="data:image/png;base64,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"
                  />
                </div>
                <div className={styles.uploadcontainer}>
                  <Upload.Dragger
                    name="Logo"
                    className={styles.changeunitlogoupload}
                    multiple={false}
                    maxCount="1"
                    onChange={(image) => setuploadedunitlogo(image)}
                  >
                    로고를 드레그 해주세요
                    <br></br>
                    <Button>Upload</Button>
                  </Upload.Dragger>
                  <Form.Item style = {{width: '180px'}}>
                    <button
                      className={styles.submitbutton}
                      style={{ margin: "auto", marginTop: "10px" }}
                      type="primary"
                    >
                      부대마크 변경
                    </button>
                    <p id={styles.error2}>{error2}</p>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
          <br></br>
          <div className={styles.formarea2}>
            <div className={styles.userlist}>
              <h1>군인 목록</h1>
              <div className={styles.userlistcontainer}>
              <List
                itemLayout="horizontal"
                dataSource={unitUsers}
                renderItem={item => (
                  <List.Item style = {{cursor: 'pointer'}}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.pic}/>}
                        title={Convertrank(item.Rank) + " " + item.Name}
                        description={'초대코드: ' + item.Invcode}/>
                  </List.Item>)}/>
              </div>
            </div>

            <Form className={styles.adduser} onFinish={submitnewuser}>
              <h1>군인 추가</h1>
              <h3>군번</h3>
              <Form.Item name="DoDID" rules={[{ required: true }]}>
                <Input
                  placeholder="21-xxxxxxx"
                  onChange={(event) => {
                    setDoDID(event.target.value);
                  }}
                />
              </Form.Item>
              <h3>계급</h3>
              <Form.Item
                name="rank"
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (
                        value == "title1" ||
                        value == "title2" ||
                        value == "title3" ||
                        value == "title4"
                      ) {
                        return Promise.reject("계급을 선택해 주세요");
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
              >
                <TreeSelect
                  style={{ width: "100%" }}
                  value={Rank}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  treeData={treeData1}
                  placeholder="계급 선택"
                  onChange={onChange1}
                />
              </Form.Item>
              <h3>이름</h3>
              <Form.Item name="name" rules={[{ required: true }]}>
                <Input
                  placeholder="이름"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Form.Item>
              <h3>계정종류</h3>
              <Form.Item name="type" rules={[{ required: true }]}>
                <TreeSelect
                  className={styles.input}
                  style={{ width: "100%" }}
                  value={Type}
                  dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                  treeData={treeData2}
                  placeholder="계정 종류"
                  onChange={onChange2}
                />
              </Form.Item>
              <h3>직책</h3>
              <Form.Item name="role" rules={[{ required: true }]}>
                <Input
                  placeholder="직책"
                  className={styles.input}
                  onChange={(event) => {
                    setPosition(event.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <div style={{ display: "flex" }}>
                  <button className={styles.submitbutton} type="primary">
                    군인 추가
                  </button>
                  <p id={styles.error3}>{error3}</p>
                  <p id={styles.success3}>{success3}</p>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // let ciphertext = await encryptuser('test133', 'hfipoawefjapoiwfhawpoeifjwf')
  // let decrypt = await decryptuser('test133', ciphertext)
  // console.log(decrypt)
  const backendroot = process.env.NEXT_PUBLIC_BACKEND_ROOT
  const endpoint = backendroot + 'api/user/id?search='
  const JWTtoken = context.req.cookies['usercookie'];
  const { id } = decodeJwt(JWTtoken)
  const options = {
      // The method is POST because we are sending data.
      method: 'GET',
      // Tell the server we're sending JSON.
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JWTtoken
      }
  }
  //Fetch data from external API
  const res = await fetch(endpoint + id, options)
  const data = await res.json()
  //Pass data to the page via props
  // console.log('hi')
  // console.log(data[0]['Unit'])

  if (data[0] && data[0]['Unit']) {
      let endpoint2 = backendroot + 'api/unit/get?search='
      const options = {
          // The method is POST because we are sending data.
          method: 'GET',
          // Tell the server we're sending JSON.
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + JWTtoken
          }
      }
      const res2 = await fetch(endpoint2 + data[0]['Unit'], options)
      const data2 = await res2.json()
      return { props: { data, data2 } }


  }

  return { props: { data } }
}



export default UnitSettings;
