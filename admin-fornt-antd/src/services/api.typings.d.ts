// @ts-ignore
/* eslint-disable */
declare namespace API {
  ///////////////////////////////通用参数类型///////////////////////////////
  /**
   * 请求返回格式
   */
  type R<T> = {
    code: number;
    msg: string;
    success: boolean;
    data?: T;
  };
  /**
   * 分页基础参数
   */
  type Page<T> = {
    records?: T[];
    total?: number;
    current?: number;
    size?: number;
  };
  /**
   * 基础参数
   */
  type BaseEntity = {
    createId?: number;
    createBy?: string;
    createTime?: string;
    updateId?: number;
    updateBy?: string;
    updateTime?: string;
    delFlag?: string;
  };
  ///////////////////////////////通用参数类型///////////////////////////////

  /**
   * 登录参数
   */
  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
    phone?: string;
    code?: string;
    uuid?: string;
    status?: boolean;
    msg?: string;
  };
  /**
   * 当前登录用户
   */
  type CurrentUser = SysUser & {
    permissionList?: string[];
  };
  /**
   * 用户
   */
  type SysUser = BaseEntity &
    Page & {
      id?: number;
      username?: string;
      password?: string;
      nickname?: string;
      avatar?: string;
      email?: string;
      phone?: string;
      gender?: number;
      status?: number;
      loginIp?: string;
      loginDate?: string;
    };
  /**
   * 用户人脸
   */
  type SysUserFace = BaseEntity & {
    id?: number;
    userId?: number;
    fileUrl?: string;
    userFaces?: Array;
  };
  /**
   * 角色
   */
  type SysRole = BaseEntity &
    Page & {
      id?: number;
      roleKey?: string;
      roleName?: string;
      orderNum?: number;
      status?: number;
    };
  /**
   * 部门
   */
  type SysDept = BaseEntity &
    Page & {
      id?: number;
      parentId?: number;
      ancestors?: string;
      deptName?: string;
      orderNum?: number;
      status?: number;
    };
}
