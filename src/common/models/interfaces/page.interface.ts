interface PageMeta {
  current: number
  pageSize: number
  total: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface Page<Data> {
  meta: PageMeta
  data: Data
}