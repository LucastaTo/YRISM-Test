export type IPagination<T> = {
    totalItems: number
    totalPages: number
    pageItems: T
}

export type IResponse<T> = {
  message: string;
  statusCode: number;
  data: T
}
