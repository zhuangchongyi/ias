// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取部门列表 */
export async function listSysDept(params?: API.SysDept, options?: { [key: string]: any }) {
  return request<API.R<API.SysDept>>('/sysDept/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取部门启用数据列表 */
export async function enableListSysDept(params?: API.SysDept, options?: { [key: string]: any }) {
  return request<API.R<API.SysDept>>('/sysDept/enableList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建部门 */
export async function addSysDept(data: API.SysDept, options?: { [key: string]: any }) {
  return request<API.R<API.SysDept>>('/sysDept/add', {
    method: 'POST',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 更新部门 */
export async function editSysDept(data: API.SysDept, options?: { [key: string]: any }) {
  return request<API.R<API.SysDept>>('/sysDept/edit', {
    method: 'PUT',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 删除部门  */
export async function removeSysDept(idList: any, options?: { [key: string]: any }) {
  return request<API.R<boolean>>('/sysDept/remove?idList=' + idList, {
    method: 'delete',
    data: {
      ...(options || {}),
    },
  });
}

/** 查询部门明细  */
export async function getSysDept(id: number, options?: { [key: string]: any }) {
  return request<API.R<API.SysDept>>('/sysDept/get/' + id, {
    method: 'get',
    data: {
      ...(options || {}),
    },
  });
}
