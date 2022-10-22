import React, { useState, useEffect, useCallback } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Button, Image, Row, Col } from 'antd';
import { getCookie } from 'cookies-next';
import OrganizationCard from './OrganizationCard';
import Styles from '../styles/Organogram.module.css';

function renderNode(node, chooseNode) {
  if (!node)
    return;

  if (!node.Parent)
    return (
      <Tree
        key={node._id}
        lineWidth="4px"
        lineColor="#008080"
        lineBorderRadius="10px"
        label={
          <TreeNodeElement
            name={node.Name}
            rank={node.Rank}
            position={node.Position}
            onClick={() => chooseNode(node)}
          />
        }
      >
        {node.children && node.children.map((childNode) => (renderNode(childNode, chooseNode)))}
      </Tree>
    )

  return (
    <TreeNode
      key={node._id}
      label={
        <TreeNodeElement
          name={node.Name}
          rank={node.Rank}
          position={node.Position}
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
          gutter={20}
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
  const [selectedOrgInfo, setSelectedOrgInfo] = useState({});
  const [orgData, setOrgData] = useState({});
  const [orgDataTree, setOrgDataTree] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/chart', {
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
    })
      .then(response => response.json())
      .then(data => {
        const objectData = data.reduce((preData, node) => (
          { ...preData, [node._id]: node }
        ), {});
        setOrgData(objectData)
      });
  }, []);

  useEffect(() => {
    makeTree(orgData);
  }, [orgData])

  useEffect(() => {
    props.onPreventDraggable(isCardOpened);
  }, [isCardOpened]);

  const chooseOrgInfo = useCallback((node) => {
    setSelectedOrgInfo(node);
    setCardOpened(true);
  }, [setSelectedOrgInfo, setCardOpened]);

  const createNode = useCallback(async (node) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/chart/add', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
      'body': JSON.stringify(node)
    })
      .then(response => {
        if (response.status === 200 || response.status === 201)
          return response.json()
      })
      .then(data => {
        if (data)
          setOrgData(treeNode => ({ ...treeNode, [data._id]: data }))
      })
  }, [setOrgData]);

  const updateNode = useCallback(async (node) => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/chart/edit', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
      'body': JSON.stringify(node)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201)
          setOrgData(treeNode => ({ ...treeNode, [node._id]: node }))
      })
  }, [setOrgData]);

  const deleteNode = useCallback(async (node) => {
    const nodeCopy = { ...orgData };

    // Redirection for children of removed node
    const nodeChildren = Object.values(nodeCopy).filter((data) => data.Parent == node._id);
    for (let child of nodeChildren) {
      child.Parent = node.Parent;
      await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/chart/edit', {
        'method': 'POST',
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getCookie('usercookie')}`
        },
        'body': JSON.stringify(child)
      });
    }

    await fetch(process.env.NEXT_PUBLIC_BACKEND_ROOT + 'api/chart/delete', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie('usercookie')}`
      },
      'body': JSON.stringify(node)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          delete nodeCopy[node._id];
          setOrgData(nodeCopy);
        }
      })
  }, [orgData, setOrgData]);

  const makeTree = useCallback((data) => {
    // Deep Copy for object
    const dataSet = {};
    for (let id in data)
      dataSet[id] = { ...data[id] };

    const dataTree = [];
    for (let id in dataSet) {
      if (!dataSet[id].Parent) {
        dataTree.push(dataSet[id]);
      }
      else {
        if (dataSet[dataSet[id].Parent].children) {
          dataSet[dataSet[id].Parent].children.push(dataSet[id]);
        }
        else {
          dataSet[dataSet[id].Parent].children = [dataSet[id]];
        }
      }
    }

    setOrgDataTree(dataTree);
  }, [setOrgDataTree]);

  return (
    <>
      <Row gutter={50}>
        {orgDataTree.map((dataNode) => (
          <Col key={dataNode._id}>
            {renderNode(dataNode, chooseOrgInfo)}
          </Col>
        ))}
      </Row>
      <OrganizationCard
        isOpen={isCardOpened}
        onClose={() => setCardOpened(false)}
        data={selectedOrgInfo}
        isEditable
        onCreate={createNode}
        onUpdate={updateNode}
        onRemove={deleteNode}
        nodeList={orgData && Object.values(orgData).map((node) => ({ 'key': node._id, 'value': node.Rank + ' ' + node.Name }))}
      />
    </>
  )
}

export default Organogram;
