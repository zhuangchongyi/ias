// @ts-ignore
/* eslint-disable */
import { TOKEN_KEY } from '@/config';
import { history, useIntl } from '@umijs/max';
import { message } from 'antd';
import { extend } from 'umi-request';

let isRefreshing = false; // 防止多次触发跳转

/** 创建可调用的 `request` 实例 */
const request = extend({
  timeout: 10000, // 请求超时时间
  prefix: process.env.UMI_APP_BASE_URL, // 统一 API 前缀
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
  const status = response.status;

  // 如果是网关超时或服务器错误，统一提示
  if (status === 504) {
    const intl = useIntl();
    const msg = intl.formatMessage({id: 'message.request.timeout'});
    message.error(msg);
    throw new Error(`${msg} (${status})`);
  }
  if (status >= 500) {
    const intl = useIntl();
    const msg = intl.formatMessage({id: 'message.system.error'});
    message.error(msg);
    throw new Error(`${msg} (${status})`);
  }

  // 判断是否是 JSON
  const clone = response.clone();
  const contentType = clone.headers.get('content-type') || 'application/json';

  if (contentType.includes('application/json')) {
    try {
      const data = await clone.json();
      if (data.code === 401) handleLogout();
      return data;
    } catch (e) {
      const intl = useIntl();
      const msg = intl.formatMessage({id: 'message.data.formatting.error'});
      message.error(msg);
      throw e;
    }
  }
  return clone;
});

export default request;
