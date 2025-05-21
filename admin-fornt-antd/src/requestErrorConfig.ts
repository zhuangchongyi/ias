import { TOKEN_KEY } from '@/utils/constant';
import type { AxiosResponse, RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { getIntl } from '@umijs/max';
import { message, notification } from 'antd';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  timeout: 10000, // 请求超时时间
  baseURL: process.env.UMI_APP_BASE_URL, // 统一 API 前缀

  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      const intl = getIntl();

      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        const msg = intl.formatMessage({ id: 'message.system.error' });
        message.error(`${msg} ${error.response.status}`);
      } else {
        // 发送请求时出了点问题
        message.error(intl.formatMessage({ id: 'message.request.timeout' }));
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      // 从本地存储中获取 token
      const token = localStorage.getItem(TOKEN_KEY);

      // 如果 token 存在，则将其添加到请求头中
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response: AxiosResponse) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;
      const { msg, code } = data as API.R<any>;

      const intl = getIntl();

      // 判断登录过期
      if (code === 401) {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          // 删除 token
          localStorage.removeItem(TOKEN_KEY);
        }
        // 显示错误信息
        message.error(msg);
        throw new Error(msg);
      }

      if (code === 403) {
        message.error(msg);
        throw new Error(msg);
      }

      // 如果是网关超时或服务器错误，统一提示
      if (code >= 500) {
        const msg = intl.formatMessage({ id: 'message.system.error' });
        message.error(msg);
        throw new Error(`${msg} (${status})`);
      }

      return response;
    },
  ],
};
