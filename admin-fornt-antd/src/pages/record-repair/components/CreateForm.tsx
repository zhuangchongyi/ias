import { addSysRecordRepair } from '@/services/recordRepair';
import { RecordRepairStatusEnum, RepairTypeEnum } from '@/utils/enums';
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

  const { run: runAdd, loading } = useRequest(addSysRecordRepair, {
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
          await runAdd(value as API.SysRecordRepair);
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

export default CreateForm;
