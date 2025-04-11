// @ts-ignore
/* eslint-disable */
import { TOKEN_KEY } from '@/utils/constant';
import { getIntl, history } from '@umijs/max';
import { message } from 'antd';
import { extend } from 'umi-request';

const loginPath = '/login';

/** 创建可调用的 `request` 实例 */
const request = extend({
  timeout: 10000, // 请求超时时间
  prefix: process.env.UMI_APP_BASE_URL, // 统一 API 前缀
});

/** 处理登录过期 */
const handleLogout = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    // 删除 token
    localStorage.removeItem(TOKEN_KEY);
  }
  // 显示错误信息
  const intl = getIntl();
  const msg = intl.formatMessage({ id: 'message.login.expiration' });
  message.error(msg);
  // 跳转到登录页
  history.push('/login');
  throw new Error(msg);
};

/** 请求拦截器 */
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token && history.location.pathname !== loginPath) {
    // 如果没有 token，跳转到登录页
    handleLogout();
  }
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
  const intl = getIntl();

  // 如果是网关超时或服务器错误，统一提示
  if (status === 504) {
    const msg = intl.formatMessage({ id: 'message.request.timeout' });
    message.error(msg);
    throw new Error(`${msg} (${status})`);
  }

  if (status >= 500) {
    const msg = intl.formatMessage({ id: 'message.system.error' });
    message.error(msg);
    throw new Error(`${msg} (${status})`);
  }

  // 判断是否是 JSON
  const clone = response.clone();
  const contentType = clone.headers.get('content-type') || 'application/json';

  if (contentType.includes('application/json')) {
    const data = await clone.json();
    if (data.code === 401) {
      handleLogout();
    }
    return data;
  }

  return clone;
});

export default request;
