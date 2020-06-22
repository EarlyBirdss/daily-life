import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchModule(params?: {}) {
  return request(HOST + '/diary/fetchModule', { data: params });
}

export function fetchModuleDetail(params: { _id: number}) {
  return request(HOST + '/diary/fetchModuleDetail', { data: params });
}

export function updateModuleDetail(params: object) {
  return request(HOST + '/diary/updateModuleDetail', { method: 'POST', data: params });
}

export function deleteModule(params: object) {
  return request(HOST + '/diary/deleteModule', { method: 'DELETE', data: params });
}