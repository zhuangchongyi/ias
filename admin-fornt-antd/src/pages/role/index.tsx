import { pageSysRole, removeSysRole } from '@/services/role';
import { StatusEnum } from '@/utils/enums';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, message, Modal } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.SysRole>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysRole[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();

  const { run: delSysRole, loading } = useRequest(removeSysRole, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
    },
    onError: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.failure' }));
    },
  });

  const handleRemove = useCallback(
    async (selectedRows: API.SysRole[]) => {
      if (!selectedRows?.length) {
        messageApi.warning(intl.formatMessage({ id: 'message.operation.success' }));
        return;
      }

      await delSysRole(selectedRows.map((row) => row.id).join());
    },
    [delSysRole],
  );

  const handleTableRequest = async (
    params: API.SysRole,
    sort: Record<string, any>,
    filter: Record<string, any>,
  ) => {
    params.size = params.pageSize;
    params.pageSize = undefined;
    const res: API.R<API.SysRole> = await pageSysRole(params);
    return {
      success: res.code === 200,
      data: res.data?.records || [],
      total: res.data?.total || 0,
    };
  };

  const columns: ProColumns<API.SysRole>[] = [
    {
      title: <FormattedMessage id="pages.SysRole.search.id" />,
      dataIndex: 'id',
      render: (_dom, row: any) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(row);
              setShowDetail(true);
            }}
          >
            {_dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.SysRole.search.roleKey" />,
      dataIndex: 'roleKey',
    },
    {
      title: <FormattedMessage id="pages.SysRole.search.roleName" />,
      dataIndex: 'roleName',
    },
    {
      title: <FormattedMessage id="pages.SysRole.search.orderNum" />,
      dataIndex: 'orderNum',
    },
    {
      title: <FormattedMessage id="pages.SysRole.search.status" />,
      dataIndex: 'status',
      valueEnum: StatusEnum.valueEnum,
    },
    {
      title: <FormattedMessage id="pages.common.search.createBy" />,
      dataIndex: 'createBy',
    },
    {
      title: <FormattedMessage id="pages.common.search.createTime" />,
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.common.search.updateBy" />,
      dataIndex: 'updateBy',
    },
    {
      title: <FormattedMessage id="pages.common.search.updateTime" />,
      dataIndex: 'updateTime',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.common.search.createTime" />,
      dataIndex: 'createTimeRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: [string, string]) => ({
          beginCreateTime: value[0],
          endCreateTime: value[1],
        }),
      },
    },
    {
      title: <FormattedMessage id="pages.common.search.updateTime" />,
      dataIndex: 'updateTimeRange',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value: [string, string]) => ({
          beginUpdateTime: value[0],
          endUpdateTime: value[1],
        }),
      },
    },
    {
      title: <FormattedMessage id="pages.common.option" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_dom, row: any) => [
        <UpdateForm
          trigger={
            <a>
              <FormattedMessage id="pages.common.edit" />
            </a>
          }
          key="edit"
          onOk={actionRef.current?.reload}
          values={row}
        />,
        <Button
          key="delete"
          type="text"
          danger
          onClick={async () => {
            modalApi.confirm({
              title: <FormattedMessage id="pages.common.confirm.delete" />,
              onOk: async () => {
                await handleRemove([row]);
              },
            });
          }}
        >
          <FormattedMessage id="pages.common.delete" />
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer
      ghost
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      {messageContextHolder}
      {modalContextHolder}
      <ProTable<API.SysRole, API.R<API.SysRole>>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
        request={handleTableRequest}
        columns={columns}
        rowSelection={{
          onChange: (_dom, row: any) => {
            setSelectedRows(row);
          },
        }}
        pagination={{
          defaultPageSize: 10,
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.common.chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.common.item" />
            </div>
          }
        >
          <Button
            loading={loading}
            onClick={() => {
              handleRemove(selectedRowsState);
            }}
          >
            <FormattedMessage id="pages.common.batchDeletion" />
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.SysRole>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.SysRole>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
