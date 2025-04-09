import { pageSysUser, removeSysUser } from '@/services/user';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, message, Avatar } from 'antd';
import React, { useCallback, useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { getGenderEnum, getStatusEnum } from '@/config/enums';


const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.SysUser>();
  const [selectedRowsState, setSelectedRows] = useState<API.SysUser[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const [messageApi, contextHolder] = message.useMessage();

  const { run: delSysUser, loading } = useRequest(removeSysUser, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      messageApi.success(intl.formatMessage({id: 'message.operation.success'}));
    },
    onError: () => {
      messageApi.success(intl.formatMessage({id: 'message.operation.failure'}));
    },
  });

  const columns: ProColumns<API.SysUser>[] = [
    {
      title: (
        <FormattedMessage id="pages.searchSysUser.updateForm.ruleName.nameLabel"/>
      ),
      dataIndex: 'id',
      render: (dom:any, row:any) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(row);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'username',
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (dom:any, row:any) => [
        row.avatar ? <Avatar src={row.avatar} key={row.id}/> : null,
      ]
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'email',
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'phone',
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'gender',
      valueEnum: getGenderEnum,
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'status',
      valueEnum: getStatusEnum,
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'createBy',
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'createTime',
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'updateBy',
    },
    {
      title: <FormattedMessage id="pages.searchSysUser.titleDesc"/>,
      dataIndex: 'updateTime',
    },
    {
      title: <FormattedMessage id="pages.config.titleOption"/>,
      dataIndex: 'option',
      valueType: 'option',
      render: (dom:any, row:any) => [
        <UpdateForm
          trigger={
            <a>
              <FormattedMessage id="pages.searchSysUser.config"/>
            </a>
          }
          key="config"
          onOk={actionRef.current?.reload}
          values={row}
        />,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          <FormattedMessage
            id="pages.searchSysUser.subscribeAlert"
            defaultMessage="Subscribe to alerts"
          />
        </a>,
      ],
    },
  ];

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: API.SysUser[]) => {
      if (!selectedRows?.length) {
        messageApi.warning('请选择删除项');

        return;
      }

      await delSysUser({
        data: {
          key: selectedRows.map((row) => row.id),
        },
      });
    },
    [delSysUser],
  );

  return (
    <PageContainer>
      {contextHolder}
      <ProTable<API.SysUser, API.R<API.SysUser>>
        headerTitle={intl.formatMessage({
          id: 'pages.searchSysUser.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [<CreateForm key="create" reload={actionRef.current?.reload} />]}
        request={async (params:API.SysUser) => {
          const res: API.R<API.SysUser> = await pageSysUser(params);
          return {
            success: res.code === 200,
            data: res.data?.records || [],
            total: res.data?.total || 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (dom:any, row:any) => {
            setSelectedRows(row);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.config.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchSysUser.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchSysUser.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.id!, 0)}{' '}
                <FormattedMessage id="pages.searchSysUser.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            loading={loading}
            onClick={() => {
              handleRemove(selectedRowsState);
            }}
          >
            <FormattedMessage
              id="pages.searchSysUser.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchSysUser.batchApproval"
              defaultMessage="Batch approval"
            />
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
          <ProDescriptions<API.SysUser>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.SysUser>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
