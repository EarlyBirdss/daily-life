import React, { useState } from 'react';
import { Form, Modal, Input } from 'antd';
import { LoginModalProps, UserInfo } from './types';
import { STORAGE_USER_KEY, UserInfoInputType } from '@/configs/constant.config';
import { login, register } from './service';

function LoginModal(props: LoginModalProps) {
  const { visible, type = '', onClose, form } = props;
  console.log(props)
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const storeUserInfo = (userInfo: UserInfo) => {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userInfo));
  };

  const handleSubmit = () => {
    form.validateFields((err: any, values: { userName: string, password: string }) => {
      if (!err) {
        let fn = function() {};
        if (type === UserInfoInputType.LOGIN) {
          fn = login;
        } else if (type === UserInfoInputType.REGISTER) {
          fn = register;
        }

        fn({ ...values }).then(({ data }: { data: UserInfo }) => {
          onClose(true);
          storeUserInfo(data);
        });
      }
    });
  };
  const handleCancel = () => {
    onClose(false);
  }

  return (
    <Modal
      visible={visible}
      title={ type === UserInfoInputType.LOGIN ? '欢迎登录' : '欢迎注册' }
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item label="用户昵称" {...formLayout}>
          {
            form.getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户昵称'  }]
            })(<Input max={16} placeholder="请输入用户昵称" />)
          }
        </Form.Item>
        <Form.Item label="密码" {...formLayout}>
          {
            form.getFieldDecorator('password', {
            })(<Input max={16} placeholder="请输入密码" />)
          }
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(LoginModal);