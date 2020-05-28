import moment from 'moment';
import { FULL_DATE_FORMAT, PLACEHOLDER_LABEL } from '@/configs/constant.config';

export const columns = [
  {
    dataIndex: 'id',
    title: '模块ID',
  },
  {
    dataIndex: 'name',
    title: '模块名称',
  },
  {
    dataIndex: 'description',
    title: '模块描述',
  },
  {
    dataIndex: 'controllerType',
    title: '编辑框类型',
  },
  {
    dataIndex: 'createAt',
    title: '创建时间',
    render: (time: any) => moment(time).format(FULL_DATE_FORMAT)
  },
  {
    dataIndex: 'modifyAt',
    title: '最近修改时间',
    render: (time: any) => time ? moment(time).format(FULL_DATE_FORMAT) : PLACEHOLDER_LABEL
  },
];
