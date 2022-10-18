
import { Avatar, List, Skeleton, Button, Input, Upload, Image, TreeSelect, Form, PageHeader, Breadcrumb } from 'antd';
import styles from '../../styles/unitsettings.module.css'
import unitlogo from '../../img/unitlogo.png'
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';


const { TextArea } = Input;
const backendroot = process.env.NEXT_PUBLIC_BACKEND_ROOT

const treeData1 = [
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

const treeData2 = [
    {
        title: '용사',
        value: 'soldier',
    },
    {
        title: '지휘자',
        value: 'leader',
    }

];




const UnitSettings = () => {
    const [uploadedunitlogo, setuploadedunitlogo] = useState("none")
    const [uploadedunitname, setuploadedunitname] = useState("none")
    const [uploadedunitslogan, setuploadedunitslogan] = useState("none")




    //user loading function
    const count = 4;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);
    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 30,
                    lineHeight: '30px',
                }}
            >
                <Button onClick={onLoadMore}>더 보기</Button>
            </div>
        ) : null;

    //Submit NewUser
    const [DoDID, setDoDID] = useState();
    //TreeData1
    const [Rank, setRank] = useState();
    const onChange1 = (newValue) => {
        if (newValue == 'title1' || newValue == 'title2' || newValue == 'title3' || newValue == 'title4') {
            setRank();
            return
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
        let endpoint = backendroot + 'api/user/add'
        const data = {
            DoDID: DoDID,
            Name: Name,
            Rank: Rank,
            Type: Type,
        }
        const JSONdata = JSON.stringify(data)
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('usercookie')
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(result)
        if (result['Invcode']) {
            seterror3("")
            setsuccess3("성공. 초대코드: " + result['Invcode'])
        } else {
            setsuccess3("")
            seterror3(result['message'])
        }
        console.log(result)
    }



    let submitunitinfo = async event => {
        console.log(uploadedunitname)
        console.log(uploadedunitslogan)

    }
    let submitlogo = async event => {
        console.log(event.target)
        console.log(uploadedunitlogo)
        if (uploadedunitlogo == "none" || uploadedunitlogo.fileList.length == 0) {
            console.log("no file")
        } else {
            const formData = new FormData();
            formData.append('Logo', uploadedunitlogo.file)
            const request = new XMLHttpRequest();
            request.open("POST", "/updateunitlogo");
            request.send(formData);
        }
    }


    return <>
        <div className={styles.background}>
        <PageHeader className="site-page-header" title="부대설정"
            breadcrumb={  
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href = "/settings">계정설정</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item style = {{color: 'black', cursor: 'pointer'}}>부대설정</Breadcrumb.Item>
                <Breadcrumb.Item className = {styles.lastitem}>
                  <a href="settings/reportsystem">보고체계 설정</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a style = {{display: 'none'}}>hi</a>
                </Breadcrumb.Item>
              </Breadcrumb> } style={{backgroundColor: "white",  boxShadow: 'inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3)'}}/>            <div className={styles.formarea}>
                <div className={styles.formarea1}>
                    <Form className={styles.changeunitinfo} onFinish={submitunitinfo}>
                        <h1>부대정보 번경</h1>
                        <h2>부대이름</h2>
                        <Form.Item name="부대이름" rules={[{ required: true }]}>
                            <Input placeholder="부대이름 변경" allowClear onChange={(event) => { setuploadedunitname(event.target.value) }} name="Unitname" />
                        </Form.Item>
                        <h2>부대슬로건</h2>
                        <Form.Item name="부대슬로건" rules={[{ required: true }]}>
                            <TextArea showCount maxLength={50} placeholder="부대슬로건 변경" allowClear onChange={(event) => { setuploadedunitslogan(event.target.value) }} name="Unitslogan" />
                        </Form.Item>
                        <Form.Item>
                            <div style = {{display: 'flex'}}>
                                <button className={styles.submitbutton} type="primary">부대정보 변경</button>
                                <p id = {styles.error1}>Error Message 1</p>
                            </div>
                        </Form.Item>

                    </Form>
                    <Form className={styles.changeunitlogo} onFinish={submitlogo}>
                        <h1>부대마크 번경</h1>
                        <div style={{ display: 'flex' }}>
                            <div className={styles.unitlogo}>
                                <Image width={170} src={unitlogo.src} fallback="data:image/png;base64,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" />
                            </div>
                            <div className={styles.uploadcontainer}>
                                <Upload.Dragger name="Logo" className={styles.changeunitlogoupload} multiple={false} maxCount="1" onChange={(image) => setuploadedunitlogo(image)}>
                                    로고를 드레그 해주세요
                                    <br></br>
                                    <Button>Upload</Button>
                                </Upload.Dragger>
                                <Form.Item>
                                    <button className={styles.submitbutton} style = {{margin: 'auto', marginTop: '10px'}} type="primary">부대마크 변경</button>
                                    <p id = {styles.error2}>Error Message 2</p>
                                </Form.Item>
                            </div>

                        </div>
                    </Form>
                </div>
                <br></br>
                <div className={styles.formarea2}>
                    <div className={styles.userlist}>
                        <h1>유저 목록</h1>
                        <div className={styles.userlistcontainer}>

                            <List
                                className="demo-loadmore-list"
                                loading={initLoading}
                                itemLayout="horizontal"
                                loadMore={loadMore}
                                dataSource={list}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[<a key="list-loadmore-edit">delete</a>]}
                                    >
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.picture.large} />}
                                                title={<p>{item.name?.last}</p>}
                                                description="통신운용장교"
                                            />
                                            <div>content</div>
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>

                        
                    <Form className={styles.adduser} onFinish = {submitnewuser}>
                        <h1>유저 추가</h1>
                        <h3>군번</h3>
                        <Form.Item name="DoDID" rules={[{ required: true }]}>
                            <Input placeholder="21-xxxxxxx" onChange={(event) => { setDoDID(event.target.value) }} />
                        </Form.Item>
                        <h3>계급</h3>
                        <Form.Item name="rank" rules={[{ required: true }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (value == 'title1' || value == 'title2' || value == 'title3' || value == 'title4') {
                                    return Promise.reject('계급을 선택해 주세요')
                                } else {
                                    return Promise.resolve()
                                }
                            }
                        })]}>
                            <TreeSelect style={{ width: '100%' }} value={Rank} dropdownStyle={{ maxHeight: 400, overflow: 'auto', }} treeData={treeData1} placeholder="계급 선택" onChange={onChange1} />
                        </Form.Item>
                        <h3>이름</h3>
                        <Form.Item name="name" rules={[{ required: true }]}>
                            <Input placeholder="이름" onChange={(event) => { setName(event.target.value) }} />
                        </Form.Item>
                        <h3>계정종류</h3>
                        <Form.Item name="type" rules={[{ required: true }]}>
                            <TreeSelect className={styles.input} style={{ width: '100%' }} value={Type} dropdownStyle={{ maxHeight: 400, overflow: 'auto', }} treeData={treeData2} placeholder="계정 종류" onChange={onChange2} />
                        </Form.Item>
                        <h3>직책</h3>
                        <Form.Item name="role" rules={[{ required: true }]}>
                            <Input placeholder="직책" className={styles.input} onChange={(event) => { setPosition(event.target.value) }} />
                        </Form.Item>
                        <Form.Item>
                            <div style = {{display:'flex'}}>
                                <button className={styles.submitbutton} type="primary">군인 추가</button>
                                <p id = {styles.error3}>{error3}</p>
                                <p id = {styles.success3}>{success3}</p>

                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>

    </>
}

export default UnitSettings; 