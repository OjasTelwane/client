import React from 'react';

const Drag = (props) => {
  const startDrag = (event) => {
    event.dataTransfer.setData('drag-item', props.value);
    setTimeout(() => {
      event.target.style.display = 'none';
    }, 0);
    event.dataTransfer.effectAllowed = props.effect;
  };

  // const dragOver = (e) => {
  //   e.stopPropagation();
  // };

  return (
    <span
      className={props.className}
      draggable={props.draggable}
      onDragStart={startDrag}
      style={{ background: 'transparent' }}
    >
      {props.children}
    </span>
  );
};

export default Drag;
