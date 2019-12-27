import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuConfig from './menu.config';

export default function SideMenu(props) {
  const handelLink = path => {
    history.pushState(path);
  };
  return (
    <Menu
      mode="inline"
      style={{ border: 'none' }}
    >
    {
      menuConfig.map((menu, i) =>
        <Menu.SubMenu
          key={i}
          title={
            <span>
              { menu.icon && <Icon type={menu.icon} /> }
              <span>{ menu.title }</span>
            </span>
          }
          >
          {
            menu.children && menu.children.map((childMenu, j) =>
              <Link to={childMenu.path}>
                <Menu.Item key={j} onClick={() => handelLink(childMenu.path)}>{childMenu.title}</Menu.Item>
              </Link>
            )
          }
        </Menu.SubMenu>
      )
    }
    </Menu>
  );
}
