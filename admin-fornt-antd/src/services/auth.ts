// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 登录接口 */
export async function login(body: BaseTypes.LoginParams, options?: { [key: string]: any }) {
  return request<BaseTypes.R<string>>('/auth/login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 */
export async function outLogin(options?: { [key: string]: any }) {
  return request<BaseTypes.R<string>>('/auth/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 发送验证码 */
export async function getFakeCaptcha(
  body: BaseTypes.LoginParams,
  options?: { [key: string]: any },
) {
  return request<BaseTypes.R<string>>('/auth/phoneCaptcha', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<BaseTypes.R<BaseTypes.CurrentUser>>('/auth/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取菜单 */
export async function getRoutes(options?: { [key: string]: any }) {
  return request<BaseTypes.R<BaseTypes.Route[]>>('/auth/getRoutes', {
    method: 'GET',
    ...(options || {}),
  });
}
