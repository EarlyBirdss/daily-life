export default [
  {
    name: '我的日志',
    icon: 'lock',
    path: '/diary',
    children: [
      {
        name: '日志列表',
        path: '/diary/list',
      },
      {
        name: '模板配置',
        path: '/diary/config'
      }
    ],
  }
];
