// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.R<string>>('/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.R<string>>('/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 发送验证码 */
export async function getFakeCaptcha(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.R<string>>('/auth/phoneCaptcha', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<API.R<API.CurrentUser>>('/auth/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}
