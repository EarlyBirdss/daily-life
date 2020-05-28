import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchTemplate(params?: {}) {
  return request(HOST + '/diary/fetchTemplate', { ...params });
}

export function fetchTemplateBasicDetail(params: { id: number }){
  return request(HOST + '/diary/fetchTemplateBasicDetail', { ...params });
}

export function updateTemplateBasicDetail(params: object){
  return request(HOST + '/diary/updateTemplateBasicDetail', { ...params });
}

export function deleteTemplate(params: { id: number }){
  return request(HOST + '/diary/deleteTemplate', { ...params });
}