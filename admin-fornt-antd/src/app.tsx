import { AvatarDropdown, AvatarName, Footer, Question, SelectLang } from '@/components';
import { TOKEN_KEY } from '@/config';
import { errorConfig } from '@/requestErrorConfig';
import { getCurrentUser, getRoutes } from '@/services/auth';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import localRoutes from '../config/routes';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

const getFetchUserInfo = async () => {
  try {
    const { data } = await getCurrentUser({
      skipErrorHandler: true,
    });
    //追加入localRoutes返回
    return data;
  } catch (error) {
    history.push(loginPath);
  }
  return undefined;
};

const getFetchRoutesData = async () => {
  try {
    const { data } = await getRoutes();
    console.log(data);
    return data || [];
  } catch (error) {
    console.log('获取路由数据失败', error);
  }
  return [];
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: BaseTypes.CurrentUser;
  routes?: BaseTypes.Route[];
  loading?: boolean;
}> {
  const { location } = history;

  // 判断是否登录
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    history.push(loginPath);
  } else if (location.pathname === loginPath) {
    history.push('/');
  }

  // 如果不是登录页面，执行
  if (location.pathname !== loginPath) {
    // 获取用户信息
    const currentUser = await getFetchUserInfo();
    // 获取路由数据
    const backendRoutes = await getFetchRoutesData();
    const routes: BaseTypes.Route[] = [
      ...localRoutes.map((route) => ({
        ...route,
      })),
      ...backendRoutes,
    ];
    return {
      currentUser,
      routes,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      const token = localStorage.getItem(TOKEN_KEY);
      // 如果没有登录，重定向到 login
      if (!token && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [],
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    menuDataRender: () => initialState?.routes || [],
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
