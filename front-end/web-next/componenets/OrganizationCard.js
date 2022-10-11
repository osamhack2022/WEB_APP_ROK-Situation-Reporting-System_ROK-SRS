import { Modal, Button, Image, Row, Col } from 'antd';
import Styles from '../styles/OrganizationCard.module.css'

function InfoElement(props) {
  return (
    <div>
      <div className={Styles.infoLabel}>{props.label}</div>
      <div className={Styles.infoContent}>{props.content}</div>
    </div>
  )
}

function OrgCard(props) {
  return (
    <Modal
      open={props.isOpen}
      onCancel={props.onClose}
      footer={null}
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
            <span className={Styles.userName}>{props.name}</span>
            <span className={Styles.milRank}>{props.rank}</span>
          </div>
          <div className={Styles.userDodid}>{props.DoDID}</div>
        </Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}><InfoElement label="부서" content={props.department} /></Col>
        <Col span={12}><InfoElement label="직책" content={props.position} /></Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}><InfoElement label="권한" content={props.roles} /></Col>
        <Col span={12}><InfoElement label="이메일" content={props.email} /></Col>
      </Row>
      <Row className={Styles.elementRow}>
        <Col span={12}><InfoElement label="전화번호" content={props.tel} /></Col>
        <Col span={12}><InfoElement label="군연락망" content={props.mTel} /></Col>
      </Row>
    </Modal>
  )
}

export default OrgCard;