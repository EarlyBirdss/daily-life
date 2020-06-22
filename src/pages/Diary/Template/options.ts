import moment from 'moment';
import { FULL_DATE_FORMAT, PLACEHOLDER_LABEL } from '@/configs/constant.config';

export const colunms = [
  // {
  //   dataIndex: '_id',
  //   title: '模板ID',
  // },
  {
    dataIndex: 'name',
    title: '模板名称',
  },
  {
    dataIndex: 'description',
    title: '模板描述',
    render: (description: string) => description || PLACEHOLDER_LABEL
  },
  {
    dataIndex: 'createAt',
    title: '创建时间',
    render: (date: any) => date ? moment(date).format(FULL_DATE_FORMAT) : PLACEHOLDER_LABEL
  },
  {
    dataIndex: 'modifyAt',
    title: '最近修改时间',
    render: (date: any) => date ? moment(date).format(FULL_DATE_FORMAT) : PLACEHOLDER_LABEL
  },
];
