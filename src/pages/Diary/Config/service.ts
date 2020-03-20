import { request } from '@/utils';

export function fetchDiaryList(params?: {}) {
  return request('/diary/fetchDiaryList', { ...params });
}