import { addSysRecordAttendance } from '@/services/recordAttendance';
import { PpunchSourceEnum, PunchModeEnum, PunchTypeEnum } from '@/utils/enums';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormDateTimePicker,
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

  const { run: runAdd, loading } = useRequest(addSysRecordAttendance, {
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
          await runAdd(value as API.SysRecordAttendance);
          return true;
        }}
      >
        <ProFormText
          name="userId"
          label={<FormattedMessage id="pages.SysRecordAttendance.search.userId" />}
        />
        <ProFormRadio.Group
          name="punchSource"
          label={<FormattedMessage id="pages.SysRecordAttendance.search.punchSource" />}
          options={PpunchSourceEnum.options}
        />
        <ProFormRadio.Group
          name="punchType"
          label={<FormattedMessage id="pages.SysRecordAttendance.search.punchType" />}
          options={PunchTypeEnum.options}
        />
        <ProFormRadio.Group
          name="punchMode"
          label={<FormattedMessage id="pages.SysRecordAttendance.search.punchMode" />}
          options={PunchModeEnum.options}
        />
        <ProFormDateTimePicker
          name="punchTime"
          label={<FormattedMessage id="pages.SysRecordAttendance.search.punchTime" />}
          fieldProps={{
            format: (value) => value.format('YYYY-MM-DD HH:mm:ss'),
          }}
        />
        <ProFormText
          name="location"
          label={<FormattedMessage id="pages.SysRecordAttendance.search.location" />}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
