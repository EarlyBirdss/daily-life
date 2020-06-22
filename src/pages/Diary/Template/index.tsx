import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Divider, Popconfirm } from 'antd';
import { fetchTemplateList, deleteTemplate } from './service';
import { colunms } from './options';
import Modify from './Modify';

export default function DiaryTemplate() {
  const [list, setList] = useState([]);
  const [modalConfig, setModalConfig] = useState({});

  function setTemplate() {
    fetchTemplateList()
      .then(({ data }: { data: Array<any>}) => setList(data));
  }

  useEffect(() => {
    setTemplate();
  }, []);

  const handleDelete = (_id: string) => {
    deleteTemplate({ _id }).then(() => {
      setTemplate();
    });
  }

  const handleCreate = () => {
    setModalConfig({ _id: null });
  }

  const handleEdit = (_id: string) => {
    setModalConfig({ _id });
  }

  const handleModalClose = (isFresh: boolean) => {
    setModalConfig({});
    isFresh ===true && setTemplate();
  };

  const operateColumn = {
    dataIndex: 'operate',
    title: '操作',
    render: (_, { _id }: { _id: string }) => <>
      <a onClick={() => handleEdit(_id)}>编辑基础信息</a>
      <Divider type="vertical" />
      <a href={`#/diary/template/modify/${_id}`}>编辑模板信息</a>
      <Divider type="vertical" />
      <Popconfirm title="确认删除该条模板吗？" onConfirm={() => handleDelete(_id)}>
        <a>删除</a>
      </Popconfirm>
    </>
  }

  return (
    <>
      <Card title="模板配置" extra={<Button type="primary" icon="plus" onClick={handleCreate}>新增模板</Button>}>
        <Table
          dataSource={list}
          columns={[...colunms, operateColumn]}
          pagination={false}
          rowKey="id"
          >
        </Table>
        { modalConfig._id !== undefined && <Modify {...modalConfig} onClose={handleModalClose} /> }
      </Card>
    </>
  )
}
