import React, { useState, useCallback } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card, Button, Modal } from 'antd';
import styles from './style';

function renderNode(node) {
    if(node === null)
        return;

    return (
        <TreeNode label={<TreeNodeElement name={node.username} rank={node.militaryRank} roles={node.roles} />}>
            {node.children && node.children.map((childNode) => (renderNode(childNode)))}
        </TreeNode>
    );
}

function TreeNodeElement(props) {
    return (
        <Button
            style={styles.cardButton}
            onClick={() => console.log("push!")}
        >
            <Card title={props.name}>
                <p>militaryRank: {props.rank}</p>
                <p>roles: {props.roles}</p>
            </Card>
        </Button>
    )
}

function Organogram() {
    const myData = {
        'key': 1,
        'username': 'Kim',
        'roles': 'editable',
        'militaryRank': '대위',
        'pic': null,
        'children': [
            {
                'key': 1,
                'username': 'Jo',
                'roles': 'editable',
                'militaryRank': '상병',
                'pic': null,
                'children': [{
                    'key': 1,
                    'username': 'Choe',
                    'roles': 'editable',
                    'militaryRank': '일병',
                    'pic': null,
                    'children': null
                }]
            },
            {
                'key': 1,
                'username': 'Kim',
                'roles': 'editable',
                'militaryRank': '병장',
                'pic': null,
                'children': null
            },
        ]
    };
    const [childNode, setChildNode] = useState(myData);

    return (
        <>
            <Tree label="Parent">
                {renderNode(myData)}
            </Tree>
        </>
    )
}

export default Organogram;