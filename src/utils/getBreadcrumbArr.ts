interface MenuConfig {
  path: string,
  name: string,
  children?: Array<MenuConfig>
}

export default function getBreadcrumbArr(menuConfig: Array<MenuConfig>, path: string, pathArr: undefined | Array<object>) : Array<object> {
  const res = pathArr || [{ name: '首页', path: '/' }];
  menuConfig.forEach(({ path: iPath, name, children }) => {
    if (path.includes(iPath)) {
      res.push({ name, path: iPath });
      children && getBreadcrumbArr(children, path, res);
    }
  });
  return res;
}
