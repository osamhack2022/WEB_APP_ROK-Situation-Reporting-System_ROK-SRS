import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card, Button, Image } from 'antd';

function renderNode(node) {
    if(node === null)
        return;

    return (
        <TreeNode
            key={node.key}
            label={
                <TreeNodeElement
                    name={node.username}
                    rank={node.militaryRank}
                    department={node.department}
                    position={node.position}
                    roles={node.roles}
                    snumber={node.serviceNumber}
                    tel={node.phoneNumber}
                    voip={node.voipNumber}
                    email={node.email}
                />
            }
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
                <p>부서: {props.department}</p>
                <p>직책: {props.position}</p>
                <p>권한: {props.roles}</p>
                <p>군번: {props.snumber}</p>
                <p>전화번호: {props.tel}</p>
                <p>군연락망: {props.voip}</p>
                <p>이메일: {props.email}</p>
            </Card>
        </Button>
    )
}

function Organogram() {
    const myData = {
        'key': 1,
        'username': 'Kim',
        'department': 'rok_srs',
        'position': '보안팀장',
        'roles': 'editable',
        'militaryRank': '대위',
        'serviceNumber': '00-12345678',
        'phoneNumber': '010-0000-1111',
        'voipNumber': 'voip',
        'email': '@@@',
        'children': [
            {
                'key': 2,
                'username': 'Jo',
                'department': 'rok_srs',
                'position': '백엔드',
                'roles': 'viewable',
                'militaryRank': '상병',
                'serviceNumber': '99-00112233',
                'phoneNumber': '010-2222-3333',
                'voipNumber': 'voip',
                'email': '@@@',
                'children': [{
                    'key': 4,
                    'username': 'Choe',
                    'department': 'rok_srs',
                    'position': '프론트엔드(WEB)',
                    'roles': 'none',
                    'militaryRank': '일병',
                    'serviceNumber': '88-44556677',
                    'phoneNumber': '010-4444-5555',
                    'voipNumber': 'voip',
                    'email': '@@@',
                    'children': null
                }]
            },
            {
                'key': 3,
                'username': 'Kim',
                'department': 'rok_srs',
                'position': '프론트엔드(APP)',
                'roles': 'viewable',
                'militaryRank': '병장',
                'serviceNumber': '98-76543210',
                'phoneNumber': '010-6666-7777',
                'voipNumber': 'voip',
                'email': '@@@',
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

const styles = {
	cardButton: {
        width: 'auto',
        height: 'auto',
		padding: 0,
		border: 'transparent',
		borderRadius: '30pt',
		backgroundColor: 'transparent'
	},
	profileImage: {
		width: '100px',
		height: '100px',
		border: '1px solid #ddd',
		borderRadius: '100%'
	},
	cardContent: {
		width: '220px',
		padding: '10px 0px',
		border: '1px solid #777',
		borderRadius: '30pt',
	}
}