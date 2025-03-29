// @ts-ignore
/* eslint-disable */
declare namespace BaseTypes {
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
   * 当前登录用户信息
   */
  type CurrentUser = {
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
    createId?: number;
    createBy?: string;
    createTime?: string;
    updateId?: number;
    updateBy?: string;
    updateTime?: string;
    delFlag?: number;
  };


}
