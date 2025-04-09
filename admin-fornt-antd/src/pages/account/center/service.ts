import { getCurrentUser, getFakeList } from './_mock';
import type { ListItemDataType } from './data.d';

export async function queryCurrent(): Promise<{ data: any }> {
  return getCurrentUser();
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: ListItemDataType[] } }> {
  return getFakeList({
    params,
  });
}
