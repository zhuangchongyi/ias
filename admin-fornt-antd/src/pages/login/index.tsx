import { Footer } from '@/components';
import { getFakeCaptcha, login } from '@/services/auth';
import { TOKEN_KEY } from '@/utils/constant';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, Helmet, SelectLang, useIntl } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import Settings from '../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const Lang = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginParams>({});
  const [type, setType] = useState<string>('account');
  const { styles } = useStyles();
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const { msg, data, success } = await login({ ...values, type });
      if (success && data) {
        const defaultLoginSuccessMessage = intl.formatMessage({ id: 'pages.login.success' });
        messageApi.success(defaultLoginSuccessMessage);
        // 设置token
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, data);
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get('redirect') || '/';
        return;
      }
      // TODO 如果失败去设置用户错误信息
      setUserLoginState({ status: !success, type, msg });
    } catch (error) {
      const failureMessage = intl.formatMessage({ id: 'pages.login.failure' });
      messageApi.error(failureMessage);
    }
  };

  const { status: loginStatus, type: loginType, msg: loginMsg } = userLoginState;

  return (
    <div className={styles.container}>
      {messageContextHolder}
      <Helmet>
        <title>
          {intl.formatMessage({ id: 'menu.login' })}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: intl.formatMessage({ id: 'pages.login.accountLogin.tab' }),
              },
              {
                key: 'mobile',
                label: intl.formatMessage({ id: 'pages.login.phoneLogin.tab' }),
              },
            ]}
          />

          {loginStatus && loginType === 'account' && (
            <LoginMessage content={loginMsg || intl.formatMessage({ id: 'pages.login.failure' })} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                initialValue={'admin'}
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({ id: 'pages.login.username.placeholder' })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.username.required" />,
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                initialValue={'123456'}
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({ id: 'pages.login.password.placeholder' })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.password.required" />,
                  },
                ]}
              />
            </>
          )}

          {loginStatus && loginType === 'mobile' && (
            <LoginMessage
              content={
                loginMsg || intl.formatMessage({ id: 'pages.login.phoneLogin.errorMessage' })
              }
            />
          )}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder={intl.formatMessage({ id: 'pages.login.phoneNumber.placeholder' })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.phoneNumber.required" />,
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: <FormattedMessage id="pages.login.phoneNumber.invalid" />,
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={intl.formatMessage({ id: 'pages.login.captcha.placeholder' })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({ id: 'pages.getCaptchaSecondText' })}`;
                  }
                  return intl.formatMessage({ id: 'pages.login.phoneLogin.getVerificationCode' });
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.captcha.required" />,
                  },
                ]}
                onGetCaptcha={async (phone) => {
                  const result = await getFakeCaptcha({
                    phone,
                  });
                  if (!result) {
                    return;
                  }
                  messageApi.success('获取验证码成功！验证码为：1234');
                }}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
