import { TOKEN_KEY } from '@/utils/constant';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';

interface FormUploadButtonProps {
  name?: string;
  label?: string | React.ReactNode;
}

export default function FormUploadButton(props: FormUploadButtonProps) {
  return (
    <ProFormUploadButton
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
      transform={(value) => {
        let avatar = value?.[0]?.response?.data || '';
        if (!avatar && value && value.length >= 0) {
          avatar = value?.[0]?.url || '';
        }
        return {
          avatar: avatar,
        };
      }}
      rules={[{ required: false }]}
    />
  );
}
