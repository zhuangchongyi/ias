import { addUserFace, getUserFace } from '@/services/user';
import { joinIntlMessages } from '@/utils';
import { TOKEN_KEY } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormUploadButton } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { message } from 'antd';
import { FC } from 'react';

interface UploadFaceFormProps {
  trigger: JSX.Element;
  values: Partial<API.SysUser>;
  onOk?: () => void;
}

const UploadFaceForm: FC<UploadFaceFormProps> = ({ trigger, values, onOk }) => {
  const intl = useIntl();
  const [messageApi, messageContextHolder] = message.useMessage();

  const { run: runUploadFace, loading } = useRequest(addUserFace, {
    manual: true,
    onSuccess: () => {
      messageApi.success(intl.formatMessage({ id: 'message.operation.success' }));
      onOk?.();
    },
    onError: () => {
      messageApi.error(intl.formatMessage({ id: 'message.operation.failure' }));
    },
  });

  const getInfo = async (): Promise<API.SysUserFace> => {
    let { data } = await getUserFace(values.id);
    if (!data || data.length === 0) {
      return {
        userFaces: [],
      };
    }
    return {
      userFaces: data.map((url) => {
        let name = url?.substring(url?.lastIndexOf('/') + 1);
        return { uid: `${Date.now()}-${Math.random()}`, name: name, status: 'done', url: url };
      }),
    };
  };

  return (
    <>
      {messageContextHolder}
      <ModalForm<API.SysUserFace>
        title={`${values.nickname} ` + intl.formatMessage({ id: 'pages.SysUser.UploadFace.title' })}
        trigger={trigger}
        width={600}
        modalProps={{ okButtonProps: { loading } }}
        request={getInfo}
        onFinish={async (formValues) => {
          const { userFaces } = formValues;
          await runUploadFace(values.id, userFaces);
          return true;
        }}
      >
        <ProFormUploadButton
          icon={<PlusOutlined />}
          title={null}
          name="userFaces"
          max={10}
          label={<FormattedMessage id="pages.SysUser.UploadFace.userFace" />}
          fieldProps={{
            multiple: true,
            name: 'file',
            listType: 'picture-card',
            showUploadList: true,
            accept: 'image/*',
            headers: {
              Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
          }}
          action="/api/common/file/upload"
          transform={(values: any[]) => {
            const imageUrls = (
              values.map((it) => it.url || it?.response?.data?.fileUrl) || []
            ).filter(Boolean);
            return { userFaces: imageUrls };
          }}
          rules={[
            {
              required: true,
              message: joinIntlMessages([
                'pages.common.required.upload',
                'pages.SysUser.UploadFace.userFace',
              ]),
            },
            {
              validator: async (_dom, value) => {
                const length = value?.length || 0;
                if (length < 3) {
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({ id: 'pages.SysUser.UploadFace.required.minUserFace' }),
                    ),
                  );
                }
                if (length > 10) {
                  return Promise.reject(
                    new Error(
                      intl.formatMessage({ id: 'pages.SysUser.UploadFace.required.maxUserFace' }),
                    ),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default UploadFaceForm;
