import { useState, useCallback, useEffect } from 'react';
import { Modal, Image, Row, Col, Input, Select } from 'antd';
import Styles from '../styles/OrganizationForm.module.css';

function InfoElement(props) {
  return (
    <div>
      <div className={Styles.infoLabel}>{props.label}</div>
      <div className={Styles.infoContent}>{props.content}</div>
    </div>
  )
}

function InputElement(props) {
  return (
    <div>
      <div className={Styles.infoLabel}>{props.label}</div>
      <Input style={{ width: '180px', height: '32px' }} value={props.value} onChange={props.onChange} />
    </div>
  )
}

function ParentSelectElement(props) {
  return (
    <div>
      <div className={Styles.infoLabel}>{props.label}</div>
      <Select
        className={Styles.parentSelect}
        labelInValue
        value={props.nodeList.find(((node) => node.key === props.value))}
        onChange={props.onChange}
      >
        {
          props.nodeList &&
          props.nodeList.map((option) => (
            props.selfKey != option.key &&
            <Select.Option key={option.key} value={option.value}>
              {option.value}
            </Select.Option>
          ))
        }
      </Select>
    </div>
  )
}

function OrganizationForm(props) {
  const ranks = ['이병', '일병', '상병', '병장', '하사', '중사', '상사', '원사', '준위', '소위', '중위', '대위', '소령', '중령', '대령']
  const rankOptions = ranks.map((rank, index) => ({ 'key': index, 'value': rank }))

  const [formData, setFormData] = useState({});
  const serializedEdit = useCallback((key, value) => {
    setFormData(preData => ({ ...preData, [key]: value }))
  }, [setFormData]);

  useEffect(() => {
    if (props.isOpen && props.data)
      setFormData({ ...props.data });
  }, [props.isOpen, props.data])

  return (
    <Modal
      className="organizationForm"
      open={props.isOpen}
      okText="저장"
      cancelText="취소"
      onOk={() => {
        props.onSubmit(formData);
        props.onClose();
      }}
      onCancel={props.onClose}
    >
      <Row
        className={Styles.elementRow}
        align="middle"
        justify="center"
      >
        <Col>
          <Image
            className={Styles.profileImage}
            src="https://camo.githubusercontent.com/3c2bd3f35721dc332ebf2b11ace89722c37a0f60b94eac42b2a0462fdeb2d420/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3531322f363134322f363134323232362e706e67"
            fallback="https://camo.githubusercontent.com/3c2bd3f35721dc332ebf2b11ace89722c37a0f60b94eac42b2a0462fdeb2d420/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3531322f363134322f363134323232362e706e67"
          />
        </Col>
      </Row>
      <Row
        className={Styles.elementRow}
        align="middle"
        justify="center"
      >
        <Col className={Styles.userProfile}>
          <Input.Group compact>
            <Input
              style={{ width: '130px', height: '32px' }}
              value={formData.Name}
              onChange={(event) => serializedEdit('Name', event.target.value)}
            />
            <Select
              className={Styles.formSelect}
              value={formData.Rank}
              onChange={(value) => serializedEdit('Rank', value)}
            >
              {
                rankOptions.map((option) => (
                  <Select.Option key={option.key} value={option.value}>
                    {option.value}
                  </Select.Option>
                ))
              }
            </Select>
          </Input.Group>
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}><InfoElement label="부대" content={formData.Unit} /></Col>
        <Col span={12}>
          <InputElement label="군번" value={formData.DoDID} onChange={(event) => serializedEdit('DoDID', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}>
          <InputElement label="직책" value={formData.Position} onChange={(event) => serializedEdit('Position', event.target.value)} />
        </Col>
        <Col span={12}>
          <InputElement label="이메일" value={formData.Email} onChange={(event) => serializedEdit('Email', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}>
          <InputElement label="전화번호" value={formData.Number} onChange={(event) => serializedEdit('Number', event.target.value)} />
        </Col>
        <Col span={12}>
          <InputElement label="군연락망" value={formData.MilNumber} onChange={(event) => serializedEdit('MilNumber', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <ParentSelectElement
          label="직속상관"
          value={formData.Parent}
          onChange={({ key }) => serializedEdit('Parent', key === 'null' ? null : key)}
          selfKey={formData._id}
          nodeList={[{ 'key': null, 'value': '없음' }, ...props.nodeList]}
        />
      </Row>
    </Modal >
  )
}

export default OrganizationForm;
