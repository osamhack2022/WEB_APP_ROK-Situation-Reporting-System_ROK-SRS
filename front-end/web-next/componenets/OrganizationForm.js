import { useState, useCallback } from 'react';
import { Modal, Image, Row, Col, Select } from 'antd';
import Styles from '../styles/OrganizationCard.module.css';

function InputElement(props) {
  return (
    <div>
      <div className={Styles.infoLabel}>{props.label}</div>
      <input value={props.value} onChange={props.onChange} />
    </div>
  )
}

function OrganizationForm(props) {
  const [formData, setFormData] = useState(props.data);
  const serializedEdit = useCallback((key, value) => {
    setFormData(preData => Object.assign(preData, { [key]: value }))
  }, [setFormData]);
  
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
            <input className={Styles.userName} value={formData.name} onChange={(event) => serializedEdit('name', event.target.value)} />
            <input className={Styles.milRank} value={formData.rank} onChange={(event) => serializedEdit('rank', event.target.value)} />
          </div>
          <input className={Styles.userDodid} value={formData.DoDID} onChange={(event) => serializedEdit('DoDID', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}>
          <InputElement label="부대" value={formData.unit} onChange={(event) => serializedEdit('department', event.target.value)} />
        </Col>
        <Col span={12}>
          <InputElement label="직책" value={formData.position} onChange={(event) => serializedEdit('position', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}>
          <InputElement label="권한" value={formData.roles} onChange={(event) => serializedEdit('roles', event.target.value)} />
        </Col>
        <Col span={12}>
          <InputElement label="이메일" value={formData.email} onChange={(event) => serializedEdit('email', event.target.value)} />
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}>
          <InputElement label="전화번호" value={formData.number} onChange={(event) => serializedEdit('tel', event.target.value)} />
        </Col>
        <Col span={12}>
          <InputElement label="군연락망" value={formData.milNumber} onChange={(event) => serializedEdit('mTel', event.target.value)} />
        </Col>
      </Row>
      <Row>
        <div className={Styles.infoLabel}>{formData.parent}</div>
        <Select>
          {formData.keys}
        </Select>
      </Row>
    </Modal>
  )
}

export default OrganizationForm;
