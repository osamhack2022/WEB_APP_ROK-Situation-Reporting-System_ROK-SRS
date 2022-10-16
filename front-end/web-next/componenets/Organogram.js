import React, { useState, useEffect, useCallback } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Button, Image, Row, Col } from 'antd';
import OrgCard from './OrganizationCard';
import Styles from '../styles/Organogram.module.css';

const myData = [{
  'key': 1,
  'username': 'Kim',
  'department': 'rok_srs',
  'position': '보안팀장',
  'roles': 'editable',
  'rank': '대위',
  'DoDID': '00-12345678',
  'phoneNumber': '010-0000-1111',
  'voipNumber': 'voip',
  'email': '@@@',
  'parent': null,
},
{
  'key': 2,
  'username': 'Jo',
  'department': 'rok_srs',
  'position': '백엔드',
  'roles': 'viewable',
  'rank': '상병',
  'DoDID': '99-00112233',
  'phoneNumber': '010-2222-3333',
  'voipNumber': 'voip',
  'email': '@@@',
  'parent': 1
},
{
  'key': 3,
  'username': 'Kim',
  'department': 'rok_srs',
  'position': '프론트엔드(APP)',
  'roles': 'viewable',
  'rank': '병장',
  'DoDID': '98-76543210',
  'phoneNumber': '010-6666-7777',
  'voipNumber': 'voip',
  'email': '@@@',
  'parent': 1
},
{
  'key': 4,
  'username': 'Choe',
  'department': 'rok_srs',
  'position': '프론트엔드(WEB)',
  'roles': 'none',
  'rank': '일병',
  'DoDID': '88-44556677',
  'phoneNumber': '010-4444-5555',
  'voipNumber': 'voip',
  'email': '@@@',
  'parent': 2
},
{
  'key': 5,
  'username': 'Annoymous',
  'department': 'rok_srs',
  'position': 'TEST',
  'roles': 'none',
  'rank': '이병',
  'DoDID': '-',
  'phoneNumber': '-',
  'voipNumber': '-',
  'email': '@@@',
  'parent': null
}];

function renderNode(node, chooseNode) {
  if (!node)
    return;

  if (!node.parent)
    return (
      <Tree
        key={node.key}
        label={
          <TreeNodeElement
            name={node.username}
            rank={node.rank}
            position={node.position}
            onClick={() => chooseNode(node)}
          />
        }
      >
        {node.children && node.children.map((childNode) => (renderNode(childNode, chooseNode)))}
      </Tree>
    )

  return (
    <TreeNode
      key={node.key}
      label={
        <TreeNodeElement
          name={node.username}
          rank={node.rank}
          position={node.position}
          onClick={() => chooseNode(node)}
        />
      }
    >
      {node.children && node.children.map((childNode) => (renderNode(childNode, chooseNode)))}
    </TreeNode>
  );
}

function TreeNodeElement(props) {
  return (
    <Button
      className={Styles.cardButton}
      onClick={props.onClick}
    >
      <div className={Styles.cardContent}>
        <Row
          gutter={10}
          align="middle"
          justify="start"
        >
          <Col>
            <Image
              className={Styles.profileImage}
              preview={false}
              src="https://images.pexels.com/photos/1202726/pexels-photo-1202726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
          </Col>
          <Col>
            <div>
              <span className={Styles.userName}>{props.name}</span>
              <span className={Styles.userRank}>{props.rank}</span>
            </div>
            <div className={Styles.userPosition}>
              {props.position}
            </div>
          </Col>
        </Row>
      </div>
    </Button>
  )
}

function Organogram(props) {
  const [isCardOpened, setCardOpened] = useState(false)
  const [orgInfo, setOrgInfo] = useState({});
  const [orgDataTree, setOrgDataTree] = useState([]);

  useEffect(() => {
    props.onPreventDraggable(isCardOpened);

    if (orgDataTree.length === 0)
      makeTree(myData);
  }, [isCardOpened, orgDataTree, myData]);

  const chooseOrgInfo = useCallback((node) => {
    setOrgInfo(node);
    setCardOpened(true);
  }, [setOrgInfo, setCardOpened]);
  
  const createNode = useCallback((node) => {
		// node key generate
		const randomKey = Math.random().toString(36).substring(2,10);
		node['key'] = randomKey;
		
		setOrgDataTree(treeNode => Object.assign(treeNode, {[randomKey]: node}));
	}, [setOrgDataTree]);
	
	const updateNode = useCallback((node) => {
		setOrgDataTree(treeNode => Object.assign(treeNode, node));
	}, [setOrgDataTree]);
	
	const deleteNode = useCallback((node) => {
		setOrgDataTree(treeNode => {
			const nodeCopy = Object.assign({}, treeNode);
			delete nodeCopy[node.key]
			return nodeCopy;
		});
	}, [setOrgDataTree]);

  const makeTree = useCallback((data) => {
    const dataSet = data.reduce((prevSet, currData) => {
      prevSet[currData.key] = Object.assign({}, currData);
      return prevSet;
    }, {})

    const dataTree = [];
    for (let key in dataSet) {
      if (!dataSet[key].parent) {
        dataTree.push(dataSet[key]);
      }
      else {
        if (dataSet[dataSet[key].parent].children) {
          dataSet[dataSet[key].parent].children.push(dataSet[key]);
        }
        else {
          dataSet[dataSet[key].parent].children = [dataSet[key]];
        }
      }
    }

    setOrgDataTree(dataTree);
  }, [setOrgDataTree]);

  return (
    <>
      <Row gutter={50}>
        {orgDataTree.map((dataNode) => (
          <Col>
            {renderNode(dataNode, chooseOrgInfo)}
          </Col>
        ))}
      </Row>
      <OrgCard
        isOpen={isCardOpened}
        onClose={() => setCardOpened(false)}
        data={orgInfo}
      />
    </>
  )
}

export default Organogram;
