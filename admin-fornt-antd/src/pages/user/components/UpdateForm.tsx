import { editSysUser } from '@/services/user';
import { ModalForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { FC } from 'react';
import { GenderEnum, StatusEnum } from '@/utils/enums';

interface UpdateFormProps {
  trigger: JSX.Element;
  values: Partial<API.SysUser>;
  onOk?: () => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  const { run, loading } = useRequest(editSysUser, {
    manual: true,
    onSuccess: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
      onOk?.();
    },
    onError: () => {
      messageApi.error(intl.formatMessage({ id: 'message.operation.failure' }));
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm<API.SysUser>
        title={intl.formatMessage({ id: 'pages.config.edit', defaultMessage: '编辑用户' })}
        trigger={trigger}
        width={600}
        modalProps={{ okButtonProps: { loading } }}
        initialValues={values}
        onFinish={async (formValues) => {
          await run({ data: { ...values, ...formValues } });
          return true;
        }}
      >
        <ProFormText
          name="username"
          label={<FormattedMessage id="pages.SysUser.search.username" defaultMessage="用户名" />}
          placeholder="请输入用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        />
        <ProFormText
          name="nickname"
          label={<FormattedMessage id="pages.SysUser.search.nickname" defaultMessage="昵称" />}
          placeholder="请输入昵称"
        />
        <ProFormText
          name="email"
          label={<FormattedMessage id="pages.SysUser.search.email" defaultMessage="邮箱" />}
          placeholder="请输入邮箱"
        />
        <ProFormText
          name="phone"
          label={<FormattedMessage id="pages.SysUser.search.phone" defaultMessage="手机号" />}
          placeholder="请输入手机号"
        />
        <ProFormRadio.Group
          name="gender"
          label={<FormattedMessage id="pages.SysUser.search.gender" defaultMessage="性别" />}
          options={GenderEnum.options}
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysUser.search.status" defaultMessage="帐号状态" />}
          options={StatusEnum.options}
        />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
