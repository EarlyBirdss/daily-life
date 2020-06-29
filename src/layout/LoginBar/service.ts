import { request } from '@/utils';
import { HOST } from '@/configs/constant.config';

export function login(params: { userName: string, password: string }) {
  return request(HOST + '/user/login', { method: 'POST', params });
}

export function loginOut(params: { userId: string }) {
  return request(HOST + '/user/loginOut', { method: 'POST', params });
}

export function register(params: { userName: string, password: string }) {
  return request(HOST + '/user/register', { method: 'POST', params });
}
