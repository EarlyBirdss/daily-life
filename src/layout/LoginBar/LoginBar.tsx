import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { STORAGE_USER_KEY, UserInfoInputType } from '@/configs/constant.config';
import { UserInfo, FormUserInfo } from './types';
import LoginModal from './LoginModal';
import { login } from './service';

export default function LoginBar() {
  const [userInfo, setUserInfo] = useState(null);
  const [modalConfig, setModalConfig] = useState({});
  const [freshCount, setFreshCount] = useState(0);

  const handleLogin = function() {
    setModalConfig({ visible: true, type: UserInfoInputType.LOGIN});
  };

  const autoLogin = function(params: FormUserInfo) {
    login(params);
  };

  const handleRegister = function() {
    setModalConfig({ visible: true, type: UserInfoInputType.REGISTER});
  };

  const handleLoginOut = function() {
    localStorage.removeItem(STORAGE_USER_KEY);
    setUserInfo(null);
  };

  const onClose = function(isFresh: boolean) {
    setModalConfig({ visible: false });
    console.log(isFresh);
    isFresh && setFreshCount(freshCount + 1);
  };

  useEffect(() => {
    // TODO: 加密或采用其他方式处理
    const userStr = localStorage.getItem(STORAGE_USER_KEY);
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserInfo(user);
      autoLogin(user);
    }
  }, [freshCount]);

  return (
    <div style={{ textAlign: 'right' }}>
      {
        userInfo === null ? (<>
          <a onClick={handleLogin}>登录</a>
          <Divider type="vertical" />
          <a onClick={handleRegister}>注册</a>
        </>) :
        (<>
          <a>{ userInfo.userName }</a>
          <Divider type="vertical" />
          <a onClick={handleLoginOut}>退出登录</a>
        </>)
      }
      <LoginModal {...modalConfig} onClose={onClose} />
    </div>
  );
}