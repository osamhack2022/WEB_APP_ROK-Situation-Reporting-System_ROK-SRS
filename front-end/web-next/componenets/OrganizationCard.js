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
      <Row>
        <Col>
          <Image
            className={Styles.profileImage}
            preview={false}
            src="https://joeschmoe.io/api/v1/random"
          />
        </Col>
        <Col>
          <div>
            <span className={Styles.milRank}>{props.rank}</span>
            <span className={Styles.userName}>{props.name}</span>
          </div>
          <InfoElement label="군번" content={props.DoDID} />
        </Col>
      </Row>
      <Row>
        <Col><InfoElement label="부서" content={props.department} /></Col>
        <Col><InfoElement label="직책" content={props.position} /></Col>
      </Row>
      <Row>
        <Col><InfoElement label="권한" content={props.roles} /></Col>
        <Col><InfoElement label="이메일" content={props.email} /></Col>
      </Row>
      <Row>
        <Col><InfoElement label="전화번호" content={props.tel} /></Col>
        <Col><InfoElement label="군연락망" content={props.mTel} /></Col>
      </Row>
    </Modal>
  )
}

export default OrgCard;