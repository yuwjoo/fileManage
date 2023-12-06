export {};

export type ParamsType = Record<string, any>;

export type Category = {
  id: number;
  name: string;
  directory: string;
};

export type Resource = {
  id: number;
  name: string;
  describe?: string;
  tags: string[];
  categoryId: number;
};
