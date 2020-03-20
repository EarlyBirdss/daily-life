import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchTemplateList() {
  return request(HOST + '/diary/fetchTemplateList');
}

export function fetchDiaryDetail(params?: any) {
  return request(HOST + '/diary/fetchDiaryDetail', {...params});
}

export function fetchTemplateContent(params?: any) {
  return request(HOST + '/diary/fetchTemplateContent', {...params});
}

export function fetchModulesById(params: { id: string|number }) {
  return request(HOST + '/diary/fetchModulesById', {...params});
}
