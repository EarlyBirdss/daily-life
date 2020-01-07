import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuConfig from './menu.config';

export default function SideMenu(props) {
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
            menu.children && menu.children.map(childMenu =>
              <Menu.Item key={childMenu.path}>
                <Link to={childMenu.path}>{childMenu.title}</Link>
              </Menu.Item>
            )
          }
        </Menu.SubMenu>
      )
    }
    </Menu>
  );
}
