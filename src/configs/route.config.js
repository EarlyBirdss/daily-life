import DiaryList from '@/pages/Diary/List';
import DiaryModify from '@/pages/Diary/modify';
import DiaryDetail from '@/pages/Diary/detail';
import DiaryModule from '@/pages/Diary/Module';
import DiaryTemplate from '@/pages/Diary/Template';

export default [
  { path: '/diary/list', component: DiaryList },
  { path: '/diary/detail/view', component: DiaryDetail },
  { path: '/diary/detail/modify/:diaryId', component: DiaryModify },
  { path: '/diary/detail/create', component: DiaryModify },
  { path: '/diary/module/config', component: DiaryModule },
  { path: '/diary/template/config', component: DiaryTemplate },
  { path: '/diary/template/modify/:templateId', component: DiaryModify },
];
