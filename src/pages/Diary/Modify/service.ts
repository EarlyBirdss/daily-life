import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchTemplateList() {
  return request(HOST + '/diary/fetchTemplateList');
}

export function fetchDiaryDetail(params?: any) {
  return request(HOST + '/diary/fetchDiary', { params });
}

export function fetchTemplateDetail(params?: any) {
  return request(HOST + '/diary/fetchTemplateDetail', { params });
}

export function fetchTodoList() {
  return request(HOST + '/diary/fetchTodoList');
}

export function fetchModule() {
  return request(HOST + '/diary/fetchModule');
}

export function saveDiary(params: object) {
  return request(HOST + '/diary/saveDiary', { method: 'POST', params });
}

export function saveTemplate(params: object) {
  return request(HOST + '/diary/saveTemplate', { method: 'POST', params });
}
