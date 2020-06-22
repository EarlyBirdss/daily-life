import { Tag } from 'antd';
import moment from 'moment';
import { ONLY_DATE_FORMAT, FULL_DATE_FORMAT, PLACEHOLDER_LABEL } from '@/configs/constant.config';

export const columns = [
  {
    dataIndex: 'sortId',
    title: '当前第N天',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.sortId - b.sortId,
  },
  {
    dataIndex: 'date',
    title: '日期',
    render: (date: any) => date ? moment(date).format(ONLY_DATE_FORMAT) : PLACEHOLDER_LABEL
  },
  {
    dataIndex: 'completedModules',
    title: '完成模块概览',
    render: (completedModules: Array<string>) =>
      completedModules.length ? completedModules.join(', ') : PLACEHOLDER_LABEL
  },
  { dataIndex: 'placeholder', title: '筛选模块列', placeholder: true },
  {
    dataIndex: 'modifyAt',
    title: '修改时间',
    render: (date: any) => date ? moment(date).format(FULL_DATE_FORMAT) : PLACEHOLDER_LABEL
   },
  {
    dataIndex: 'grade',
    title: '分数',
    sorter: (a: any, b: any) => a.grade - b.grade,
  },
  {
    dataIndex: 'remark',
    title: '打分评论',
  }
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
    render: (date: any) => moment(date).format(FULL_DATE_FORMAT)
  },
  {
    dataIndex: 'remark',
    title: '修改备注',
  },
];