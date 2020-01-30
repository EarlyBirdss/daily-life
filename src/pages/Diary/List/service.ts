import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchDiaryList(params: object) {
  return request(HOST + '/fetchDiaryList', {...params});
};

export function fetchModuleList() {
  return request(HOST + '/fetchModuleList');
}
