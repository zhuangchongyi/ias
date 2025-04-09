import { FormattedMessage } from '@umijs/max';

export const getStatusEnum = () => ({
  0: {
    text: <FormattedMessage id="enums.status.disable" defaultMessage="禁用" />,
    status: '禁用',
  },
  1: {
    text: <FormattedMessage id="enums.status.enable" defaultMessage="启用" />,
    status: '启用',
  },
});

export const getGenderEnum = () => ({
  0: {
    text: <FormattedMessage id="enums.gender.unknown" defaultMessage="未知" />,
    status: '未知',
  },
  1: {
    text: <FormattedMessage id="enums.gender.men" defaultMessage="男" />,
    status: '男',
  },
  2: {
    text: <FormattedMessage id="enums.gender.women" defaultMessage="女" />,
    status: '女',
  },
});
