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

/** 新建用户 */
export async function addSysUser(data: API.SysUser, options?: { [key: string]: any }) {
  return request<API.R<API.SysUser>>('/sysUser/add', {
    method: 'POST',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 更新用户 */
export async function editSysUser(data: API.SysUser, options?: { [key: string]: any }) {
  return request<API.R<API.SysUser>>('/sysUser/edit', {
    method: 'PUT',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 删除用户  */
export async function removeSysUser(idList: any, options?: { [key: string]: any }) {
  return request<API.R<boolean>>('/sysUser/remove?idList=' + idList, {
    method: 'delete',
    data: {
      ...(options || {}),
    },
  });
}

/** 查询用户明细  */
export async function getSysUser(id: number, options?: { [key: string]: any }) {
  return request<API.R<API.SysUser>>('/sysUser/get/' + id, {
    method: 'get',
    data: {
      ...(options || {}),
    },
  });
}

/** 上传用户人脸 */
export async function addUserFace(id: number, data: Array<string>) {
  return request<API.R<boolean>>('/sysUser/addUserFace/' + id, {
    method: 'POST',
    data: data,
  });
}

/** 获取用户人脸  */
export async function getUserFace(id: number, options?: { [key: string]: any }) {
  return request<API.R<Array<string>>>('/sysUser/getUserFace/' + id, {
    method: 'get',
    data: {
      ...(options || {}),
    },
  });
}
