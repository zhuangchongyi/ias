// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取用户列表 */
export async function pageSysUser(
  params?: API.Page<API.SysUser>,
  options?: { [key: string]: any },
) {
  return request<API.R<API.SysUser>>('/sysUser/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新用户 */
export async function addSysUser(data: API.SysUser, options?: { [key: string]: any }) {
  return request<API.SysUser>('/sysUser/add', {
    method: 'POST',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 新建用户 */
export async function editSysUser(data: API.SysUser, options?: { [key: string]: any }) {
  return request<API.SysUser>('/sysUser/edit', {
    method: 'PUT',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 删除用户  */
export async function removeSysUser(idList: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/sysUser/remove?idList=' + idList, {
    method: 'delete',
    data: {
      ...(options || {}),
    },
  });
}
