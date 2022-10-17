import Head from 'next/head'
import Link from "next/link"
import MenuBar from '../componenets/menubar'
import RegisterHeader from '../componenets/registerheader';
import { Avatar, Divider, List, Skeleton, Button, Input, Radio, message, Upload, Image, TreeSelect, Form, PageHeader, Breadcrumb } from 'antd';
import styles from '../styles/usersettings.module.css'
import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router"
const RankData = [
  {
      title: '병사',
      value: 'title1',
      children: [{ title: '이병', value: 'PVT', }, { title: '일병', value: 'PFC', }, { title: '상병', value: 'CPL', }, { title: '병장', value: 'SGT', }]
  },
  {
      title: '부사관',
      value: 'title2',
      children: [{ title: '하사', value: 'SST', }, { title: '중사', value: 'SFC', }, { title: '상사', value: 'MST', }, { title: '원사', value: 'SGM', }]
  },
  {
      title: '장교',
      value: 'title3',
      children: [{ title: '소위', value: 'SECLIU', }, { title: '중위', value: 'LIU', }, { title: '대위', value: 'CPT', }, { title: '소령', value: 'MAJ', }, { title: '중령', value: 'LTC', }, { title: '대령', value: 'COL', }]
  },
  {
      title: '장군',
      value: 'title4',
      children: [{ title: '준장', value: 'BG', }, { title: '소장', value: 'MG', }, { title: '중장', value: 'LG', }, { title: '대장', value: 'GEN', }]
  }
];
let submitnewuser = async (event) => {
  console.log('hi')
}

let submituserimg = async (event) => {
    console.log('hi')
  }
  


const Settings = () => {
  //TreeData1
    const [DoDID, setDoDID] = useState();
    const [Rank, setRank] = useState();
    const [Position, setPosition] = useState();
    const [Armymail, setArmymail] = useState();
    const [Armyphone, setArmyphone] = useState();
    const [Phone, setPhone] = useState();
    const [error1, seterror1] = useState();
    const [success1, setsuccess1] = useState();

    const onChange1 = (newValue) => {
        if (newValue == 'title1' || newValue == 'title2' || newValue == 'title3' || newValue == 'title4') {
            setRank();
            return
        } else {
            setRank(newValue);
        }
    };
    return <>
    <Head>
      <title>유저 설정</title>
    </Head>
      <PageHeader className="site-page-header" title="계정설정"
      breadcrumb={  
      <Breadcrumb>
          <Breadcrumb.Item style = {{color: 'black', cursor: 'pointer'}}>계정설정</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="settings/unit">부대설정</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="settings/reportsystem">보고체계 설정</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
              <a style = {{display: 'none'}}>hi</a>
          </Breadcrumb.Item>
        </Breadcrumb> } style={{backgroundColor: "white",  boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)'}}/>

        <div style = {{display: 'flex'}}>
          <div className = {styles.userdatachange}>
            <Form className={styles.adduser} onFinish = {submitnewuser} style = {{width: '600px', marginTop: '20px'}}>
              <h1 style = {{fontWeight: 'bold'}}>군인정보 수정</h1>
              <h3 className = {styles.userheader}>군번</h3>
              <Form.Item name="DoDID" rules={[{ required: true }]}>
                  <Input placeholder="21-xxxxxxx" onChange={(event) => { setDoDID(event.target.value) }} />
              </Form.Item>
              <h3 className = {styles.userheader}>계급</h3>
              <Form.Item name="rank" rules={[{ required: true }, ({ getFieldValue }) => ({
                  validator(_, value) {
                      if (value == 'title1' || value == 'title2' || value == 'title3' || value == 'title4') {
                          return Promise.reject('계급을 선택해 주세요')
                      } else {
                          return Promise.resolve()
                      }
                  }
              })]}>
                  <TreeSelect style={{ width: '100%' }} value={Rank} dropdownStyle={{ maxHeight: 400, overflow: 'auto', }} treeData={RankData} placeholder="계급 선택" onChange={onChange1} />
              </Form.Item>
              <h3 className = {styles.userheader}>직책</h3>
              <Form.Item name="role" rules={[{ required: true }]}>
                  <Input placeholder="직책" className={styles.input} onChange={(event) => { setPosition(event.target.value) }} />
              </Form.Item>
              <h3 className = {styles.userheader}>군메일</h3>
              <Form.Item name="armymail" rules={[{  }]}>
                  <Input placeholder="군메일" type = "email" className={styles.input} onChange={(event) => { setArmymail(event.target.value) }} />
              </Form.Item>
              <h3 className = {styles.userheader}>(군)전화번호</h3>
              <Form.Item name="armyphone" rules={[{  }]}>
                  <Input placeholder="(군)전화번호" className={styles.input} onChange={(event) => { setArmyphone(event.target.value) }} />
              </Form.Item>
              <h3 className = {styles.userheader}>휴대폰번호</h3>
              <Form.Item name="mphone" rules={[{  }]}>
                  <Input placeholder="휴대폰번호" className={styles.input} onChange={(event) => { setPhone(event.target.value) }} />
              </Form.Item>
              <Form.Item>
                  <div style = {{display:'flex'}}>
                      <button className={styles.submitbutton} type="primary">군인정보 수정</button>
                      <p id = {styles.error1}>{error1}fd</p>
                      <p id = {styles.success1}>{success1}</p>

                  </div>
              </Form.Item>
          </Form>
          </div>

          <div className =  {styles.userimagechange}>
            <Form className={styles.userimagechangeform} onFinish={submituserimg}>
                <h1 style = {{textAlign: 'center', marginTop: '15px', fontWeight: 'bold'}}>프로필 사진 번경</h1>
                <div>
                    <div className={styles.unitlogo}>
                        <Image width={170} src="https://camo.githubusercontent.com/3c2bd3f35721dc332ebf2b11ace89722c37a0f60b94eac42b2a0462fdeb2d420/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3531322f363134322f363134323232362e706e67" fallback="data:image/png;base64,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" />
                    </div>
                    <div className={styles.uploadcontainer}>
                        <Upload.Dragger name="Logo" className={styles.changeunitlogoupload} multiple={false} maxCount="1" onChange={(image) => setuploadedunitlogo(image)}>
                            사진을 드레그 해주세요
                            <br></br>
                            <Button>Upload</Button>
                        </Upload.Dragger>
                        <Form.Item>
                            <button className={styles.submitbutton} style = {{margin: 'auto', marginTop: '10px'}} type="primary">프로필사진 변경</button>
                            <p id = {styles.error2}>error</p>
                            <p id = {styles.success2}></p>

                        </Form.Item>
                    </div>

                </div>
            </Form>

          </div>


        </div>


        
        
    </>
}

export default Settings; 