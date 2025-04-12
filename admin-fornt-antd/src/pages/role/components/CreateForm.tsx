import { addSysRole } from '@/services/role';
import { joinIntlMessages } from '@/utils';
import { StatusEnum } from '@/utils/enums';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormDigit,
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

  const { run: runAdd, loading } = useRequest(addSysRole, {
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
          await runAdd(value as API.SysRole);
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
          initialValue={1}
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysRole.search.status" />}
          options={StatusEnum.options}
          initialValue={1}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
