import { FormattedMessage, getIntl } from '@umijs/max';

const intl = getIntl();
export const buildEnum = <
  T extends Record<number, { id: string; defaultMessage?: string; color?: string }>,
>(
  map: T,
) => {
  const valueEnum: Record<number, { text: JSX.Element; status: string; color?: string }> = {};
  const options: { label: JSX.Element; value: number }[] = [];

  Object.entries(map).forEach(([key, val]) => {
    const value = Number(key);
    const text = <FormattedMessage id={val.id} />;
    valueEnum[value] = {
      text,
      status: intl.formatMessage({ id: val.id }),
      color: val.color,
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
  0: { id: 'enums.gender.unknown' },
  1: { id: 'enums.gender.men' },
  2: { id: 'enums.gender.women' },
});
export const StatusEnum = buildEnum({
  0: { id: 'enums.status.disable', color: 'red' },
  1: { id: 'enums.status.enable', color: 'green' },
});
export const RecordRepairStatusEnum = buildEnum({
  0: { id: 'enums.repairStatus.pending' },
  1: { id: 'enums.repairStatus.pass' },
  2: { id: 'enums.repairStatus.refuse' },
});
export const RepairTypeEnum = buildEnum({
  1: { id: 'enums.repairType.working' },
  2: { id: 'enums.repairType.closed' },
});
export const PpunchSourceEnum = buildEnum({
  1: { id: 'enums.punchSource.auto' },
  2: { id: 'enums.punchSource.repair' },
});
export const PunchTypeEnum = buildEnum({
  1: { id: 'enums.punchType.working' },
  2: { id: 'enums.punchType.late' },
  3: { id: 'enums.punchType.closed' },
});
export const PunchModeEnum = buildEnum({
  1: { id: 'enums.punchMode.face' },
  2: { id: 'enums.punchMode.location' },
});
