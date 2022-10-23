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
        className="organizationCard"
        open={props.isOpen}
        onCancel={props.onClose}
        footer={
          !props.isEditable
            ? null
            : (
              <div>
                <Button
                  type="primary"
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
                  danger
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
          justify="center"
        >
          <Col>
            <Image
              className={Styles.profileImage}
              src={props.data.Avatar}
              fallback="https://images.pexels.com/photos/1202726/pexels-photo-1202726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Col>
        </Row>
        <Row
          className={Styles.elementRow}
          align="middle"
          justify="center"
        >
          <Col className={Styles.userProfile}>
            <div>
              <span className={Styles.userName}>{props.data.Name}</span>
              <span className={Styles.milRank}>{props.data.Rank}</span>
            </div>
          </Col>
        </Row>
        <Row className={Styles.elementRow}>
          <Col span={12}><InfoElement label="부대" content={props.data.Unit} /></Col>
          <Col span={12}><InfoElement label="군번" content={props.data.DoDID} /></Col>
        </Row>
        <Row className={Styles.elementRow}>
          <Col span={12}><InfoElement label="직책" content={props.data.Position} /></Col>
          <Col span={12}><InfoElement label="이메일" content={props.data.Email} /></Col>
        </Row>
        <Row className={Styles.elementRow}>
          <Col span={12}><InfoElement label="전화번호" content={props.data.Number} /></Col>
          <Col span={12}><InfoElement label="군연락망" content={props.data.MilNumber} /></Col>
        </Row>
      </Modal>
      <OrganizationForm
        isOpen={openCreateForm}
        onClose={() => setOpenCreateForm(false)}
        data={{ Unit: props.data.Unit }}
        onSubmit={props.onCreate}
        nodeList={props.nodeList}
      />
      <OrganizationForm
        isOpen={openUpdateForm}
        onClose={() => setOpenUpdateForm(false)}
        data={props.data}
        onSubmit={props.onUpdate}
        nodeList={props.nodeList}
      />
    </>
  )
}

export default OrganizationCard;
