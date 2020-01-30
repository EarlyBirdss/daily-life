import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchTemplateList() {
  return request(HOST + '/fetchTemplateList');
}

export function fetchDiaryDetail(params?: any) {
  return request(HOST + '/fetchDiaryDetail', {...params});
}

export function fetchTemplateContent(params?: any) {
  return request(HOST + '/fetchTemplateContent', {...params});
}

export function fetchModulesById(params: { id: string|number }) {
  return request(HOST + '/fetchModulesById', {...params});
}
