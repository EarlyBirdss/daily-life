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
import { fetchTemplateList, fetchDiaryDetail, fetchTemplateContent, fetchTemplateDetail } from './service';
import { ContentProps, TodoItemProps, ControllerProps, CostomModulesProps } from './types';
import AddTodoItems from './AddTodoItems';
import TodoItems from './TodoItems';
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
      controller = <Editor editorState={editorState} onEditorChange={onEditorChange} {...restOptions} />;
      break;
  }
  return controller;
}


function DiaryModify(props) {
  console.log(props);
  const { form } = props;
  const [templateList, seteTemplateList] = useState([]);
  const [addTodoItemVisible, setAddTodoItemVisible] = useState(false);
  const [content, setContent] = useState({ todoList: [], customModules: [] });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
    console.log(selectedItem, { ...content, todoList: selectedItem })
    setContent({ ...content, todoList: selectedItem });
  }

  return (
  // <DndProvider backend={HTML5Backend}>
    <div className="cb-panel">
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
          key={index + 2}>
          {
            item.children && item.children.length ?
              item.children.map((subItem: CostomModulesProps) =>
                <Form.Item key={subItem.id} label={subItem.name}>
                  {
                    form.getFieldDecorator(`customModules__${item.id}__${subItem.id}__content`, {
                      initialValue: subItem.content
                    })(getController(subItem.controllerType, { editorState, onEditorChange }))
                  }
                </Form.Item>
                )
              :
              <Form.Item>
                {
                  form.getFieldDecorator(`customModules__${item.id}__content`, {
                    initialValue: item.content
                  })(getController(item.controllerType, { editorState, onEditorChange }))
                }
              </Form.Item>
          }
        </Collapse.Panel>
      )
    }
    </Collapse>
    {addTodoItemVisible && <AddTodoItems onClose={handleAddTotoItemClose} selectedItems={content.todoList} /> }
    </div>
  // </DndProvider>
  )
}

export default Form.create()(DiaryModify);