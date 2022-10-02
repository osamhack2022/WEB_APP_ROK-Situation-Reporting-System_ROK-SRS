import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card, Button, Image } from 'antd';
import styles from './style';

function renderNode(node) {
    if(node === null)
        return;

    return (
        <TreeNode
            key={node.key}
            label={<TreeNodeElement name={node.username} rank={node.militaryRank} roles={node.roles} />}
        >
            {node.children && node.children.map((childNode) => (renderNode(childNode)))}
        </TreeNode>
    );
}

function TreeNodeElement(props) {
    return (
        <Button
            style={styles.cardButton}
            onClick={() => console.log(props.name + props.rank)}
        >
            <Card
                cover={
                    <Image
                        style={styles.profileImage}
                        preview={false}
                        src="https://joeschmoe.io/api/v1/random"
                    />
                }
                style={styles.cardContent}
                hoverable
            >
                <p><b>{props.name}</b></p>
                <p>계급: {props.rank}</p>
                <p>권한: {props.roles}</p>
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
                'key': 2,
                'username': 'Jo',
                'roles': 'viewable',
                'militaryRank': '상병',
                'pic': null,
                'children': [{
                    'key': 4,
                    'username': 'Choe',
                    'roles': 'none',
                    'militaryRank': '일병',
                    'pic': null,
                    'children': null
                }]
            },
            {
                'key': 3,
                'username': 'Kim',
                'roles': 'viewable',
                'militaryRank': '병장',
                'pic': null,
                'children': null
            },
        ]
    };

    return (
        <Tree label="❤❤대대">
            {renderNode(myData)}
        </Tree>
    )
}

export default Organogram;