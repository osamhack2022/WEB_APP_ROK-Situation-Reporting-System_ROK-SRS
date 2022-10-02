import React, { useState, useCallback } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card } from 'antd';

function TreeNodeElement(props) {
    return (
        <Card title={props.name} extra={<a href="#">추가</a>}>
            <p>militaryRank: {props.rank}</p>
            <p>roles: {props.roles}</p>
        </Card>
    )
}

function Organogram() {
    const [childNode, setChildNode] = useState([]);
    const myData = { "key": 1, "username": "Choe", "roles": "editable", "militaryRank": "private", "pic": null };

    const addChildNode = useCallback(() => {
        setChildNode(node => [...node, <TreeNode label={<TreeNodeElement name={myData.username} rank={myData.militaryRank} roles={myData.roles} />}/>])
    }, [setChildNode]);

    return (
        <>
            <Tree label="Parent">
                {childNode}
            </Tree>
            <button onClick={addChildNode}>+1</button>
        </>
    )
}

export default Organogram;