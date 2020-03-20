import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd';
import { fetchDiaryList } from './service';

export default function DiaryConfig() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchDiaryList()
    .then(res => console.log(res))
  }, []);
  return (
    <>
      <Card title="今日计划">
        <Table
          dataSource={list}
          columns={[...colunm, operateColumn]}
          pagination={{
            showTotal: total => `共${total}条`,
            showSizeChanger: true,
            ...pagination
          }}
          rowKey="id"
          >
        </Table>
      </Card>
    </>
  )
}
