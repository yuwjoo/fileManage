import type { CategoryListResponse } from '@/types/api/warehouse';

export {};

export interface SelectItem<T> {
  list: T;
  loading: boolean;
  option: { label: string; value: string };
}

export interface Select {
  category: SelectItem<CategoryListResponse>;
}
