import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select  } from 'antd';
import { fetchTemplateBasicDetail, updateTemplateBasicDetail } from './service';
import { ModifyProps, DetailProps } from './types';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function Modify(props: ModifyProps) {
  const { id, onClose = function(){}, form } = props;
  const { getFieldDecorator, validateFields } = form;
  const [detail, setDetail] = useState({});

  useEffect(() => {
    id && fetchTemplateBasicDetail({ id }).then(({ data }: { data: DetailProps }) => {
      setDetail(data);
    });
  }, []);

  const handleSubmit = () => {
    validateFields((err: any, values: object) => {
      if (!err) {
        updateTemplateBasicDetail(id ? { id, ...values } : { ...values }).then(() => onClose(true));
      }
    });
  };

  return (
    <Modal
      title={id ? '编辑模板' : '新增模板'}
      width={560}
      okText="确定"
      cancelText="取消"
      onOk={handleSubmit}
      onCancel={() => onClose(false)}
      visible={true}
      >
        <Form.Item label="模板名称" {...formLayout}>
          {
            getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [
                { required: true, message: '请输入模板名称' }
              ]
            })(<Input placeholder="请输入模板名称" max={20} />)
          }
        </Form.Item>
        <Form.Item label="模板描述" {...formLayout}>
          {
            getFieldDecorator('description', {
              initialValue: detail.description,
              rules: [
                { required: true, message: '请输入模板描述' }
              ]
            })(<Input.TextArea placeholder="请输入模板描述" />)
          }
        </Form.Item>
    </Modal>
  )
}

export default Form.create()(Modify);