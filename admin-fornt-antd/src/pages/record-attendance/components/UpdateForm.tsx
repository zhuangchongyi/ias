import { editSysRecordAttendance, getSysRecordAttendance } from '@/services/recordAttendance';
import { PpunchSourceEnum, PunchModeEnum, PunchTypeEnum } from '@/utils/enums';
import {
  ModalForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { FC } from 'react';
interface UpdateFormProps {
  trigger: JSX.Element;
  values: Partial<API.SysRecordAttendance>;
  onOk?: () => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();

  const { run: runEdit, loading } = useRequest(editSysRecordAttendance, {
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
    const { data } = await getSysRecordAttendance(values.id);
    if (!data) {
      return values;
    }
    return data;
  };

  return (
    <>
      {messageContextHolder}
      <ModalForm<API.SysRecordAttendance>
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

export default UpdateForm;
