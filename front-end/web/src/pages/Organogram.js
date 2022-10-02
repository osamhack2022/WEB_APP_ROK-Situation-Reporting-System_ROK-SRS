import React, { useState, useCallback } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

function Organogram() {
    const [childNode, setChildNode] = useState([]);

    const addChildNode = useCallback(() => {
        setChildNode(node => [...node, <TreeNode label={node.length}/>])
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