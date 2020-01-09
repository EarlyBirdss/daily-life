import { request } from '@/utils';

export function getDairyList(params?: {}) {
  return request('/getDairyList', { ...params });
}