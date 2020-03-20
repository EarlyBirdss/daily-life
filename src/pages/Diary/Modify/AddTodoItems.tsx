import React,{ useState, useEffect } from 'react';
import { Form, Drawer, Checkbox, List, Input, Button, Icon } from 'antd';
import { fetchModulesById } from './service';
import { TodoItemProps, AddTodoItemProps } from './types';
import styled from 'styled-components';

// TODO: 找antd 好看的溢出滚动条
const FormWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  borderTop: 1px solid #e9e9e9;
  padding: 10px 16px;
  max-height: 30vh;
`
const ButtonWrapper = styled.div`
  margin-top: 10px;
  text-align: right;
`

function formatSelectedItems(data: Array<TodoItemProps>, selectedItems: Array<TodoItemProps>) {
  const selectIds = selectedItems.map(({ id }) => id);
  return data.map(item =>
    selectIds.includes(item.id) ? {...item, selected: true} : {...item, selected: false}
  );
}

function AddTodoItems(props: AddTodoItemProps){
  const { selectedItems = [], form } = props;
  const [todoItems, setTodoItems] = useState([]);
  const [newItems, setNewItems] = useState([{}]);

  useEffect(() => {
    fetchModulesById({ id: 10 })
      .then(({ data = [] }: { data: Array<TodoItemProps>}) => {
        const formatItems = formatSelectedItems(data, selectedItems);
        setTodoItems(formatItems);
      })
  }, []);

  // TODO: dom未更新
  const handleAddInput = () => {
    newItems.push({id: newItems.length});
    setNewItems(newItems);
  };

  const handleRemoveInput = (index: number) => {
    newItems.splice(index, 1);
    setNewItems(newItems);
  };

  const handleClose = () => {
    console.log(props);
    props.onClose && props.onClose();
  };
  return (
    <Drawer
      visible={true}
      width={460}
      >
      <List
        // style={{ maxHeight: '70vh', overflowY: 'scroll' }}
        dataSource={todoItems}
        renderItem={
          ({ id, name, selected }) =>
            <List.Item>
              <Checkbox defaultChecked={selected} disabled={selected} key={id}>
                { name }
              </Checkbox>
            </List.Item>
        }
      />
      <FormWrapper>
        {
          newItems.map((item, index) =>
            <Form.Item key={index}>
              {
                form.getFieldDecorator(`newItem__${index}`, {
                  rules: []
                })(<Input
                    placeholder="请输入待完成项名称"
                    addonAfter={
                      index === 0 ?
                        <Icon type="plus" onClick={handleAddInput} style={{ cursor: 'pointer' }}/>
                        :
                        <Icon type="minus" onClick={() => handleRemoveInput(index)} style={{ cursor: 'pointer' }}/>
                    }
                    />)
              }
            </Form.Item>
          )
        }
        <ButtonWrapper>
          <Button type="primary" htmlType="submit" icon="save" style={{ marginRight: 10 }}>确认</Button>
          <Button icon="close-square" onClick={handleClose}>取消</Button>
        </ButtonWrapper>
      </FormWrapper>
    </Drawer>
  );
}

export default Form.create()(AddTodoItems);