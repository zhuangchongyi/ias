import FormUploadButton from '@/components/Form/UploadButton';
import { addSysUser } from '@/services/user';
import { joinIntlMessages } from '@/utils';
import { GenderEnum, StatusEnum } from '@/utils/enums';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, message } from 'antd';
import { FC, useRef } from 'react';

interface CreateFormProps {
  reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = ({ reload }) => {
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();
  const formRef = useRef<ProFormInstance>();

  const { run: runAdd, loading } = useRequest(addSysUser, {
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
      {messageContextHolder}
      <ModalForm
        formRef={formRef}
        title={<FormattedMessage id="pages.common.add" />}
        trigger={
          <Button type="primary" icon={<PlusOutlined />}>
            <FormattedMessage id="pages.common.add" />
          </Button>
        }
        width={600}
        modalProps={{ okButtonProps: { loading } }}
        onFinish={async (value) => {
          await runAdd(value as API.SysUser);
          return true;
        }}
      >
        <ProFormText
          name="username"
          label={<FormattedMessage id="pages.SysUser.search.username" />}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysUser.search.username',
              ]),
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          label={<FormattedMessage id="pages.SysUser.search.password" />}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysUser.search.password',
              ]),
            },
          ]}
        />
        <ProFormText
          name="nickname"
          label={<FormattedMessage id="pages.SysUser.search.nickname" />}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysUser.search.nickname',
              ]),
            },
          ]}
        />
        <ProFormText
          name="email"
          label={<FormattedMessage id="pages.SysUser.search.email" />}
          rules={[
            {
              type: 'email',
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysUser.search.email',
              ]),
            },
          ]}
        />
        <ProFormText
          name="phone"
          label={<FormattedMessage id="pages.SysUser.search.phone" />}
          rules={[
            {
              pattern: /^1[3-9]\d{9}$/,
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysUser.search.phone',
              ]),
            },
          ]}
        />
        <ProFormRadio.Group
          name="gender"
          label={<FormattedMessage id="pages.SysUser.search.gender" />}
          options={GenderEnum.options}
          initialValue={1}
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysUser.search.status" />}
          options={StatusEnum.options}
          initialValue={1}
        />
        <FormUploadButton
          name="avatar"
          label={<FormattedMessage id="pages.SysUser.search.avatar" />}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
