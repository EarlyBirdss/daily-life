import DiaryList from '@/pages/Diary/List';
import DiaryModify from '@/pages/Diary/modify';
import DiaryDetail from '@/pages/Diary/detail';
import Config from '@/pages/Config';

export default [
  { path: '/diary/list', component: DiaryList },
  { path: '/diary/detail', component: DiaryDetail },
  { path: '/diary/modify', component: DiaryModify },
  { path: '/diary/config', component: Config },
];