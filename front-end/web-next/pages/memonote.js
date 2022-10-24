import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'
import { Layout, Row, Col, List, Button, Input, Divider, Select, Spin } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { getCookie } from 'cookies-next';
import ReportLayout from '../componenets/MemoReport';
import MemoForm from '../componenets/MemoForm';
import Styles from '../styles/MemoLayout.module.css';

export default function Memo() {
  const [selectedItem, setSelection] = useState(undefined);
  const [memonoteType, setMemonoteType] = useState('받은 메모 보고');
  const [formOpened, setFormOpened] = useState(false);
  const [memoRenderList, setMemoRenderList] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/report/', {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      }
    })
      .then(response => response.json())
      .then(data => setMemoRenderList(data));
  }, []);

  const koreanTimeFormat = useCallback((UTCdate) => {
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const krDate = new Date(new Date(UTCdate) + KR_TIME_DIFF);
    return (
      '' + krDate.getFullYear() + '/' + (krDate.getMonth() + 1) + '/' + krDate.getDate()
      + ' ' + (krDate.getHours() < 10 ? '0' + krDate.getHours() : krDate.getHours())
      + ':' + (krDate.getMinutes() < 10 ? '0' + krDate.getMinutes() : krDate.getMinutes())
    )
  }, []);

  function Header(props) {
    return (
      <div>
        <p className={Styles.headerTitle}>
          {props.title}
          {props.status === 'Unresolved' ? ' [미종결]' : ' [종결]'}
        </p>
        <div className={Styles.headerType}>
          <Row
            justify='end'
            gutter={12}
          >
            <Col>종류: {props.type}</Col>
            <Col>중요도: {props.level}</Col>
            <Col>{props.datetime}</Col>
          </Row>
        </div>
      </div>
    )
  }

  function Footer(props) {
    return (
      <p className={Styles.footer}>
        보고 체계: {props.reportingSystem}
      </p>
    )
  }

  return (
    <>
      <Head>
        <title>메모 보고</title>
      </Head>
      {
        memoRenderList.length === 0
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
            <Layout className={Styles.mainLayout}>
              <Layout.Sider
                className={Styles.siderLayout}
                width={400}
              >
                <div className={Styles.siderMenu}>
                  <div className={Styles.siderHeader}>
                    <Row
                      align="middle"
                      justify="space-between"
                    >
                      <Col>
                        <div className="memonoteSiderTitle">
                          <Select
                            popupClassName={Styles.siderTitle}
                            bordered={false}
                            value={memonoteType}
                            onChange={(value) => setMemonoteType(value)}
                          >
                            <Select.Option value="receiveMemo">받은 메모 보고</Select.Option>
                            <Select.Option value="sendMemo">보낸 메모 보고</Select.Option>
                          </Select>
                        </div>
                      </Col>
                      <Col>
                        <Button
                          className={Styles.formButton}
                          shape="circle"
                          icon={<FormOutlined />}
                          onClick={() => setFormOpened(true)}
                        />
                      </Col>
                    </Row>
                    <Input.Search className={Styles.menuSearcher} />
                  </div>
                  <Divider className={Styles.bottomDivider} />
                  <div className={Styles.scrollableDiv}>
                    <List
                      itemLayout="horizontal"
                      dataSource={memoRenderList}
                      renderItem={(item, index) => (
                        <div>
                          <Button
                            className={Styles.siderMenuButton}
                            type="link"
                            onClick={() => setSelection(index)}
                          >
                            <div className={Styles.siderMenuTitle}>
                              {item.Title}
                              {item.Status === 'Unresolved' ? ' [미종결]' : ' [종결]'}
                            </div>
                            <div className={Styles.siderMenuContent}>
                              {item.Content}
                            </div>
                            <Row
                              className={Styles.siderMenuFooter}
                              gutter={10}
                              justify="end"
                            >
                              <Col>중요도: {item.Severity}</Col>
                              <Col>{koreanTimeFormat(item.createdAt)}</Col>
                            </Row>
                          </Button>
                          <Divider className={Styles.bottomDivider} />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </Layout.Sider>
              <Layout.Content className={Styles.contentLayout}>
                {
                  selectedItem !== undefined &&
                  <div className={Styles.contentMenu}>
                    <ReportLayout
                      header={
                        <Header
                          title={memoRenderList[selectedItem].Title}
                          type={memoRenderList[selectedItem].Type}
                          level={memoRenderList[selectedItem].Severity}
                          datetime={koreanTimeFormat(memoRenderList[selectedItem].createdAt)}
                          status={memoRenderList[selectedItem].Status}
                        />
                      }
                      footer={
                        <Footer reportingSystem={memoRenderList[selectedItem].ReportingSystem} />
                      }
                      height="710px"
                      name={memoRenderList[selectedItem].User?.Name}
                      position={memoRenderList[selectedItem].User?.Position}
                      memo={memoRenderList[selectedItem].Content}
                      datetime={koreanTimeFormat(memoRenderList[selectedItem].createdAt)}
                      comment={memoRenderList[selectedItem].Comment}
                    />
                  </div>
                }
              </Layout.Content>
            </Layout>
          )
      }
      <MemoForm
        isOpen={formOpened}
        onSubmitted={() => setFormOpened(false)}
        onCancel={() => setFormOpened(false)}
      />
    </>
  )
}
