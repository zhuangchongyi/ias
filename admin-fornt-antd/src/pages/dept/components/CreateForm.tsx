import { addSysDept, enableListSysDept } from '@/services/dept';
import { joinIntlMessages, listToTree } from '@/utils';
import { StatusEnum } from '@/utils/enums';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
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

  const { run: runAdd, loading } = useRequest(addSysDept, {
    manual: true,
    onSuccess: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
      reload?.();
    },
    onError: () => {
      messageApi.error(intl.formatMessage({ id: 'message.operation.failure' }));
    },
  });

  // 获取部门列表作为树结构
  const deptTreeSelect = async () => {
    const res = await enableListSysDept({});
    const list = res.data || [];
    return listToTree(list);
  };

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
          await runAdd(value as API.SysDept);
          return true;
        }}
      >
        <ProFormTreeSelect
          name="parentId"
          label={<FormattedMessage id="pages.SysDept.search.parentId" />}
          request={deptTreeSelect}
          fieldProps={{
            fieldNames: {
              label: 'deptName',
              value: 'id',
              children: 'children',
            },
            allowClear: true,
            showSearch: true,
          }}
        />
        <ProFormText
          name="deptName"
          label={<FormattedMessage id="pages.SysDept.search.deptName" />}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.input',
                'pages.SysDept.search.deptName',
              ]),
            },
          ]}
        />
        <ProFormDigit
          name="orderNum"
          min={1}
          max={100000}
          label={<FormattedMessage id="pages.SysDept.search.orderNum" />}
          initialValue={1}
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysDept.search.status" />}
          options={StatusEnum.options}
          initialValue={1}
        />
      </ModalForm>
    </>
  );
};

export default CreateForm;
