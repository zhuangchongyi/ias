import { editSysRecordRepair, getSysRecordRepair } from '@/services/recordRepair';
import { RecordRepairStatusEnum, RepairTypeEnum } from '@/utils/enums';
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
  values: Partial<API.SysRecordRepair>;
  onOk?: () => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();

  const { run: runEdit, loading } = useRequest(editSysRecordRepair, {
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
    const { data } = await getSysRecordRepair(values.id);
    if (!data) {
      return values;
    }
    return data;
  };

  return (
    <>
      {messageContextHolder}
      <ModalForm<API.SysRecordRepair>
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
          label={<FormattedMessage id="pages.SysRecordRepair.search.userId" />}
        />
        <ProFormText
          name="attendanceId"
          label={<FormattedMessage id="pages.SysRecordRepair.search.attendanceId" />}
        />
        <ProFormRadio.Group
          name="repairType"
          label={<FormattedMessage id="pages.SysRecordRepair.search.repairType" />}
          options={RepairTypeEnum.options}
        />
        <ProFormDateTimePicker
          name="repairTime"
          label={<FormattedMessage id="pages.SysRecordRepair.search.repairTime" />}
          fieldProps={{
            format: (value) => value.format('YYYY-MM-DD HH:mm:ss'),
          }}
        />
        <ProFormText
          name="reason"
          label={<FormattedMessage id="pages.SysRecordRepair.search.reason" />}
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysRecordRepair.search.status" />}
          options={RecordRepairStatusEnum.options}
        />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
