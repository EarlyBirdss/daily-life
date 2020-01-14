export const columns = [
  {
    dataIndex: 'sortId', title: '当前第N天',
    sorter: (a, b) => a.sorted - b.sorted,
    // sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
  },
  { dataIndex: 'date', title: '日期' },
  { dataIndex: 'completedModules', title: '完成模块概览' },
  { dataIndex: 'placeholder', title: '筛选模块列', placeholder: true },
  { dataIndex: 'modifyTime', title: '修改时间' },
  { dataIndex: 'grade', title: '分数' },
];