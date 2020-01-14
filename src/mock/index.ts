import fetchMock from 'fetch-mock';
import moment from 'moment';

/** 参考文档
 * http://www.wheresrhys.co.uk/fetch-mock/#aboutquickstart
 * params: url, respond, header
 */

function createDiaryList() {
  return new Array(12).fill({}).map((item, index) => ({
    id: index + 1,
    sortId: index + 100,
    date: moment().subtract('days', 12 - index).format('YYYY-MM-DD HH:mm:ss'),
    completedModules: ['今日计划', '饮食', 'English Diary'],
    modifyTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    grade: 90,
    module_10001: '√06:30起床',
    module_20001: '早餐'
  }));
}

function createModuleList() {
  return [
    {
      id: '1',
      name: '今日计划',
      children: [
        { id: '10001', name: '06:30起床' },
        { id: '10002', name: '阅读' }
      ]
    },
    {
      id: '2',
      name: '饮食',
      children: [
        { id: '20001', name: '早餐' },
        { id: '20002', name: '早加餐' },
        { id: '20003', name: '午餐' },
        { id: '20004', name: '午加餐' },
        { id: '20005', name: '晚餐' },
        { id: '20006', name: '夜宵' },
      ]
    },
    { id: '3', name: 'English Diary' },
    { id: '4', name: 'New Words' },
  ]
}

fetchMock.mock('/fetchDiaryList',
  { success: true, data: { list: createDiaryList(), pagitation: {  }, customsColumns: [{ id: '10001', name: '06:30起床' }, { id: '20001', name: '早餐' }] }, tip: '获取成功' },
  { delay: 100 }
);

fetchMock.mock('/fetchModuleList', { success: true, data: createModuleList(), tip: '获取成功' })
