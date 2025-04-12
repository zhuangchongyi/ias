import { listSysDept, removeSysDept } from '@/services/dept';
import { listToTree } from '@/utils';
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
  const [currentRow, setCurrentRow] = useState<API.SysDept>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysDept[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();

  const { run: delSysDept, loading } = useRequest(removeSysDept, {
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
    async (selectedRows: API.SysDept[]) => {
      if (!selectedRows?.length) {
        messageApi.warning(intl.formatMessage({ id: 'message.operation.success' }));
        return;
      }

      await delSysDept(selectedRows.map((row) => row.id).join());
    },
    [delSysDept],
  );

  const handleTableRequest = async (
    params: API.SysDept,
    sort: Record<string, any>,
    filter: Record<string, any>,
  ) => {
    const res: API.R<API.SysDept> = await listSysDept(params);
    const records = res.data || [];
    const treeData = listToTree(records); // 转成树结构

    return {
      success: res.code === 200,
      data: treeData,
    };
  };

  const columns: ProColumns<API.SysDept>[] = [
    {
      title: <FormattedMessage id="pages.SysDept.search.id" />,
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
      title: <FormattedMessage id="pages.SysDept.search.deptName" />,
      dataIndex: 'deptName',
    },
    {
      title: <FormattedMessage id="pages.SysDept.search.orderNum" />,
      dataIndex: 'orderNum',
    },
    {
      title: <FormattedMessage id="pages.SysDept.search.status" />,
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
    <PageContainer>
      {messageContextHolder}
      {modalContextHolder}
      <ProTable<API.SysDept, API.SysDept>
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
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
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
          <ProDescriptions<API.SysDept>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.SysDept>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
