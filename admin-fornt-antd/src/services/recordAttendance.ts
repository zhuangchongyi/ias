// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 获取打卡记录列表 */
export async function pageSysRecordAttendance(
  params?: API.Page<API.SysRecordAttendance>,
  options?: { [key: string]: any },
) {
  return request<API.R<API.SysRecordAttendance>>('/sysRecordAttendance/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建打卡记录 */
export async function addSysRecordAttendance(data: API.SysRecordAttendance, options?: { [key: string]: any }) {
  return request<API.R<API.SysRecordAttendance>>('/sysRecordAttendance/add', {
    method: 'POST',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 更新打卡记录 */
export async function editSysRecordAttendance(data: API.SysRecordAttendance, options?: { [key: string]: any }) {
  return request<API.R<API.SysRecordAttendance>>('/sysRecordAttendance/edit', {
    method: 'PUT',
    data: {
      ...data,
      ...(options || {}),
    },
  });
}

/** 删除打卡记录  */
export async function removeSysRecordAttendance(idList: any, options?: { [key: string]: any }) {
  return request<API.R<boolean>>('/sysRecordAttendance/remove?idList=' + idList, {
    method: 'delete',
    data: {
      ...(options || {}),
    },
  });
}

/** 查询打卡记录明细  */
export async function getSysRecordAttendance(id: number, options?: { [key: string]: any }) {
  return request<API.R<API.SysRecordAttendance>>('/sysRecordAttendance/get/' + id, {
    method: 'get',
    data: {
      ...(options || {}),
    },
  });
}
