import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head'
import { Layout, Row, Col, List, Button, Input, Divider, Select, Spin } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { getCookie } from 'cookies-next';
import ReportLayout from '../componenets/MemoReport';
import MemoForm from '../componenets/MemoForm';
import koreanTimeFormat from '../helperfunction/koreanDateFormat';
import Styles from '../styles/MemoLayout.module.css';

export default function Memo() {
  const [selectedItem, setSelection] = useState(undefined);
  const [memonoteType, setMemonoteType] = useState('receiveMemo');
  const [memoFilter, setMemoFilter] = useState('');
  const [formOpened, setFormOpened] = useState(false);
  const [memoRenderList, setMemoRenderList] = useState([]);
  const [isMemoLoaded, setMemoLoaded] = useState(false);

  useEffect(() => {
    setMemoRenderList([]);
    setMemoLoaded(false);
    setSelection(undefined);
    if (memonoteType === 'receiveMemo') {
      fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/report?receiver=true', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('usercookie')}`
        }
      })
        .then(response => {
          if (response.status == 200) {
            setMemoLoaded(true);
            return response.json();
          }
        })
        .then(data => setMemoRenderList(data));
    }
    else if (memonoteType === 'sendMemo') {
      fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/report?sender=true', {
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('usercookie')}`
        }
      })
        .then(response => {
          if (response.status == 200) {
            setMemoLoaded(true);
            return response.json();
          }
        })
        .then(data => setMemoRenderList(data));
    }
  }, [memonoteType, setMemoRenderList, setMemoLoaded, setSelection]);

  const selectStyle = useCallback((isSelected) => {
    return (isSelected ? ({ backgroundColor: '#ccc' }) : ({}))
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
            <Col>{koreanTimeFormat(props.datetime)}</Col>
          </Row>
        </div>
      </div>
    )
  }

  function Footer(props) {
    const reportSystem = props.reportingSystem.map((system) => (system.Title));
    return (
      <p className={Styles.footer}>
        보고 체계: {reportSystem ? reportSystem.join(', ') : '추가 보고'}
      </p>
    )
  }

  return (
    <>
      <Head>
        <title>메모 보고</title>
      </Head>
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
                      defaultValue={'받은 메모 보고'}
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
              <Input.Search
                className={Styles.menuSearcher}
                onSearch={setMemoFilter}
              />
            </div>
            <Divider className={Styles.bottomDivider} />
            <div className={Styles.scrollableDiv}>
              <List
                itemLayout="horizontal"
                dataSource={memoRenderList.filter((list) => (list.Title.includes(memoFilter) || list.Content.includes(memoFilter)))}
                renderItem={(item, index) => (
                  <div key={index}>
                    <Button
                      className={Styles.siderMenuButton}
                      style={selectStyle(index == selectedItem)}
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
            !isMemoLoaded
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
                memoRenderList.length === 0
                  ? (
                    <Row
                      className={Styles.spinSkeleton}
                      align="middle"
                      justify="center"
                    >
                      <Col>
                        <p className={Styles.failedText}>
                          현재 {(memonoteType === 'sendMemo') ? '보낸' : '받은'} 메모가 없습니다.
                        </p>
                      </Col>
                    </Row>
                  )
                  : (
                    selectedItem !== undefined &&
                    <div className={Styles.contentMenu}>
                      <ReportLayout
                        header={
                          <Header
                            title={memoRenderList[selectedItem].Title}
                            type={memoRenderList[selectedItem].Type}
                            level={memoRenderList[selectedItem].Severity}
                            datetime={memoRenderList[selectedItem].createdAt}
                            status={memoRenderList[selectedItem].Status}
                          />
                        }
                        footer={
                          <Footer reportingSystem={memoRenderList[selectedItem].ReportingSystem} />
                        }
                        height="710px"
                        id={memoRenderList[selectedItem]._id}
                        pic={memoRenderList[selectedItem].User?.pic}
                        name={memoRenderList[selectedItem].User?.Name}
                        rank={memoRenderList[selectedItem].User?.Rank}
                        position={memoRenderList[selectedItem].User?.Position}
                        memo={memoRenderList[selectedItem].Content}
                        datetime={memoRenderList[selectedItem].createdAt}
                        comment={memoRenderList[selectedItem].Comments}
                      />
                    </div>
                  )
              )
          }
        </Layout.Content>
      </Layout>
      <MemoForm
        isOpen={formOpened}
        onSubmitted={() => setFormOpened(false)}
        onCancel={() => setFormOpened(false)}
      />
    </>
  )
}
