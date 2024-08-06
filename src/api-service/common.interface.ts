export interface IParamFindAll {
  current?: number;
  pageSize?: number;
}

export interface IPagination {
  total: number;
  pageSize?: string;
  current?: string;
}

export interface IResFindAll {
  statusCode: number;
  pagination: IPagination;
  data: any[] | null;
}
