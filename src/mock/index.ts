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
      id: 1,
      name: '今日计划',
      children: [
        { id: 10001, name: '06:30起床' },
        { id: 10002, name: '阅读' },
        { id: 10003, name: '周六野斜方肌' },
        { id: 10004, name: '英语日记' },
        { id: 10005, name: 'EF Lesson' },
      ]
    },
    {
      id: 2,
      name: '饮食',
      children: [
        { id: 20001, name: '早餐' },
        { id: 20002, name: '早加餐' },
        { id: 20003, name: '午餐' },
        { id: 20004, name: '午加餐' },
        { id: 20005, name: '晚餐' },
        { id: 20006, name: '夜宵' },
      ]
    },
    { id: 3, name: 'English Diary' },
    { id: 4, name: 'New Words' },
  ]
}

function createTemplateList() {
  return [
    { id: 100001, name: '通用模板' },
    { id: 100002, name: '周一' },
    { id: 100003, name: '周二' },
    { id: 100004, name: '周三' },
    { id: 100005, name: '周四' },
    { id: 100006, name: '周五' },
    { id: 100007, name: '周六' },
  ]
}

function createContent() {
  return {
    todoList: [
      { id: 10001, name: '06:30起床', completed: false, remark: '07:20' },
      { id: 10002, name: '阅读', completed: true, remark: '西窗小品' },
    ],
    customModules: [
      {
        id: 2,
        name: '饮食',
        remark: '',
        children: [
          {
            id: 20001,
            name: '早餐',
            content: '面包+一杯牛奶+3个猕猴桃',
            controllerType: 'INPUT',
           },
          { id: 20002, name: '早加餐' },
          { id: 20003, name: '午餐' },
          { id: 20004, name: '午加餐' },
          { id: 20005, name: '晚餐' },
          { id: 20006, name: '夜宵' },
        ]
      },
      {
        id: 3,
        name: 'English Diary',
        content: 'I am such a silly girl!',
      }
    ]
  }
}

function createTemplateContent() {
  return {
    todoList: [
      { id: 10001, name: '06:30起床', completed: false, remark: '07:20' },
      { id: 10002, name: '阅读', completed: false, remark: '西窗小品' },
    ],
    customModules: [
      {
        id: 2,
        name: '饮食',
        remark: '',
        children: [
          {
            id: 20001,
            name: '早餐',
            content: '',
            controllerType: 'INPUT',
           },
          { id: 20002, name: '早加餐' },
          { id: 20003, name: '午餐' },
          { id: 20004, name: '午加餐' },
          { id: 20005, name: '晚餐' },
          { id: 20006, name: '夜宵' },
        ]
      },
      {
        id: 3,
        name: 'English Diary',
        content: '',
        controllerType: 'INPUT',
      },
      {
        id: 4,
        name: 'New Words',
        content: '',
        controllerType: 'INPUT',
      }
    ]
  };
}

function createTodoItem() {
  return [
    { id: 10001, name: '06:30起床' },
    { id: 10002, name: '阅读' },
    { id: 10003, name: '周六野斜方肌' },
    { id: 10004, name: '英语日记' },
    { id: 10005, name: 'EF Lesson' },
  ]
}

fetchMock.mock('/fetchDiaryList',
  { success: true, data: { list: createDiaryList(), pagitation: {  }, customsColumns: [{ id: 10001, name: '06:30起床' }, { id: 20001, name: '早餐' }] }, tip: '获取成功' },
  { delay: 100 }
);

fetchMock.mock('/fetchModuleList', { success: true, data: createModuleList(), tip: '获取成功' });

fetchMock.mock('/fetchTemplateList', { success: true, data: createTemplateList(), tip: '获取成功' });

fetchMock.mock('/fetchDiaryDetail', { success: true, data: createContent(), tip: '获取成功' });

fetchMock.mock('/fetchTemplateContent', { success: true, data: createTemplateContent(), tip: '获取成功' });

fetchMock.mock('./fetchModulesById', { success: true, data: createTodoItem(), tip: '获取成功' });
