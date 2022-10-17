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
                      <p id = {styles.error1}>{error1}fds</p>
                      <p id = {styles.success1}>{success1}</p>

                  </div>
              </Form.Item>
          </Form>
          </div>

          <div className =  {styles.userimagechange}>


          </div>


        </div>


        
        
    </>
}

export default Settings; 