export type ParamsType = Record<string, unknown>;

export type CategoryListResponse = {
  id: number;
  name: string;
  directory: string;
}[];

export type ResourceListResponse = {
  id: number;
  name: string;
  describe?: string;
  tags: string[];
  category_id: number;
}[];
