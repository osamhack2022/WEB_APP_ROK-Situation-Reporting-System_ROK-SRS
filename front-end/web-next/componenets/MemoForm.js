import { Modal, Input, Select, Mentions } from "antd";
import styles from '../styles/MemoForm.module.css';

function MemoForm(props) {
  return (
    <Modal open={props.isOpen}>
      <div className={styles.formElement}>
        <p className={styles.formLabel}>제목</p>
        <Input className={styles.formTitleInput} />
      </div>
      <div className={styles.formElement}>
        <p className={styles.formLabel}>보고 종류</p>
        <Select className={styles.formTypeInput}>
          <Select.Option>보고사항</Select.Option>
          <Select.Option>지시사항</Select.Option>
          <Select.Option>긴급사항</Select.Option>
        </Select>
      </div>
      <div className={styles.formElement}>
        <p className={styles.formLabel}>보고 체계</p>
        <Mentions className={styles.formOrgInput} prefix="">
          <Mentions.Option>당직계통</Mentions.Option>
          <Mentions.Option>3중대</Mentions.Option>
        </Mentions>
      </div>
      <div className={styles.formElement}>
        <p className={styles.formLabel}>보고 인원</p>
      </div>
      <div className={styles.formElement}>
        <p className={styles.formLabel}>추가 인원</p>
        <Mentions className={styles.formAdditionInput} prefix="">
          <Mentions.Option>대위 가나다</Mentions.Option>
          <Mentions.Option>중위 나다라</Mentions.Option>
          <Mentions.Option>소위 다라마</Mentions.Option>
        </Mentions>
      </div>
      <div className={styles.formElement}>
        <p className={styles.formLabel}>내용</p>
        <Input.TextArea className={styles.formContentInput} />
      </div>
    </Modal>
  )
}

export default MemoForm;