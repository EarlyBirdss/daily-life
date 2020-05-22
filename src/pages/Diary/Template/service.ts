import { request } from '@/utils';

export function fetchTemplate(params?: {}) {
  return request('/diary/fetchTemplate', { ...params });
}

export function fetchTemplateBasicDetail(params: { id: number }){
  return request('/diary/fetchTemplateBasicDetail', { ...params });
}

export function updateTemplateBasicDetail(params: object){
  return request('/diary/updateTemplateBasicDetail', { ...params });
}

export function deleteTemplate(params: { id: number }){
  return request('/diary/deleteTemplate', { ...params });
}