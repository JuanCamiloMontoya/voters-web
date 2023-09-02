interface IPageMeta {
  current: number;
  pageSize: number;
  total: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface IPage<Data> {
  meta: IPageMeta;
  data: Data;
}
