import React, { useState } from 'react';
import { Tree } from "antd";
import "antd/dist/antd.css";


const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: (
                <span
                  style={{
                    color: '#1890ff',
                  }}
                >
                  sss
                </span>
              ),
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
    
  ];

const FolderDrag = () => {
    const [treeDta,setTreeData] = useState(treeData)
    const [expandedKeys,setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0'])

    const onDragEnter = (info) => {
        console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
      }

      const onDrop = (info) => {
        console.log(info);
        const dropKey = info.node.props.eventKey;
        const dragKey = info.dragNode.props.eventKey;
        const dropPos = info.node.props.pos.split('-');
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
    
        const loop = (data, key, callback) => {
          data.forEach((item, index, arr) => {
            if (item.key === key) {
              return callback(item, index, arr);
            }
            if (item.children) {
              return loop(item.children, key, callback);
            }
          });
        };
        const data = [...treeDta];
    
        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
          arr.splice(index, 1);
          dragObj = item;
        });
    
        if (!info.dropToGap) {
          // Drop on the content
          loop(data, dropKey, (item) => {
            item.children = item.children || [];
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.push(dragObj);
          });
        } else if (
          (info.node.props.children || []).length > 0 // Has children
          && info.node.props.expanded // Is expanded
          && dropPosition === 1 // On the bottom gap
        ) {
          loop(data, dropKey, (item) => {
            item.children = item.children || [];
            // where to insert 示例添加到尾部，可以是随意位置
            item.children.unshift(dragObj);
          });
        } else {
          let ar;
          let i;
          loop(data, dropKey, (item, index, arr) => {
            ar = arr;
            i = index;
          });
          if (dropPosition === -1) {
            ar.splice(i, 0, dragObj);
          } else {
            ar.splice(i + 1, 0, dragObj);
          }
        }
    
        // this.setState({
        //   treeData: data,
        // });
        setTreeData(data)
      }
    
      
      const { TreeNode } = Tree;
      
        const loop = data => data.map((item) => {
          if (item.children && item.children.length) {
            return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
          }
          return <TreeNode key={item.key} title={item.title} />;
        });
        return (
          <Tree
            className="draggable-tree"
            defaultExpandedKeys={expandedKeys}
            draggable
            onDragEnter={onDragEnter}
            onDrop={onDrop}
          >
            {loop(treeDta)}
          </Tree>
          
        );
      
    }

export default FolderDrag;