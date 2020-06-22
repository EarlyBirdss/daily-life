import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select  } from 'antd';
import { fetchModuleDetail, updateModuleDetail } from './service';
import { ControllerTypes } from '@/configs/constant.config';
import { ModifyProps, DetailProps } from './types';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function Modify(props: ModifyProps) {
  const { _id, parentId, onClose = function(){}, form } = props;
  const { getFieldDecorator, validateFields } = form;
  const [detail, setDetail] = useState({});

  useEffect(() => {
    _id && fetchModuleDetail({ _id, parentId }).then(({ data }: { data: DetailProps }) => {
      setDetail(data);
    });
  }, []);

  const handleSubmit = () => {
    validateFields((err: any, values: object) => {
      if (!err) {
        updateModuleDetail({ _id, parentId, ...values }).then(() => onClose(true));
      }
    });
  };

  return (
    <Modal
      title={_id ? '编辑模块' : '新增模块'}
      width={560}
      okText="确定"
      cancelText="取消"
      onOk={handleSubmit}
      onCancel={() => onClose(false)}
      visible={true}
      >
        <Form.Item label="模块名称" {...formLayout}>
          {
            getFieldDecorator('name', {
              initialValue: detail.name,
              rules: [
                { required: true, message: '请输入模块名称' }
              ]
            })(<Input placeholder="请输入模块名称" max={50} />)
          }
        </Form.Item>
        <Form.Item label="编辑框类型" {...formLayout}>
          {
            getFieldDecorator('controllerType', {
              initialValue: detail.controllerType,
              rules: [
                { required: true, message: '请选择编辑框类型' }
              ]
            })(<Select placeholder="请选择编辑框类型" style={{ width: '100%' }}>
              { ControllerTypes.map(({ _id: id, name } : { _id: string, name: string }) => <Select.Option value={id} key={id}>{name}</Select.Option>) }
            </Select>)
          }
        </Form.Item>
        <Form.Item label="模块描述" {...formLayout}>
          {
            getFieldDecorator('description', {
              initialValue: detail.description,
              rules: [
                { required: true, message: '请输入模块描述' }
              ]
            })(<Input.TextArea placeholder="请输入模块描述" />)
          }
        </Form.Item>
    </Modal>
  )
}

export default Form.create()(Modify);