import React, { useState, useEffect } from 'react';
import {
  Form,
  Card,
  Button,
  Modal,
  Input,
  Icon,
  message,
  Collapse,
  DatePicker,
  InputNumber,
} from 'antd';
import { Editor, EditorState } from 'draft-js';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import moment from 'moment';
import { ControllerType } from '@/configs/constant.config';
import { fetchTemplateList, fetchDiaryDetail, fetchTemplateContent, fetchTemplateDetail, saveDiary, saveTemplate } from './service';
import { ContentProps, TodoItemProps, ControllerProps, CostomModulesProps } from './types';
import AddTodoItems from './AddTodoItems';
import TodoItems from './TodoItems';
import AddModule from './AddModule';
import './index.less';

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
      // controller = <Editor editorState={editorState} onEditorChange={onEditorChange} {...restOptions} />;
      controller = <Input.TextArea placeholder={placeholder} {...restOptions} />
      break;
  }
  return controller;
}

function DiaryModify(props) {
  const { form } = props;
  const [templateList, seteTemplateList] = useState([]);
  const [addTodoItemVisible, setAddTodoItemVisible] = useState(false);
  const [addModuleVisible, setAddModuleVisible] = useState(false);
  const [content, setContent] = useState({ todoList: [], modules: [] });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [remarkVisible, setRemarkVisible] = useState(false);
  const [remark, setRemark] = useState('');
  const [templateVisible, setTemplateVisible] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [id, setId] = useState();
  const [isTemplate, setIsTemplate] = useState(false);
  const onEditorChange = (editorState: any) => setEditorState(editorState);

  useEffect(() => {
    const { match: { params } } = props;
    fetchTemplateList()
      .then(({ data = [] }: { data: Array<{ name: string, _id: string|number }> }) => {
        seteTemplateList(data);
      });

    if (params.diaryId) {
      setId(params.diaryId);
      fetchDiaryDetail({ _id: params.diaryId })
        .then(({ data = {} }: { data: ContentProps }) => {
          setContent(data);
        });
    } else if (params.templateId) {
      setId(params.templateId);
      setIsTemplate(true);
      fetchTemplateDetail({ _id: params.templateId })
        .then(({ data = {} }: { data: ContentProps }) => {
          setContent(data);
        });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleSumbit();
    }, 2000);

    return clearTimeout(timer);
  }, []);

  const handleChooseTemplate = (_id: string|number) => {
    Modal.confirm({
      icon: <></>,
      title: '请确认',
      content: '选择模块后，当日内容将重置',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        fetchTemplateDetail({ _id })
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

  const handleAddModuleClose = (selectModules = content.modules) => {
    setAddModuleVisible(false);
    const modules = selectModules.map((item: CostomModulesProps) => {
      const existantModule = content.modules.find(({ _id }) => _id === item._id);
      if (existantModule) {
        return existantModule;
      } else {
        const children = !item.children ? [] : item.children.map(
          ({ _id, name, controllerType, content = '' }) => ({ _id: _id, name, controllerType, content })
        );
        return { _id: item._id, name: item.name, controllerType: item.controllerType, content: '', children };
      }
    });

    setContent({ ...content, modules });
  }

  const handleSumbit = () => {
    form.validateFields((err: any, values: any) => {
      const data = formatPostData(values);
      saveDiary({ _id: id, date: new Date(values.date), dayIndex: values.dayIndex, remark, ...data })
        .then(() => {
          message.success('日志已更新');
          setRemark('');
        });
    });
  }

  const formatPostData = (data: any) => {
    const modules: any = {};
    const todoList: any = {};
    Object.keys(data).forEach((key: string) => {
      const value = data[key];
      const [container, _id, subId, keyName] = key.split('__');
      if (container === 'todoList') {
        const fieldName = subId;
        if (!todoList[_id]) {
          todoList[_id] = {
            [fieldName]: value,
            _id,
          };
        } else {
          todoList[_id][fieldName] = value;
        }
      } else if (container === 'modules') {
        // const content = data[[container, _id, subId, 'content'].join('__')];
        // const name = data[[container, _id, subId, 'name'].join('__')];
        if (!modules[_id]) {
          if (subId === '0') {
            modules[_id] = { _id, [keyName]: value };
          } else {
            // TODO：父模块没有取到name
            modules[_id] = { _id, name: '', children: [{ _id: subId, [keyName]: value }] };
          }
        } else {
          if (subId === '0') {
            modules[_id][keyName] = value;
          } else {
            const child = modules[_id].children.find(({ _id }: { _id: string}) => subId === _id);
            if (child) {
              child[keyName] = value;
            } else {
              modules[_id].children.push({ _id: subId, [keyName]: value });
            }
          }
        }
      }
    });

    return {
      todoList: Object.keys(todoList).map(key => todoList[key]),
      modules: Object.keys(modules).map(key => modules[key])
    };
  }

  const handleDeleteModule = (index: number, item: CostomModulesProps) => {
    const { modules = [] } = content;
    Modal.confirm({
      title: '请确认',
      content: '请确认将删除改模块及模块下所有内容？',
      onOk: () => setContent({...content, modules: modules.filter(({ _id }) => _id !== item._id)}),
    });
  }

  const handleSaveTemplate = () => {
    form.validateFields((err: any, values: any) => {
      const data = formatPostData(values);
      const templateBasicDetail = templateName ? { name: templateName, description: templateDescription } : {};
      saveTemplate({ _id: id, ...templateBasicDetail, ...data })
        .then(() => {
          message.success('模板已保存');
          setTemplateName('');
          setTemplateDescription('');
        });
    });
  }

  return (
  // <DndProvider backend={HTML5Backend}>
    <div className="cb-panel">
    {
      !isTemplate && <Card title="日志日期" style={{ marginBottom: 15 }}>
        <Form layout="inline">
          <Form.Item style={{ marginBottom: 0 }}>
            {
              form.getFieldDecorator('date', {
                initialValue: new moment(),
              })(<DatePicker placeholder="请输入" />)
            }
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }} label="当前第N天">
            {
              form.getFieldDecorator('dayIndex', {
                // initialValue: 1,
              })(<InputNumber placeholder="请输入" style={{ width: 160 }} />)
            }
          </Form.Item>
        </Form>
      </Card>
    }
    { !!templateList.length &&
      <Card title="可选模板">
        {templateList.map(
          ({ _id, name }) =>
            <Button
              onClick={() => handleChooseTemplate(_id)}
              style={{ marginRight: 10 }}
              icon="rocket"
              key={_id}
            >{name}</Button>)
        }
      </Card>
    }
    <Button onClick={handleEditModule} style={{ margin: '10px 0' }}>编辑模块</Button>
    <Collapse
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
      style={{ marginTop: 20 }}
    >
      <Collapse.Panel
        header={
          <>
            今日计划
            <Button type="link" style={{ marginLeft: 20 }} onClick={handleAddItem}>编辑今日计划</Button>
          </>
        }
        key="1">
        <TodoItems todoList={content.todoList} form={form}></TodoItems>
      </Collapse.Panel>
      {
      // 可排序
      (content.modules || []).map((item: CostomModulesProps, index) =>
        <Collapse.Panel
          header={item.name}
          key={item._id}
          extra={<Icon type="delete" onClick={() => handleDeleteModule(index, item)} />}
          >
          {
            !!item.children && !!item.children.length && (
              item.children.map((subItem: CostomModulesProps) =>
                <Form.Item key={subItem._id} label={subItem.name}>
                  {
                    form.getFieldDecorator(`modules__${item._id}__${subItem._id}__content`, {
                      initialValue: subItem.content
                    })(getController(subItem.controllerType, { editorState, onEditorChange }))
                  }
                  {
                    form.getFieldDecorator(`modules__${item._id}__${subItem._id}__name`, {
                      initialValue: subItem.name,
                    })(
                    <input type="hidden" />
                  )}
                  {
                    form.getFieldDecorator(`modules__${item._id}__${subItem._id}__controllerType`, {
                      initialValue: subItem.controllerType,
                    })(
                    <input type="hidden" />
                  )}
                </Form.Item>
                )
              )
          }
          <Form.Item>
                {
                  form.getFieldDecorator(`modules__${item._id}__${0}__content`, {
                    initialValue: item.content
                  })(getController(item.controllerType, { editorState, onEditorChange }))
                }
                {
                  form.getFieldDecorator(`modules__${item._id}__${0}__name`, {
                    initialValue: item.name,
                  })(
                  <input type="hidden" />
                )}
                {
                  form.getFieldDecorator(`modules__${item._id}__${0}__controllerType`, {
                    initialValue: item.controllerType,
                  })(
                  <input type="hidden" />
                )}
              </Form.Item>
        </Collapse.Panel>
      )
    }
    </Collapse>
    <div style={{ margin: '20px 0' }}>
      { !isTemplate ?
        <>
          <Button onClick={() => setRemarkVisible(true)}>提交</Button>
          <Button onClick={() => setTemplateVisible(true)} style={{ marginLeft: 10 }}>设为模板</Button>
        </> :
        <Button onClick={handleSaveTemplate}>保存模板</Button>
      }
    </div>
    {addTodoItemVisible && <AddTodoItems onClose={handleAddTotoItemClose} selectedItems={content.todoList} /> }
    {addModuleVisible && <AddModule selectedItems={content.modules.map(({ _id, name }) => ({ _id, name }))} onClose={handleAddModuleClose}></AddModule>}
    <Modal
      title="请提交修改备注"
      visible={remarkVisible}
      onOk={() => { setRemarkVisible(false); handleSumbit(); }}
      onCancel={() => setRemarkVisible(false)}>
        <Input.TextArea rows={4} onBlur={e => setRemark(e.target.value)} />
    </Modal>
    <Modal
      title="请输入模板信息"
      visible={templateVisible}
      onOk={() => { setTemplateVisible(false); handleSaveTemplate(); }}
      onCancel={() => setTemplateVisible(false)}>
      <Input onBlur={e => setTemplateName(e.target.value)} placeholder="请输入模板名称" />
      <Input.TextArea onBlur={e => setTemplateDescription(e.target.value)} placeholder="请输入模板描述" style={{ marginTop: 15 }} />
    </Modal>
    </div>
  // </DndProvider>
  )
}

export default Form.create()(DiaryModify);