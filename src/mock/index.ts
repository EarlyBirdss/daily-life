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
    modifyAt: moment().format('YYYY-MM-DD HH:mm:ss'),
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

function createModule() {
  return [
    {
      id: 1,
      name: '今日计划',
      description: '每天的TODO LIST',
      controllerType: 'NONE',
      editable: false,
      type: 'TODO',
      createAt: '2019-12-22 10:10:11',
      modifyAt: '2019-12-22 10:10:11',
      children: [
        { id: 10001, parentId: 1, name: '06:30起床', description: '', type: 'TODO', editable: true, controllerType: 'NONE', createAt: '2019-12-22 10:10:11', },
        { id: 10002, parentId: 1, name: '阅读', description: '', type: 'TODO', editable: true, controllerType: 'NONE', createAt: '2019-12-22 10:10:11', },
        { id: 10003, parentId: 1, name: '周六野斜方肌', description: '', type: 'TODO', editable: true, controllerType: 'NONE', createAt: '2019-12-22 10:10:11', },
        { id: 10004, parentId: 1, name: '英语日记', description: '', type: 'TODO', editable: true, controllerType: 'NONE', createAt: '2019-12-22 10:10:11', },
        { id: 10005, parentId: 1, name: 'EF Lesson', description: '', type: 'TODO', editable: true, controllerType: 'NONE', createAt: '2019-12-22 10:10:11', },
      ]
    },
    // {
    //   id: 2,
    //   name: '饮食',
    //   children: [
    //     { id: 20001, name: '早餐' },
    //     { id: 20002, name: '早加餐' },
    //     { id: 20003, name: '午餐' },
    //     { id: 20004, name: '午加餐' },
    //     { id: 20005, name: '晚餐' },
    //     { id: 20006, name: '夜宵' },
    //   ]
    // },
    // { id: 3, name: 'English Diary' },
    // { id: 4, name: 'New Words' },
  ]
}

function createModuleDetail() {
  return { id: 10001, name: '06:30起床', description: '', type: 'TODO', editable: true, controllerType: 'NONE', createAt: '2019-12-22 10:10:11', };
};

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

function createTemplate() {
  return [
    { id: 100001, name: '通用模板', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', },
    { id: 100002, name: '周一', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', },
    { id: 100003, name: '周二', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', },
    { id: 100004, name: '周三', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', },
    { id: 100005, name: '周四', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', },
    { id: 100006, name: '周五', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', },
    { id: 100007, name: '周六', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', },
  ]
}

function createTemplateDetail() {
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
      }
    ]
  }
}

function createTemplateBasicDetail() {
  return { id: 100001, name: '通用模板', description: '', createAt: '2020-05-20 15:20:20', modifyAt: '2020-05-20 15:20:20', };
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

function createConfig() {
  return {
    todoList: [
      {
        id: 10001,
        name: '06:30起床',
        remark: '',
        createAt: '2019-12-22 10:10:11',
        modifyAt: '2019-12-22 10:10:11',
      },
      {
        id: 10002,
        name: '阅读',
        remark: '',
        createAt: '2019-12-22 10:10:11',
        modifyAt: '2019-12-22 10:10:11',
      },
    ],
    customModules: [
      {
        id: 1,
        name: ''
      }
    ]
  }
}

function createLogList() {
  return [
    {
      modifyAt: '2019-12-22 10:10:11',
      remark: '第一次修改，修改todoList',
    },
    {
      modifyAt: '2019-12-22 10:10:11',
      remark: '第二次修改，修改todoList',
    },
    {
      modifyAt: '2019-12-22 10:10:11',
      remark: '第三次修改，修改todoList',
    },
  ]
}


fetchMock.mock('/diary/fetchDiaryList',
  { success: true, data: { list: createDiaryList(), pagitation: {  }, customsColumns: [{ id: 10001, name: '06:30起床' }, { id: 20001, name: '早餐' }] }, tip: '获取成功' },
  { delay: 100 }
);

fetchMock.mock('/diary/fetchModuleList', { success: true, data: createModuleList(), tip: '获取成功' });

fetchMock.mock('/diary/fetchTemplateList', { success: true, data: createTemplateList(), tip: '获取成功' });

fetchMock.mock('/diary/fetchDetail', { success: true, data: createContent(), tip: '获取成功' });

fetchMock.mock('/diary/fetchTemplateContent', { success: true, data: createTemplateContent(), tip: '获取成功' });

fetchMock.mock('/diary/fetchModulesById', { success: true, data: createTodoItem(), tip: '获取成功' });

fetchMock.mock('/diary/fetchConfig', {  success: true, data: createConfig(), tip: '获取成功' });

fetchMock.mock('/diary/fetchLogList', {  success: true, data: createLogList(), tip: '获取成功' });

fetchMock.mock('/diary/fetchModule', { success: true, data: createModule(), tip: '获取成功' });

fetchMock.mock('/diary/fetchModuleDetail', { success: true, data: createModuleDetail(), tip: '获取成功' });

fetchMock.mock('/diary/updateModuleDetail', { success: true, data: 1, tip: '获取成功' });

fetchMock.mock('/diary/deleteModule', { success: true, data: 1, tip: '获取成功' });

fetchMock.mock('/diary/fetchTemplate', { success: true, data: createTemplate(), tip: '获取成功' });

fetchMock.mock('/diary/fetchTemplateDetail', { success: true, data: createTemplateDetail(), tip: '获取成功' });

fetchMock.mock('/diary/fetchTemplateBasicDetail', { success: true, data: createTemplateBasicDetail(), tip: '获取成功' });

fetchMock.mock('/diary/updateTemplateDetail', { success: true, data: 1, tip: '获取成功' });

fetchMock.mock('/diary/updateTemplateBasicDetail', { success: true, data: 1, tip: '获取成功' });

fetchMock.mock('/diary/deleteTemplate', { success: true, data: 1, tip: '获取成功' });
