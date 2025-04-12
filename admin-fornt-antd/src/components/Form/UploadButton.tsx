import { TOKEN_KEY } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';

interface FormUploadButtonProps {
  name?: string;
  label?: string | React.ReactNode;
}

export default function FormUploadButton(props: FormUploadButtonProps) {
  return (
    <ProFormUploadButton
      icon={<PlusOutlined />}
      title={null}
      name={props.name || 'avatar'}
      label={props.label || <FormattedMessage id="pages.SysUser.search.avatar" />}
      max={1}
      fieldProps={{
        name: 'file',
        listType: 'picture-card',
        showUploadList: true,
        accept: 'image/*',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
      }}
      action="/api/common/file/upload"
      transform={(values) => {
        let avatar = values?.[0]?.response?.data?.fileUrl || '';
        if (!avatar && values && values.length >= 0) {
          avatar = values?.[0]?.url || '';
        }
        return {
          avatar: avatar,
        };
      }}
      rules={[{ required: false }]}
    />
  );
}
