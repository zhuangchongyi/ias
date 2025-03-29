// @ts-ignore
/* eslint-disable */
import { TOKEN_KEY } from '@/config';
import { history, useIntl } from '@umijs/max';
import { message } from 'antd';
import { extend } from 'umi-request';

let isRefreshing = false; // 防止多次触发跳转

/** 统一错误处理 */
const errorHandler = (error: any) => {
  console.error('请求错误:', error);
};

/** 创建可调用的 `request` 实例 */
const request = extend({
  timeout: 10000, // 请求超时时间
  prefix: process.env.UMI_APP_BASE_URL, // 统一 API 前缀
  errorHandler, // 统一错误处理
});

/** 处理登录过期 */
const handleLogout = () => {
  if (isRefreshing) return;
  isRefreshing = true;

  // 删除 token
  localStorage.removeItem(TOKEN_KEY);

  // 获取国际化提示
  const intl = useIntl();
  const msg = intl.formatMessage({
    id: 'message.login.expiration',
    defaultMessage: '登录已过期，请重新登录',
  });

  // 显示错误信息
  message.error(msg);

  // 跳转到登录页
  history.push('/login');

  // 2s 后允许再次触发（避免短时间内重复触发）
  setTimeout(() => {
    isRefreshing = false;
  }, 2000);

};

/** 请求拦截器 */
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    url,
    options: {
      ...options,
      headers: {
        ...options.headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
  };
});

/** 响应拦截器 */
request.interceptors.response.use(async (response) => {
  // 解析 JSON 数据
  const data = await response.clone().json();
  if (data.code === 401) {
    handleLogout();
  }
  return data;
});

export default request;
