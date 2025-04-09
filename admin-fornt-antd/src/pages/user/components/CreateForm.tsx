import { addSysUser } from '@/services/user';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormDigit,
  ProFormInstance,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import { FC, useRef } from 'react';
import { GenderEnum, StatusEnum } from '@/utils/enums';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = ({ reload }) => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();
  const formRef = useRef<ProFormInstance>();

  const { run, loading } = useRequest(addSysUser, {
    manual: true,
    onSuccess: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
      reload?.();
    },
    onError: () => {
      messageApi.error(intl.formatMessage({ id: 'message.operation.failure' }));
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        formRef={formRef}
        title={<FormattedMessage id="pages.config.add" defaultMessage="Add User" />}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="pages.config.add" defaultMessage="Add" />
          </Button>
        }
        width={600}
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          await run({ data: value as API.SysUser });
          return true;
        }}
      >
        <ProFormText
          name="username"
          label={<FormattedMessage id="pages.SysUser.search.username" defaultMessage="用户名" />}
          rules={[{ required: true, message: '请输入用户名' }]}
        />
        <ProFormText.Password
          name="password"
          label={<FormattedMessage id="pages.SysUser.search.password" defaultMessage="密码" />}
          rules={[{ required: true, message: '请输入密码' }]}
        />
        <ProFormText
          name="nickname"
          label={<FormattedMessage id="pages.SysUser.search.nickname" defaultMessage="昵称" />}
        />
        <ProFormText
          name="email"
          label={<FormattedMessage id="pages.SysUser.search.email" defaultMessage="邮箱" />}
          rules={[{ type: 'email', message: '邮箱格式不正确' }]}
        />
        <ProFormText
          name="phone"
          label={<FormattedMessage id="pages.SysUser.search.phone" defaultMessage="手机号" />}
          rules={[{ pattern: /^1[3-9]\d{9}$/, message: '请输入合法手机号' }]}
        />
        <ProFormRadio.Group
          name="gender"
          label={<FormattedMessage id="pages.SysUser.search.gender" defaultMessage="性别" />}
          options={GenderEnum.options}
          initialValue={1}
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysUser.search.status" defaultMessage="帐号状态" />}
          options={StatusEnum.options}
          initialValue={1}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
