import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import menuConfig from '@/configs/menu.config';

export default function SideMenu() {
  const defaultOpenKeys = (() => {
    return menuConfig.length > 5 ? [menuConfig[0].name] : menuConfig.map(({ name }: { name: string }) => name);
  })();

  return (
    <Menu
      mode="inline"
      style={{ border: 'none' }}
      defaultOpenKeys={defaultOpenKeys}
    >
    {
      menuConfig.map((menu: { name: string, icon: string, children?: Array<any> }) =>
        <Menu.SubMenu
          key={menu.name}
          title={
            <span>
              { menu.icon && <Icon type={menu.icon} /> }
              <span>{ menu.name }</span>
            </span>
          }
          >
          {
            menu.children && menu.children.map(childMenu =>
              <Menu.Item key={childMenu.path}>
                <Link to={childMenu.path}>{childMenu.name}</Link>
              </Menu.Item>
            )
          }
        </Menu.SubMenu>
      )
    }
    </Menu>
  );
}
