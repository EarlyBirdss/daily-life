import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchDiaryList(params: object) {
  return request(HOST + '/diary/fetchDiaryList', {...params});
};

export function fetchModuleList() {
  return request(HOST + '/diary/fetchModuleList');
}

export function fetchLogList(params: object) {
  return request(HOST + '/diary/fetchLogList', {...params});
}