import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchTemplateList(params?: {}) {
  return request(HOST + '/diary/fetchTemplateList', { params });
}

export function fetchTemplateBasicDetail(params: { _id: string }){
  return request(HOST + '/diary/fetchTemplateBasicDetail', { params });
}

export function saveTemplateBasicDetail(params: object){
  return request(HOST + '/diary/saveTemplateBasicDetail', { method: 'POST', params });
}

export function deleteTemplate(params: { _id: string }){
  return request(HOST + '/diary/deleteTemplate', { method: 'DELETE', params });
}
