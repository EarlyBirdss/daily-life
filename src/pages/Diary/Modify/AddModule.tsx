import React,{ useState, useEffect } from 'react';
import { Form, Drawer, Checkbox, List, Input, Button, Icon } from 'antd';
import { fetchModule } from './service';
import { BasicModuleItem, AddModuleProps } from './types';
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
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function formatSelectedItems(data: Array<BasicModuleItem>, selectedItems: Array<BasicModuleItem>) {
  const selectIds = selectedItems.map(({ _id }) => _id);
  const initialItems = selectedItems.map(item => ({ ...item, selected: true, disabled: true }));
  const extraItems = data
    .filter(({ _id }) => !selectIds.includes(_id))
    .map(item => ({ ...item, selected: false, completed: false }));

  return [...initialItems, ...extraItems];
}

function AddModule(props: AddModuleProps){
  const { selectedItems = [], form, onClose = function() {} } = props;
  const [todoItems, setTodoItems] = useState([]);
  const [newItems, setNewItems] = useState([{}]);

  useEffect(() => {
    fetchModule()
      .then(({ data = [] }: { data: Array<BasicModuleItem>}) => {
        const formatItems = formatSelectedItems(data, selectedItems);
        setTodoItems(formatItems);
      })
  }, []);

  const handleAddInput = () => {
    const item = [...newItems, { _id: newItems.length }];
    setNewItems(item);
  };

  const handleRemoveInput = (index: number) => {
    newItems.splice(index, 1);
    setNewItems(newItems);
  }

  const handleItemSelected = (value: boolean, _id: number) => {
    const items = todoItems.map(item => item._id === _id ? {...item, selected: value} : item);
    setTodoItems(items);
  }

  const handleSave = () => {
    form.validateFields((err: any, values: any) => {
      if (!err) {
        const seletedTodoItems = todoItems.filter(({ selected }) => selected);
        const newItems = Object.keys(values)
          .filter(key => values[key])
          .map(key => ({ _id: +key, name: values[key], completed: false }));
        onClose([...seletedTodoItems, ...newItems]);
      }
    });
  };

  const handleCancel = () => {
    onClose();
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
          ({ _id, name, selected, disabled }) =>
            <List.Item>
              <Checkbox defaultChecked={selected} key={_id} onChange={e => handleItemSelected(e.target.checked, _id)} disabled={disabled}>
                { name }
              </Checkbox>
            </List.Item>
        }
      />
      <FormWrapper>
        {
          newItems.map((item, index) =>
            <Form.Item key={index} label={`新增模块${index+1}`} {...formLayout}>
              {
                form.getFieldDecorator(`${index+1}`, {
                  rules: []
                })(<Input
                    placeholder="请输入模块名称"
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
          <Button type="primary" icon="save" onClick={handleSave} style={{ marginRight: 10 }}>确认</Button>
          <Button icon="close-square" onClick={handleCancel}>取消</Button>
        </ButtonWrapper>
      </FormWrapper>
    </Drawer>
  );
}

export default Form.create()(AddModule);