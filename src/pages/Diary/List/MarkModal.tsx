import React, { useState, useEffect } from 'react';
import { Modal, Form, InputNumber, Input, message } from 'antd';
import { markGrade } from './service';
import { MarkModalProps } from './types';

function MarkModal(props: MarkModalProps) {
  const { dateString, _id, form, onClose } = props;
  const [visible, setVisible] = useState(!!_id);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  useEffect(() => {
    setVisible(!!_id);
  }, [_id]);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form.validateFields((err: any, values: any) => {
      if (!err) {
        markGrade({ _id, ...values })
          .then(() => {
            setVisible(false);
            onClose();
            message.success('日志已打分');
          });
      }
    });
  }

  return (
    <Modal
      title={`设置${dateString}分数`}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form.Item label="分数" {...formItemLayout}>
        {
          form.getFieldDecorator('grade', {
            initialValue: 90,
            rules: [{ required: true, message: '请输入分数'}]
          })(
            <InputNumber placeholder="请输入分数" min={0} max={100} style={{ width: '100%' }} />
          )
        }
      </Form.Item>
      <Form.Item label="评论" {...formItemLayout}>
        {
          form.getFieldDecorator('remark', {
          })(
            <Input.TextArea placeholder="请输入一句话评论" maxLength={30} />
          )
        }
      </Form.Item>
    </Modal>
  )
}

export default Form.create()(MarkModal);