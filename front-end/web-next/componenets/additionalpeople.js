import { useState, useCallback } from 'react';
import { Modal, Select, Button, Avatar, Row, Col } from 'antd';
import { PlusOutlined, ArrowRightOutlined, CloseOutlined } from '@ant-design/icons'
import { getCookie } from 'cookies-next';
import {Convertrank} from '../helperfunction/convertrank'
import styles from '../styles/MemoForm.module.css';

const Addperson = ({ fetchedInvitedList, setFetchedInvitedList, addUser, setAddUser, style }) => {
    const [addUserList, setAddUserList] = useState([]);
    // const [addUser, setAddUser] = useState([]);
    function UserNode(props) {
        return (
            <Row>
                <Col>
                    <Avatar src={props.avatar} size={48} />
                </Col>
                <Col>
                    <div>{convertrank(props.rank)} {props.name}</div>
                    <div>{props.position}</div>
                </Col>
            </Row>
        )
    }
    function additionalPerson(user, key, onRemove = null) {
        return (
            <Row
                key={'addP' + key}
                gutter={5}
                align="middle"
            >
                <Col>
                    <UserNode
                        avatar={user.pic}
                        rank={Convertrank(user.Rank)}
                        name={user.Name}
                        position={user.Position}
                    />
                </Col>
                <Col>
                    <Button
                        className={styles.removeButton}
                        shape="circle"
                        icon={<CloseOutlined />}
                        onClick={onRemove}
                    />
                </Col>
            </Row>
        )
    }
    const fetchInvited = useCallback(async () => {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user?index=0', {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getCookie('usercookie')}`
            }
        })
            .then(response => response.json())
            .then(data => setFetchedInvitedList(data))
    }, [setFetchedInvitedList]);

    const fetchInvitedFromKeyword = useCallback(async (keyword) => {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/user?search=' + keyword, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${getCookie('usercookie')}`
            }
        })
            .then(response => response.json())
            .then(data => setFetchedInvitedList(data))
    }, [setFetchedInvitedList]);
    const findFromId = useCallback((list, target, id) => {
        for (let element of list) {
            if (element[id] == target)
                return element;
        }
        return null;
    }, []);

    const addList = useCallback((key, id, dataState, listState, source) => {
        const listElement = findFromId(source, key, id);
        if (!listElement) return;

        listState(list => [...list, listElement]);
        dataState('');
    }, [])

    const deleteList = useCallback((listState, key) => {
        listState(list => list.filter(e => (e.key !== key)));
    }, []);
    return <>
        <div style={style} className={styles.formElement}>
            <div>
                <Select
                    labelInValue
                    className={styles.formAdditionInput}
                    mode="multiple"
                    bordered={false}
                    value={addUser.length !== 0 ? addUser : undefined}
                    onFocus={fetchInvited}
                    onChange={setAddUser}
                    onSearch={fetchInvitedFromKeyword}
                >
                    {fetchedInvitedList?.map((item) => (
                        item.DoDID && item._id &&
                        <Select.Option key={item._id} value={'' + Convertrank(item.Rank) + ' ' + item.Name}>
                            {'' + Convertrank(item.Rank) + ' ' + item.Name }
                        </Select.Option>
                    ))}
                </Select>
                <Button
                    className={styles.plusButton}
                    shape="circle"
                    onClick={() => {
                        if (addUser.length !== 0)
                            addUser.forEach(({ key }) => addList(key, 'DoDID', setAddUser, setAddUserList, fetchedInvitedList));
                    }}
                />
            </div>
            {
                addUserList.length !== 0 &&
                addUserList.map((user, index) => additionalPerson(user, index, () => deleteList(setAddUserList, user.key)))
            }
        </div>


    </>
}



export default Addperson;