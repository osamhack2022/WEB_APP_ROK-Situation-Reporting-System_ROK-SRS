import { Modal, Input, Select } from "antd";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styles from '../styles/MemoForm.module.css';

function MemoForm(props) {
  const orgType = [
    {
      id: 0,
      name: '당직체계'
    },
    {
      id: 1,
      name: '3중대'
    }
  ]

  const additionPerson = [
    {
      id: 0,
      name: '대위 가나다'
    },
    {
      id: 1,
      name: '중위 나다라'
    },
    {
      id: 2,
      name: '소위 라마바'
    }
  ]

  return (
    <Modal
      open={props.isOpen}
    >
      <div className={styles.formLayout}>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>제목</p>
          <input className={styles.formTitleInput} />
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>보고 종류</p>
          <select className={styles.formTypeInput}>
            <option>보고사항</option>
            <option>지시사항</option>
            <option>긴급사항</option>
          </select>
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>보고 체계</p>
          <ReactSearchAutocomplete
            styling={styling.formOrgInput}
            showIcon={false}
            showClear={false}
            items={orgType}
          />
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>보고 인원 </p>
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>추가 인원</p>
          <ReactSearchAutocomplete
            styling={styling.formAdditionInput}
            showIcon={false}
            showClear={false}
            items={additionPerson}
          />
        </div>
        <div className={styles.formElement}>
          <p className={styles.formLabel}>내용</p>
          {/* <Input.TextArea className={styles.formContentInput} /> */}
          <textarea className={styles.formContentInput}></textarea>
        </div>
      </div>
    </Modal>
  )
}

export default MemoForm;

const styling = {
  formOrgInput: {
    width: '100%',
    height: '40px',
    padding: '0 10px',
    backgroundColor: '#d1d1d1',
    hoverBackgroundColor: '#d1d1d1',
    lineColor: '#000',
    border: 0,
    borderRadius: '10px',
    fontSize: '14px',
  },
  formAdditionInput: {
    width: '100%',
    height: '40px',
    padding: '0 10px',
    backgroundColor: '#d1d1d1',
    hoverBackgroundColor: '#d1d1d1',
    lineColor: '#000',
    border: 0,
    borderRadius: '10px',
    fontSize: '14px',
  }
}