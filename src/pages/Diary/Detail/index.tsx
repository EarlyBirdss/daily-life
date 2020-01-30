import React, { useState, useEffect } from 'react';
import { Card, List, Icon, Row, Col, BackTop, Affix, Button } from 'antd';
import { fetchDiaryDetail } from './service';
import { ContentProps, TodoItemProps, CostomModulesProps } from './types';

export default function DiaryDetail(props){
  const [content, setContent] = useState({ todoList: [], customModules: [] });
  const id = 1;
  useEffect(() => {
    // TODO: get ID
    fetchDiaryDetail({ id: 1 })
      .then(({ data = { todoList: [], customModules: [] } }: { data: ContentProps }) => {
        setContent(data);
      });
  }, []);
  return (
    <>
      <Affix offsetTop={40} onChange={affixed => console.log(affixed)}>
        <Button href={`/#/diary/modify/${id}`}>修改日志</Button>
      </Affix>
      <Card title="今日计划" style={{ marginTop: 10 }}>
        <List
          split={false}
          dataSource={content.todoList}
          renderItem={(item: TodoItemProps) =>
            <List.Item>
              { item.completed ? <Icon type="check" style={{ color: "green" }} /> : <Icon type="close" />}
              <span style={{ marginLeft: 10,  textDecoration: item.completed === true ? 'line-through' : '' }}>{item.name}</span>
            </List.Item>
          }
          >
        </List>
      </Card>
      {
        (content.customModules || []).map((item: CostomModulesProps, index) => (
            <Card title={item.name} style={{ marginTop:20 }} key={item.id}>
              {
                item.children && item.children.length ?
                  <Row justify="start" gutter={24} type="flex">
                    { item.children.map((subItem: CostomModulesProps) =>
                        <Col span={8} key={subItem.id}>
                          <Card title={subItem.name} bordered={false}>
                            {subItem.content}
                          </Card>
                        </Col>
                      ) }
                    </Row>
                  :
                    <div>{item.content}</div>
              }
            </Card>
          )
        )
      }
      <BackTop>
        <div className="ant-back-top">UP</div>
      </BackTop>
    </>
  )
}