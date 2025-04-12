import FormUploadButton from '@/components/Form/UploadButton';
import { editSysUser, getSysUser } from '@/services/user';
import { joinIntlMessages } from '@/utils';
import { GenderEnum, StatusEnum } from '@/utils/enums';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { FC } from 'react';

interface UpdateFormProps {
  trigger: JSX.Element;
  values: Partial<API.SysUser>;
  onOk?: () => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  const { run: runEdit, loading } = useRequest(editSysUser, {
    manual: true,
    onSuccess: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
      onOk?.();
    },
    onError: () => {
      messageApi.error(intl.formatMessage({ id: 'message.operation.failure' }));
    },
  });

  const getInfo = async () => {
    let { data } = await getSysUser(values.id);
    if (!data) {
      data = values;
    }
    return {
      ...data,
      avatar: data.avatar
        ? [{ uid: '-1', name: 'avatar.png', status: 'done', url: data.avatar }]
        : [],
    };
  };

  return (
    <>
      {contextHolder}
      <ModalForm<API.SysUser>
        title={intl.formatMessage({ id: 'pages.common.edit' })}
        trigger={trigger}
        width={600}
        modalProps={{ okButtonProps: { loading } }}
        request={getInfo}
        onFinish={async (formValues) => {
          await runEdit({ ...values, ...formValues });
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
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysUser.search.status" />}
          options={StatusEnum.options}
        />
        <FormUploadButton
          name="avatar"
          label={<FormattedMessage id="pages.SysUser.search.avatar" />}
        />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
