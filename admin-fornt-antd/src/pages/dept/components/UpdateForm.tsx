import { editSysDept, enableListSysDept, getSysDept } from '@/services/dept';
import { joinIntlMessages, listToTree } from '@/utils';
import { StatusEnum } from '@/utils/enums';
import {
  ModalForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { FC } from 'react';

interface UpdateFormProps {
  trigger: JSX.Element;
  values: Partial<API.SysDept>;
  onOk?: () => void;
}

const UpdateForm: FC<UpdateFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();

  const { run: runEdit, loading } = useRequest(editSysDept, {
    manual: true,
    onSuccess: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
      onOk?.();
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

  const getInfo = async () => {
    const { data } = await getSysDept(values.id);
    if (!data) {
      return values;
    }
    return data;
  };

  return (
    <>
      {contextHolder}
      <ModalForm<API.SysDept>
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
        />
        <ProFormRadio.Group
          name="status"
          label={<FormattedMessage id="pages.SysDept.search.status" />}
          options={StatusEnum.options}
        />
      </ModalForm>
    </>
  );
};

export default UpdateForm;
