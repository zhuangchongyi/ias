/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
const { UMI_APP_BASE_URL = '/api' } = process.env;
export default {
  /**
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  // 如果需要自定义本地开发服务器  请取消注释按需调整
  dev: {
    [UMI_APP_BASE_URL]: {
      // 要代理的地址
      target: 'http://localhost:38080/',
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: {
        ['^' + UMI_APP_BASE_URL]: '',
      },
    },
  },
};
