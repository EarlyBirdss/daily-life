import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchDiaryList(params: object) {
  return request(HOST + '/diary/fetchDiaryList', { params });
};

export function fetchModuleList() {
  return request(HOST + '/diary/fetchModuleList');
}

export function fetchLogList(params: object) {
  return request(HOST + '/diary/fetchLogList', { params });
}

export function markGrade(params: object) {
  return request(HOST + '/diary/markGrade', { method: 'POST', params });
}

export function deleteDiary(params: object) {
  return request(HOST + '/diary/deleteDiary', { method: 'DELETE', params });
}