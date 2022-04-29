import React from 'react';

const Drop = (props) => {
  const dragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = props.effect;
  };

  const dragEnter = (event) => {
    event.dataTransfer.dropEffect = props.effect;
  };

  const drop = (event) => {
    event.preventDefault();
    const droppedItem = event.dataTransfer.getData('drag-item');
    console.log({ droppedItem });
    if (droppedItem) {
      props.onItemDropped(droppedItem);
    }
  };

  return (
    <span onDragOver={dragOver} onDragEnter={dragEnter} onDrop={drop}>
      {props.children}
    </span>
  );
};

export default Drop;
