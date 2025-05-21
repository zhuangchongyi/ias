// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取角色列表 */
export async function pageSysRole(
  params?: API.Page<API.SysRole>,
  options?: { [key: string]: any },
) {
  return request<API.R<API.SysRole>>('/sysRole/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建角色 */
export async function addSysRole(data: API.SysRole, options?: { [key: string]: any }) {
  return request<API.R<API.SysRole>>('/sysRole/add', {
    method: 'POST',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 更新角色 */
export async function editSysRole(data: API.SysRole, options?: { [key: string]: any }) {
  return request<API.R<API.SysRole>>('/sysRole/edit', {
    method: 'PUT',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 删除角色  */
export async function removeSysRole(idList: any, options?: { [key: string]: any }) {
  return request<API.R<boolean>>('/sysRole/remove?idList=' + idList, {
    method: 'delete',
    data: {
      ...(options || {}),
    },
  });
}

/** 查询角色明细  */
export async function getSysRole(id: number, options?: { [key: string]: any }) {
  return request<API.R<API.SysRole>>('/sysRole/get/' + id, {
    method: 'get',
    data: {
      ...(options || {}),
    },
  });
}
