interface PageMeta {
  page: number
  take: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface Page<Data> {
  meta: PageMeta
  data: Data
}