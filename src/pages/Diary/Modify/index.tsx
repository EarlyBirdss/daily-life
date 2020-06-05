import React, { useState, useEffect } from 'react';
import {
  Form,
  Card,
  Button,
  Modal,
  List,
  Checkbox,
  Input,
  Icon,
  Row,
  Col,
  message,
  Collapse
} from 'antd';
import { Editor, EditorState } from 'draft-js';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ControllerType } from '@/configs/constant.config';
import { fetchTemplateList, fetchDiaryDetail, fetchTemplateContent, fetchTemplateDetail, updateDiary, saveTemplate } from './service';
import { ContentProps, TodoItemProps, ControllerProps, CostomModulesProps } from './types';
import AddTodoItems from './AddTodoItems';
import TodoItems from './TodoItems';
import AddModule from './AddModule';
import './index.less';
import Item from 'antd/lib/list/Item';

function getController(type: string, options?: ControllerProps = {}) {
  const {
    placeholder = '请输入',
    editorState,
    onEditorChange,
    ...restOptions
  } = options;
  let controller = <></>;

  switch (type) {
    case ControllerType.INPUT:
      controller = <Input placeholder={placeholder} {...restOptions} />;
      break;
    case ControllerType.TEXTAREA:
      controller = <Input.TextArea placeholder={placeholder} {...restOptions} />
      break;
    case ControllerType.EDITOR:
    default:
      controller = <Editor editorState={editorState} onEditorChange={onEditorChange} {...restOptions} />;
      break;
  }
  return controller;
}

function DiaryModify(props) {
  const { form } = props;
  const [templateList, seteTemplateList] = useState([]);
  const [addTodoItemVisible, setAddTodoItemVisible] = useState(false);
  const [addModuleVisible, setAddModuleVisible] = useState(false);
  const [content, setContent] = useState({ todoList: [], customModules: [] });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [remarkVisible, setRemarkVisible] = useState(false);
  const [remark, setRemark] = useState('');
  const [templateVisible, setTemplateVisible] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const onEditorChange = (editorState: any) => setEditorState(editorState);

  useEffect(() => {
    const { match: { params } } = props;
    fetchTemplateList()
      .then(({ data = [] }: { data: Array<{ name: string, id: string|number }> }) => {
        seteTemplateList(data);
      });

    if (params.diaryId) {
      fetchDiaryDetail()
        .then(({ data = {} }: { data: ContentProps }) => {
          setContent(data);
        });
    } else if (params.tempalteId) {
      fetchTemplateDetail()
        .then(({ data = {} }: { data: ContentProps }) => {
          setContent(data);
        });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(223)
      handleSumbit();
    }, 2000);

    return clearTimeout(timer);
  }, [])

  const handleChooseTemplate = (id: string|number) => {
    Modal.confirm({
      icon: <></>,
      title: '要想清楚哦',
      content: '选择模块后，当日内容将重置',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        fetchTemplateContent({ id })
          .then(({ data = {}}: { data: ContentProps }) => {
            setContent(data);
          });
      }
    });
  };

  const handleAddItem = () => {
    setAddTodoItemVisible(true);
  };

  const handleAddTotoItemClose = (selectedItem = content.todoList) => {
    setAddTodoItemVisible(false);
    setContent({ ...content, todoList: selectedItem });
  };

  const handleEditModule = () => {
    setAddModuleVisible(true);
  };

  const handleAddModuleClose = (selectModules = content.customModules) => {
    setAddModuleVisible(false);
    const customModules = selectModules.map((item: CostomModulesProps) => {
      const existantModule = content.customModules.find(({ id }) => id === item.id);
      if (existantModule) {
        return existantModule;
      } else {
        const children = !item.children ? [] : item.children.map(
          ({ _id, name, controllerType, content = '' }) => ({ id: _id, name, controllerType, content })
        );
        return { id: item.id, name: item.name, controllerType: item.controllerType, content: '', children };
      }
    });

    setContent({ ...content, customModules });
  }

  const handleSumbit = () => {
    form.validateFields((err: any, values: any) => {
      const data = formatPostData(values);
      console.log(data)
      updateDiary({ remark, ...data })
        .then(() => {
          message.success('日志已更新');
          setRemark('');
        });
    });
  }

  const formatPostData = (data: any) => {
    const customModules: any = {};
    const todoList: any = {};
    Object.keys(data).forEach((key: string) => {
      const value = data[key];
      const [container, id, subId, keyName] = key.split('__');
      if (container === 'todoList') {
        const fieldName = subId;
        if (!todoList[id]) {
          todoList[id] = {
            [fieldName]: value
          };
        } else {
          todoList[id][fieldName] = value;
        }
      } else if (container === 'customModules') {
        // const content = data[[container, id, subId, 'content'].join('__')];
        // const name = data[[container, id, subId, 'name'].join('__')];
        if (!customModules[id]) {
          if (subId === '0') {
            customModules[id] = { id, [keyName]: value };
          } else {
            // TODO：父模块没有取到name
            customModules[id] = { id, name: '', children: [{ id: subId, [keyName]: value }] };
          }
        } else {
          if (subId === '0') {
            customModules[id][keyName] = value;
          } else {
            const child = customModules[id].children.find(({ id }: { id: string}) => subId === id);
            if (child) {
              child[keyName] = value;
            } else {
              customModules[id].children.push({ id: subId, [keyName]: value });
            }
          }
        }
      }
    });

    return {
      todoList: Object.keys(todoList).map(key => todoList[key]),
      customModules: Object.keys(customModules).map(key => customModules[key])
    };
  }

  const handleDeleteModule = (index: number, item: CostomModulesProps) => {
    const { customModules = [] } = content;
    Modal.confirm({
      title: '请确认',
      content: '请确认将删除改模块及模块下所有内容？',
      onOk: () => setContent({...content, customModules: customModules.filter(({ id }) => id !== item.id)}),
    });
  }

  const handleSaveTemplate = () => {
    form.validateFields((err: any, values: any) => {
      const data = formatPostData(values);
      console.log(data)
      saveTemplate({ templateName, ...data })
        .then(() => {
          message.success('日志已更新');
          setTemplateName('');
        });
    });
  }

  return (
  // <DndProvider backend={HTML5Backend}>
    <div className="cb-panel">
    { !!templateList.length &&
      <Card title="可选模板">
        {templateList.map(
          ({ id, name }) =>
            <Button
              onClick={() => handleChooseTemplate(id)}
              style={{ marginRight: 10 }}
              icon="rocket"
              key={id}
            >{name}</Button>)
        }
      </Card>
    }
    <Button onClick={handleEditModule} style={{ margin: '20px 0' }}>编辑模块</Button>
    <Collapse
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
      style={{ marginTop: 20 }}
    >
      <Collapse.Panel
        header={
          <>
            今日计划
            <Button type="link" style={{ marginLeft: 20 }} onClick={handleAddItem}>编辑items</Button>
          </>
        }
        key="1">
        <TodoItems todoList={content.todoList} form={form}></TodoItems>
      </Collapse.Panel>
      {
      // 可排序
      (content.customModules || []).map((item: CostomModulesProps, index) =>
        <Collapse.Panel
          header={item.name}
          key={item.id}
          extra={<Button icon="trash" onClick={() => handleDeleteModule(index, item)} />}
          >
          {
            item.children && item.children.length ?
              item.children.map((subItem: CostomModulesProps) =>
                <Form.Item key={subItem.id} label={subItem.name}>
                  {
                    form.getFieldDecorator(`customModules__${item.id}__${subItem.id}__content`, {
                      initialValue: subItem.content
                    })(getController(subItem.controllerType, { editorState, onEditorChange }))
                  }
                  {
                    form.getFieldDecorator(`customModules__${item.id}__${subItem.id}__name`, {
                      initialValue: subItem.name,
                    })(
                    <input type="hidden" />
                  )}
                </Form.Item>
                )
              :
              <Form.Item>
                {
                  form.getFieldDecorator(`customModules__${item.id}__${0}__content`, {
                    initialValue: item.content
                  })(getController(item.controllerType, { editorState, onEditorChange }))
                }
                {
                  form.getFieldDecorator(`customModules__${item.id}__${0}__name`, {
                    initialValue: item.name,
                  })(
                  <input type="hidden" />
                )}
              </Form.Item>
          }
        </Collapse.Panel>
      )
    }
    </Collapse>
    <div style={{ margin: '20px 0' }}>
      <Button onClick={() => setRemarkVisible(true)}>提交</Button>
      <Button onClick={() => setTemplateVisible(true)}>设为模板</Button>
    </div>
    {addTodoItemVisible && <AddTodoItems onClose={handleAddTotoItemClose} selectedItems={content.todoList} /> }
    {addModuleVisible && <AddModule selectedItems={content.customModules.map(({ id, name }) => ({ id, name }))} onClose={handleAddModuleClose}></AddModule>}
    <Modal
      title="请提交修改备注"
      visible={remarkVisible}
      onOk={() => { setRemarkVisible(false); handleSumbit(); }}
      onCancel={() => setRemarkVisible(false)}>
        <Input.TextArea rows={4} onBlur={e => setRemark(e.target.value)} />
    </Modal>
    <Modal
      title="请输入模板名称"
      visible={templateVisible}
      onOk={() => { setTemplateVisible(false); handleSaveTemplate(); }}
      onCancel={() => setTemplateVisible(false)}>
        <Input onBlur={e => setTemplateName(e.target.value)} />
    </Modal>
    </div>
  // </DndProvider>
  )
}

export default Form.create()(DiaryModify);