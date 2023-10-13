/*주요 컨테이너 컴포넌트로, 초기 레이아웃 및 컴포넌트 상태를 설정하고 드래그 앤 드롭 이벤트를 처리*/
import React, { useState, useCallback } from 'react';

import DropZone from './DropZone';
import TrashDropZone from './TrashDropZone';
import SideBarItem from './SideBarItem';
import Row from './Row';
import initialData from './initial-data';
import {
  handleMoveWithinParent,
  handleMoveToDifferentParent,
  handleMoveSidebarComponentIntoParent,
  handleRemoveItemFromLayout,
} from './helpers';

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from './constants';
import shortid from 'shortid';

const Container = () => {
  const initialLayout = initialData.layout;
  const initialComponents = initialData.components;
  const [layout, setLayout] = useState(initialLayout);
  const [components, setComponents] = useState(initialComponents);

  // const handleDropToTrashBin = useCallback(
  //   (dropZone, item) => {
  //     const splitItemPath = item.path.split('-');
  //     setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
  //   },
  //   [layout]
  // );
  const handleDropToTrashBin = useCallback(
    (dropZone, item) => {
      const splitItemPath = item.path.split('-');
      const newLayout = handleRemoveItemFromLayout(layout, splitItemPath);

      // 1개만 남도록 조절
      const remainingComponentsCount = newLayout.reduce(
        (count, row) => count + row.children.length,
        0
      );

      if (remainingComponentsCount === 1) {
        // 1개 삭제 불가 알림 설정
        alert('1개 남은 위젯의 경우 삭제 불가합니다.');
      } else {
        setLayout(newLayout);
      }
    },
    [layout]
  );

  const handleDrop = useCallback(
    (dropZone, item) => {
      console.log('dropZone', dropZone);
      console.log('item', item);

      const splitDropZonePath = dropZone.path.split('-');
      const pathToDropZone = splitDropZonePath.slice(0, -1).join('-');

      const newItem = { id: item.id, type: item.type };
      if (item.type === COLUMN) {
        newItem.children = item.children; //새로운 아이템 생성
      }

      // sidebar into
      if (item.type === SIDEBAR_ITEM) {
        // 1. Move sidebar item into page
        const newComponent = {
          id: shortid.generate(), //TODO: 새로운 컴포넌트 생성 => 이부분 유의깊게 볼것
          ...item.component,
        };
        const newItem = {
          id: newComponent.id,
          type: COMPONENT,
        };
        setComponents({
          ...components,
          [newComponent.id]: newComponent,
        });
        setLayout(
          handleMoveSidebarComponentIntoParent(
            layout,
            splitDropZonePath,
            newItem
          )
        );
        return;
      }

      // move down here since sidebar items dont have path
      const splitItemPath = item.path.split('-');
      const pathToItem = splitItemPath.slice(0, -1).join('-');

      // 2. Pure move (no create)
      if (splitItemPath.length === splitDropZonePath.length) {
        // 2.a. move within parent
        if (pathToItem === pathToDropZone) {
          setLayout(
            handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
          );
          return;
        }

        // 2.b. OR move different parent
        // TODO FIX columns. item includes children
        setLayout(
          handleMoveToDifferentParent(
            layout,
            splitDropZonePath,
            splitItemPath,
            newItem
          )
        );
        return;
      }

      // 3. Move + Create
      setLayout(
        handleMoveToDifferentParent(
          layout,
          splitDropZonePath,
          splitItemPath,
          newItem
        )
      );
    },
    [layout, components]
  );

  const renderRow = (row, currentPath) => {
    return (
      <Row
        key={row.id}
        data={row}
        handleDrop={handleDrop}
        components={components}
        path={currentPath}
      />
    );
  };

  // dont use index for key when mapping over items
  // causes this issue - https://github.com/react-dnd/react-dnd/issues/342
  return (
    <div className='body'>
      <div className='pageContainer'>
        <div className='page'>
          {layout.map((row, index) => {
            const currentPath = `${index}`;

            return (
              <React.Fragment key={row.id}>
                <DropZone
                  data={{
                    path: currentPath,
                    childrenCount: layout.length,
                  }}
                  onDrop={handleDrop}
                  path={currentPath}
                />
                {renderRow(row, currentPath)}
              </React.Fragment>
            );
          })}
          <DropZone
            data={{
              path: `${layout.length}`,
              childrenCount: layout.length,
            }}
            onDrop={handleDrop}
            isLast
          />
        </div>
      </div>
      <div className='sideBar'>
        <p> 적용중인 위젯 </p>
        {Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
          <SideBarItem key={sideBarItem.id} data={sideBarItem} />
        ))}

        <TrashDropZone
          data={{
            layout,
          }}
          onDrop={handleDropToTrashBin}
        />
      </div>
    </div>
  );
};
export default Container;
