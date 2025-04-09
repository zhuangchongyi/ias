import { request } from '@umijs/max';
import { getCity, getCurrentUse, getProvince } from './_mock';

export async function queryCurrent(): Promise<{ data: any }> {
  return getCurrentUse();
}

export async function queryProvince(): Promise<{ data: any[] }> {
  return getProvince();
}

export async function queryCity(province: string): Promise<{ data: any[] }> {
  return getCity(province);
}

export async function query() {
  return request('/api/users');
}
