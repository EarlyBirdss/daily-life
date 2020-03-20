import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function fetchDiaryDetail(params?: any) {
  return request(HOST + '/diary/fetchDiaryDetail', {...params});
}
