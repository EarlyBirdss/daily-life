import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Divider, Popconfirm } from 'antd';
import Modify from './Modify';
import { columns } from './options';
import { fetchModule, deleteModule } from './service';

export default function DiaryModule() {
  const [list, setList] = useState([]);
  const [modalConfig, setmodalConfig] = useState({});

  function fetchModuleList() {
    fetchModule()
      .then(({ data }: { data: any }) => setList(data));
  }
  useEffect(() => {
    fetchModuleList();
  }, []);

  const handleEdit = (id: number, parentId?: number) => {
    setmodalConfig({ id, parentId });
  };
  const handleDelete = (id: number, parentId?: number) => {
    deleteModule({ id, parentId }).then(() => fetchModuleList());
  };
  const handleAddChild = (id: number) => {
    setmodalConfig({ id: null, parentId: id });
  };
  const handleCreate = () => {
    setmodalConfig({ id: null });
  };
  const handleModalClose = (isFresh: boolean) => {
    setmodalConfig({ id: undefined });
    isFresh && fetchModuleList();
  };
  const operateColumn = {
    dataIndex: 'opreate',
    title: '操作',
    render: (_: any, { _id, parentId } : { _id: number, parentId?: number }) => <>
      <a onClick={() => handleEdit(_id, parentId)}>编辑</a>
      <Divider type="vertical" />
      <Popconfirm title="确认删除该条模块吗？" onConfirm={() => handleDelete(_id, parentId)}>
        <a>删除</a>
      </Popconfirm>
      {
        !parentId && <>
          <Divider type="vertical" />
          <a onClick={() => handleAddChild(_id)}>新增子模块</a>
          </>
      }
    </>
  }

  return (
    <>
      <Card title="模块管理" extra={<Button type="primary" icon="plus" onClick={handleCreate}>新增模块</Button>}>
        <Table
          dataSource={list}
          columns={[...columns, operateColumn]}
          pagination={false}
          defaultExpandAllRows={true}
          rowKey="id"
          >
        </Table>
        { modalConfig.id !== undefined && <Modify {...modalConfig} onClose={handleModalClose} />}
      </Card>
    </>
  )
}
