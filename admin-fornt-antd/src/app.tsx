import { AvatarDropdown, AvatarName, Footer, Question, SelectLang } from '@/components';
import { errorConfig } from '@/requestErrorConfig';
import { getCurrentUser } from '@/services/auth';
import { isMobile, TOKEN_KEY } from '@/utils/constant';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';
const whitePaths = ['/FaceCheckIn'];

const getFetchUserInfo = async () => {
  try {
    const { data } = await getCurrentUser({
      skipErrorHandler: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
  return undefined;
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<AppInitialState> {
  const { location } = history;
  const pathname = location.pathname;
  const token = localStorage.getItem(TOKEN_KEY);
  const settingsConfig = defaultSettings as Partial<LayoutSettings>;
  console.log('getInitialState isMobile=', isMobile(), pathname);

  // 白名单放行
  if (whitePaths.includes(pathname)) {
    history.push(pathname);
    return {
      settings: settingsConfig,
    };
  }

  // 未登录，且不是在登录页，跳转登录页
  if (!token && location.pathname !== loginPath) {
    history.push(loginPath);
    return {
      settings: settingsConfig,
    };
  }

  // 已登录，尝试获取用户信息
  if (token) {
    try {
      const currentUser = await getFetchUserInfo();

      // 判断用户信息是否有效
      if (!currentUser || !currentUser.id) {
        // 用户信息无效，清除 token 并跳转登录
        localStorage.removeItem(TOKEN_KEY);
        history.push(loginPath);
        return {
          settings: settingsConfig,
        };
      }

      return {
        settings: settingsConfig,
        currentUser,
      };
    } catch (error) {
      console.error('获取用户信息失败:', error);
      localStorage.removeItem(TOKEN_KEY);
      history.push(loginPath);
    }
  }

  // 默认返回
  return {
    settings: settingsConfig,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src:
        initialState?.currentUser?.avatar ||
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title: <AvatarName />,
      render: (_dom: any, avatarChildren: any) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    footerRender: () => <Footer />,
    onPageChange: (location: Location) => {
      const pathname = location.pathname;
      const token = localStorage.getItem(TOKEN_KEY);
      console.log('onPageChange isMobile=', isMobile(), pathname);

      // 白名单放行
      if (whitePaths.includes(pathname)) {
        history.push(loginPath);
        return;
      }

      // 如果没有登录，重定向到 login
      if (!token && pathname !== loginPath) {
        history.push(loginPath);
      }

      // 如果是移动端且不是在 /mobile 开头，跳转到 /mobile
      if (isMobile() && !pathname.startsWith('/mobile')) {
        history.replace('/mobile');
      }
    },
    bgLayoutImgList: [],
    links: [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings: any) => {
                setInitialState((preInitialState: any) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    // menuDataRender: () => initialState?.routes || [],
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
