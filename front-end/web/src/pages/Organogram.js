import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

function Organogram() {
    return (
        <Tree label="Parent">
            <TreeNode label="Child" />
        </Tree>
    )
}

export default Organogram;