import React, { useState } from 'react';
import SortableTree from 'react-sortable-tree';

const Data = [
    { title: "Chicken", expanded: true, children: [{ title: "Egg" }] },
    { title: "ant", expanded: true, children: [{ title: "red" }] },
    { title: "beef", expanded: true, children: [{ title: "gre" }] },
    { title: "mutton", expanded: true, children: [{ title: "rii" }] },
]

const DragFolder = () => {

    const [treeDta,setTreeData] = useState(Data)
    return (
        <div>
             <div style={{ height: 500 }}>
        <SortableTree
          treeData={treeDta}
          onChange={treeData => setTreeData(treeData)}
        />
      </div>
        </div>
    );
};

export default DragFolder;