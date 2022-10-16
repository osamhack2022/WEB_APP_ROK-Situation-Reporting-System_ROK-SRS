import React, { useState, useEffect, useCallback } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Button, Image, Row, Col } from 'antd';
import OrgCard from './OrganizationCard';
import Styles from '../styles/Organogram.module.css';

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
  const [selectedOrgInfo, setSelectedOrgInfo] = useState({});
  const [orgData, setOrgData] = useState({});
  const [orgDataTree, setOrgDataTree] = useState([]);

  useEffect(() => {
    setOrgData(props.renderData);
    makeTree(props.renderData);
  }, [props.renderData]);

  useEffect(() => {
    props.onPreventDraggable(isCardOpened);
  }, [isCardOpened]);

  const chooseOrgInfo = useCallback((node) => {
    setSelectedOrgInfo(node);
    setCardOpened(true);
  }, [setSelectedOrgInfo, setCardOpened]);

  const createNode = useCallback((node) => {
    // node key generate
    const randomKey = Math.random().toString(36).substring(2, 10);
    node['key'] = randomKey;

    setOrgData(treeNode => Object.assign(treeNode, { [randomKey]: node }));
  }, [setOrgData]);

  const updateNode = useCallback((node) => {
    setOrgData(treeNode => Object.assign(treeNode, node));
  }, [setOrgData]);

  const deleteNode = useCallback((node) => {
    setOrgData(treeNode => {
      const nodeCopy = Object.assign({}, treeNode);
      delete nodeCopy[node.key]
      return nodeCopy;
    });
  }, [setOrgData]);

  const makeTree = useCallback((data) => {
    // Deep Copy for object
    const dataSet = {};
    for(let key in data)
      dataSet[key] = Object.assign({}, data[key]);

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
        data={selectedOrgInfo}
        isEditable
        onCreate={createNode}
        onUpdate={updateNode}
      />
    </>
  )
}

export default Organogram;
