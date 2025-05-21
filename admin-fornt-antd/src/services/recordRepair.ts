// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取补卡记录列表 */
export async function pageSysRecordRepair(
  params?: API.Page<API.SysRecordRepair>,
  options?: { [key: string]: any },
) {
  return request<API.R<API.SysRecordRepair>>('/sysRecordRepair/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建补卡记录 */
export async function addSysRecordRepair(data: API.SysRecordRepair, options?: { [key: string]: any }) {
  return request<API.R<API.SysRecordRepair>>('/sysRecordRepair/add', {
    method: 'POST',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 更新补卡记录 */
export async function editSysRecordRepair(data: API.SysRecordRepair, options?: { [key: string]: any }) {
  return request<API.R<API.SysRecordRepair>>('/sysRecordRepair/edit', {
    method: 'PUT',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 删除补卡记录  */
export async function removeSysRecordRepair(idList: any, options?: { [key: string]: any }) {
  return request<API.R<boolean>>('/sysRecordRepair/remove?idList=' + idList, {
    method: 'delete',
    data: {
      ...(options || {}),
    },
  });
}

/** 查询补卡记录明细  */
export async function getSysRecordRepair(id: number, options?: { [key: string]: any }) {
  return request<API.R<API.SysRecordRepair>>('/sysRecordRepair/get/' + id, {
    method: 'get',
    data: {
      ...(options || {}),
    },
  });
}
