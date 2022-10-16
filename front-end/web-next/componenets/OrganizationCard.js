import { useState } from 'react';
import { Modal, Button, Image, Row, Col } from 'antd';
import OrganizationForm from './OrganizationForm';
import Styles from '../styles/OrganizationCard.module.css'

function InfoElement(props) {
  return (
    <div>
      <div className={Styles.infoLabel}>{props.label}</div>
      <div className={Styles.infoContent}>{props.content}</div>
    </div>
  )
}

function OrganizationCard(props) {
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  return (
    <>
      <Modal
        open={props.isOpen}
        onCancel={props.onClose}
        footer={
          !props.isEditable
            ? null
            : (
              <div>
                <Button
                  onClick={() => {
                    setOpenCreateForm(true);
                    props.onClose();
                  }}
                >
                  추가하기
                </Button>
                <Button
                  onClick={() => {
                    setOpenUpdateForm(true);
                    props.onClose();
                  }}
                >
                  수정하기
                </Button>
                <Button
                  onClick={() => {
                    props.onRemove(props.data);
                    props.onClose();
                  }}
                >
                  삭제하기
                </Button>
              </div>
            )
        }
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
              <span className={Styles.userName}>{props.data.name}</span>
              <span className={Styles.milRank}>{props.data.rank}</span>
            </div>
            <div className={Styles.userDodid}>{props.data.DoDID}</div>
          </Col>
        </Row>
        <Row className={Styles.elementRow}>
          <Col span={12}><InfoElement label="부대" content={props.data.unit} /></Col>
          <Col span={12}><InfoElement label="직책" content={props.data.position} /></Col>
        </Row>
        <Row className={Styles.elementRow}>
          <Col span={12}><InfoElement label="권한" content={props.data.roles} /></Col>
          <Col span={12}><InfoElement label="이메일" content={props.data.email} /></Col>
        </Row>
        <Row className={Styles.elementRow}>
          <Col span={12}><InfoElement label="전화번호" content={props.data.number} /></Col>
          <Col span={12}><InfoElement label="군연락망" content={props.data.milNumber} /></Col>
        </Row>
      </Modal>
      <OrganizationForm
        isOpen={openCreateForm}
        onClose={() => setOpenCreateForm(false)}
        onSubmit={props.onCreate}
      />
      <OrganizationForm
        isOpen={openUpdateForm}
        onClose={() => setOpenUpdateForm(false)}
        onSubmit={props.onUpdate}
        data={props.data}
      />
    </>
  )
}

export default OrganizationCard;
