import { getIntl } from '@umijs/max';

const intl = getIntl();

/**
 * 传入一组国际化 id，返回按顺序拼接后的翻译文本
 * @param ids 国际化 ID 数组
 * @param separator 分隔符，默认空字符串
 * @returns 拼接后的翻译字符串
 */
export function joinIntlMessages(ids: string[], separator = '') {
  return ids
    .map((id) => intl.formatMessage({ id, defaultMessage: id }))
    .filter(Boolean)
    .join(separator);
}

/**
 * 传入一组数据，返回树形结构
 * @param data 数组
 * @param parentId 父级id字段
 * @returns 树形结构数组
 */
export function listToTree(data: any[], parentId: string | number = '0'): any[] {
  const tree: any[] = [];
  if (!Array.isArray(data) || !data || data.length === 0) {
    return tree;
  }
  const lookup: Record<string, any> = {};
  data.forEach((item) => {
    lookup[item.id] = { ...item, children: [] };
  });

  data.forEach((item) => {
    const node = lookup[item.id];
    if (item.parentId && item.parentId !== parentId) {
      if (!lookup[item.parentId]) {
        lookup[item.parentId] = { children: [] };
      }
      lookup[item.parentId].children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
}
