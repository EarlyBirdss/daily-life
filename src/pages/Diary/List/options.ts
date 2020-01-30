import { Tag } from 'antd';

export const columns = [
  {
    dataIndex: 'sortId',
    title: '当前第N天',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.sortId - b.sortId,
  },
  { dataIndex: 'date', title: '日期' },
  {
    dataIndex: 'completedModules',
    title: '完成模块概览',
    render: (completedModules: Array<string>) => completedModules.join(', ')
  },
  { dataIndex: 'placeholder', title: '筛选模块列', placeholder: true },
  { dataIndex: 'modifyAt', title: '修改时间' },
  {
    dataIndex: 'grade',
    title: '分数',
    sorter: (a: any, b: any) => a.grade - b.grade,
  },
];

export const logColumns = [
  {
    dataIndex: 'index',
    title: '序号',
    render: (...params: Array<any>) => params[2] +  1,
  },
  {
    dataIndex: 'modifyAt',
    title: '修改日期',
  },
  {
    dataIndex: 'remark',
    title: '修改备注',
  },
];