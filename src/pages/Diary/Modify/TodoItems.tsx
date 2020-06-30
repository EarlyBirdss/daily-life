import React, { useState, useEffect } from 'react';
import { Form, List, Input, Checkbox, Col } from 'antd';
import { DndProvider, DragSource, DropTarget, useDrag } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { TodoItemProps } from './types';

const todolistFormLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

let dragingIndex = -1;
const rowSource = {
  beginDrag(props: any) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props: any, monitor: any) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    props.moveRow(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  },
};

function TodoItem(props: any) {
  const { item, index, form, isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = props;
  const [completed, setCompleted] = useState(item.completed);
  const style = { ...restProps.style, cursor: 'move' };

  const handleCompleted = (value: boolean) => {
    setCompleted(value);
  };

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
  //       <Checkbox onClick={() => handleCompleted(item._id)} defaultChecked={item.completed}>
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
    connectDragSource(
      connectDropTarget(
        <div style={style} className={className}>
        <List.Item>
          <Col span={6}>
            <Form.Item>
              {
                form.getFieldDecorator(`todoList__${item._id}__completed`, {
                  initialValue: item.completed,
                  valuePropName: 'checked'
                })(
                <Checkbox onChange={e => handleCompleted(e.target.checked)}>
                  <span style={{ textDecoration: completed ? 'line-though' : 'none' }}>{item.name}</span>
                </Checkbox>
              )}
            </Form.Item>
          </Col>
          {/* 设置隐藏表单域，保存名称 */}
          {
            form.getFieldDecorator(`todoList__${item._id}__name`, {
              initialValue: item.name,
            })(
            <input type="hidden" />
          )}
          <Col span={8}>
            <Form.Item label="备注" {...todolistFormLayout}>
              {
                form.getFieldDecorator(`todoList__${item._id}__remark`, {
                  initialValue: item.remark,
                })(<Input.TextArea rows={1} placeholder="请输入备注" style={{ width: '100%' }} />)
              }
            </Form.Item>
          </Col>
        </List.Item >
        </div>
      )
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

export default function TodoItemList(props: any) {
  const { todoList, form } = props;
  const [list, setList] = useState(todoList);

  const moveRow = (dragIndex: number, hoverIndex: number) => {
    const dragRow = todoList[dragIndex];
    setList(list.splice(dragIndex, 1).splice(hoverIndex, 0, dragRow));
  };
  //  排序未生效，list, setList问题，带排查
  return (
    <DndProvider backend={HTML5Backend}>
      <List
        // dataSource={list}
        dataSource={todoList}
        renderItem={
          (item: TodoItemProps, index) =>
            <DropItem item={item} index={index} form={form} moveRow={moveRow} />
        }
      ></List>
    </DndProvider>
  )
}
