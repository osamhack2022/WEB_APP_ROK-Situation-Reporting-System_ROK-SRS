import { useState, useCallback, useEffect } from 'react';
import { Modal, Image, Row, Col, Select } from 'antd';
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
      <div className={Styles.inputLabels}>{props.label}</div>
      <input className={Styles.formInput} value={props.value} onChange={props.onChange} />
    </div>
  )
}

function ParentSelectElement(props) {
  return (
    <div>
      <div className={Styles.inputLabels}>{props.label}</div>
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
  const ranks = ['이병', '일병', '상병', '병장', '하사', '중사', '상사', '준위', '소위', '중위', '대위', '소령', '중령', '대령']
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
      open={props.isOpen}
      onOk={() => {
        props.onSubmit(formData);
        props.onClose();
      }}
      onCancel={props.onClose}
    >
      <Row
        className={Styles.elementRow}
        align="middle"
      >
        <Col>
          <Image
            className={Styles.profileImage}
            src="https://images.pexels.com/photos/1202726/pexels-photo-1202726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Col>
        <Col className={Styles.userProfile}>
          <div>
            <input className={Styles.formInput} value={formData.Name} onChange={(event) => serializedEdit('name', event.target.value)} />
            <Select
              className={Styles.formSelect}
              value={formData.Rank}
              onChange={(value) => serializedEdit('rank', value)}
            >
              {
                rankOptions.map((option) => (
                  <Select.Option key={option.key} value={option.value}>
                    {option.value}
                  </Select.Option>
                ))
              }
            </Select>
          </div>
          <input className={Styles.formInput} value={formData.DoDID} onChange={(event) => serializedEdit('DoDID', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}><InfoElement label="부대" content={formData.Unit} /></Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}>
          <InputElement label="직책" value={formData.Position} onChange={(event) => serializedEdit('position', event.target.value)} />
        </Col>
        <Col span={12}>
          <InputElement label="이메일" value={formData.Email} onChange={(event) => serializedEdit('email', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}>
          <InputElement label="전화번호" value={formData.Number} onChange={(event) => serializedEdit('number', event.target.value)} />
        </Col>
        <Col span={12}>
          <InputElement label="군연락망" value={formData.MilNumber} onChange={(event) => serializedEdit('milNumber', event.target.value)} />
        </Col>
      </Row>
      <Row>
        <ParentSelectElement
          label="직속상관"
          value={formData.Parent}
          onChange={({ key }) => serializedEdit('parent', key)}
          selfKey={formData.key}
          nodeList={props.nodeList}
        />
      </Row>
    </Modal >
  )
}

export default OrganizationForm;
