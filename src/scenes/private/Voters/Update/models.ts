export interface CheckDocumentResponse {
  exists: boolean
}

export type DocumentType = string | undefined

export type ResolveType = (exists: boolean) => void