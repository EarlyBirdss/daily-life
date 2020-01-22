import React, { useState, useEffect } from 'react';
import { Form, List, Input, Checkbox } from 'antd';
import { DndProvider, DragSource, DropTarget, useDrag } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { TodoItemProps } from './types';

let dragingIndex = -1;
const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

function TodoItem(props) {

  const { item, index, form, isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = props;
  const handleCompleted = (id: string|number) => {

  };
  const todolistFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const style = { ...restProps.style, cursor: 'move' };

  let { className } = restProps;
  if (isOver) {
    if (restProps.index > dragingIndex) {
      className += ' drop-over-downward';
    }
    if (restProps.index < dragingIndex) {
      className += ' drop-over-upward';
    }
  }

  // const [collectedProps, drag] = useDrag({
  //   item
  // });
  // <div ref={drag}>
  //   <li style={style} className={`${className} ant-list-item`}>
  //     <Form.Item>
  //       <Checkbox onClick={() => handleCompleted(item.id)} defaultChecked={item.completed}>
  //         {item.name}
  //       </Checkbox>
  //     </Form.Item>
  //     <Form.Item label="备注" {...todolistFormLayout}>
  //       {
  //         form.getFieldDecorator(`todoList__${index}__remark`, {
  //           initialValue: item.remark,
  //         })(<Input placeholder="请输入备注" />)
  //       }
  //     </Form.Item>
  //   </li>
  // </div>

  return (
    connectDropTarget(
      <div style={style} className={className}>
      <List.Item>
        <Form.Item>
          <Checkbox onClick={() => handleCompleted(item.id)} defaultChecked={item.completed}>
            {item.name}
          </Checkbox>
        </Form.Item>
        <Form.Item label="备注" {...todolistFormLayout}>
          {
            form.getFieldDecorator(`todoList__${index}__remark`, {
              initialValue: item.remark,
            })(<Input placeholder="请输入备注" />)
          }
        </Form.Item>
      </List.Item >
      </div>
    )
  )
}

const DropItem = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(TodoItem),
);

export default function TodoItemList(props) {
  const { todoList, form } = props;
  return (
    <DndProvider backend={HTML5Backend}>
      <List
        dataSource={todoList}
        renderItem={
          (item: TodoItemProps, index) =>
            <DropItem item={item} index={index} form={form} />
        }
      ></List>
    </DndProvider>
  )
}
