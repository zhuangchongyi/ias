import { TOKEN_KEY } from '@/utils/constant';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';

interface FormUploadButtonProps {
  icon?: React.ReactNode;
  title?: string;
  name?: string;
  label?: string | React.ReactNode;
  max?: number;
  action?: string;
  transform?: (values: any) => Record<string, any>;
  rules?: any[];
  fieldProps?: any;
}

export default function FormUploadButton(props: FormUploadButtonProps) {
  const defaultTransform = (values: any) => {
    let avatar = values?.[0]?.response?.data?.fileUrl || '';
    if (!avatar && values && values.length >= 0) {
      avatar = values?.[0]?.url || '';
    }
    return {
      avatar: avatar,
    };
  };

  return (
    <ProFormUploadButton
      icon={props.icon || <PlusOutlined />}
      title={props.title || null}
      name={props.name || 'avatar'}
      label={props.label || <FormattedMessage id="pages.SysUser.search.avatar" />}
      max={props.max || 1}
      fieldProps={{
        name: 'file',
        listType: 'picture-card',
        showUploadList: true,
        accept: 'image/*',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
        ...props.fieldProps,
      }}
      action={props.action || '/api/common/file/upload'}
      transform={props.transform || defaultTransform}
      rules={props.rules || []}
    />
  );
}
