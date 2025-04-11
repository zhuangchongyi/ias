import { editSysRole, getSysRole } from '@/services/role';
import { joinIntlMessages } from '@/utils';
import { StatusEnum } from '@/utils/enums';
import { ModalForm, ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { FC } from 'react';

interface UpdateFormProps {
  trigger: JSX.Element;
  values: Partial<API.SysRole>;
  onOk?: () => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  const { run: runEdit, loading } = useRequest(editSysRole, {
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
    const { data } = await getSysRole(values.id);
    if (!data) {
      return values;
    }
    return data;
  };

  return (
    <>
      {contextHolder}
      <ModalForm<API.SysRole>
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
          name="roleKey"
          label={<FormattedMessage id="pages.SysRole.search.roleKey" />}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysRole.search.roleKey',
              ]),
            },
          ]}
        />
        <ProFormText
          name="roleName"
          label={<FormattedMessage id="pages.SysRole.search.roleName" />}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysRole.search.roleName',
              ]),
            },
          ]}
        />
        <ProFormDigit
          name="orderNum"
          min={1}
          max={100000}
          label={<FormattedMessage id="pages.SysRole.search.orderNum" />}
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysRole.search.status" />}
          options={StatusEnum.options}
        />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
