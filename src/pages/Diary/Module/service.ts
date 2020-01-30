import { request } from '@/utils';

export function fetchModule(params?: {}) {
  return request('/diary/fetchModule', { ...params });
}

export function fetchModuleDetail(params: { id: number}) {
  return request('/diary/fetchModuleDetail', { ...params });
}

export function updateModuleDetail(params: object) {
  return request('/diary/updateModuleDetail', { ...params });
}

export function deleteModule(params: object) {
  return request('/diary/deleteModule', { ...params });
}