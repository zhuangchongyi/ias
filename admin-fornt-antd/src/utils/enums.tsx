import { FormattedMessage } from '@umijs/max';

export const buildEnum = <
  T extends Record<number, { id: string; defaultMessage: string; color?: string }>,
>(
  map: T,
) => {
  const valueEnum: Record<number, { text: JSX.Element; status: string; color?: string }> = {};
  const options: { label: JSX.Element; value: number }[] = [];

  Object.entries(map).forEach(([key, val]) => {
    const value = Number(key);
    const text = <FormattedMessage id={val.id} defaultMessage={val.defaultMessage} />;
    valueEnum[value] = {
      text,
      status: val.defaultMessage,
      color: val.color || 'default',
    };
    options.push({
      value,
      label: text,
    });
  });

  return {
    valueEnum,
    options,
  };
};

export const GenderEnum = buildEnum({
  0: { id: 'enums.gender.unknown', defaultMessage: '未知' },
  1: { id: 'enums.gender.men', defaultMessage: '男' },
  2: { id: 'enums.gender.women', defaultMessage: '女' },
});
export const StatusEnum = buildEnum({
  0: { id: 'enums.status.disable', defaultMessage: '禁用', color: 'red' },
  1: { id: 'enums.status.enable', defaultMessage: '启用', color: 'green' },
});
