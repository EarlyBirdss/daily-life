import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchTemplateList() {
  return request(HOST + '/diary/fetchTemplateList');
}

export function fetchDiaryDetail(params?: any) {
  return request(HOST + '/diary/fetchDetail', {...params});
}

export function fetchTemplateDetail(params?: any) {
  return request(HOST + '/diary/fetchDetail', {...params});
}

export function fetchTemplateContent(params?: any) {
  return request(HOST + '/diary/fetchTemplateContent', {...params});
}

export function fetchTodoList() {
  return request(HOST + '/diary/fetchTodoList');
}

export function fetchModule() {
  return request(HOST + '/diary/fetchModule');
}

export function updateDiary(params: object) {
  return request(HOST + '/diary/updateDiary', { ...params });
}

export function saveTemplate(params: object) {
  return request(HOST + '/diary/saveTemplate', { ...params });
}