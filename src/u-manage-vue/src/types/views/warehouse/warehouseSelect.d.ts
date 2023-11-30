import type { CategoryListResponse } from '@/types/api/warehouse';

export {};

export interface SelectItem<T extends any[]> {
  list: T;
  loading: boolean;
  option: { label: keyof T[0]; value: keyof T[0] };
}

export interface Select {
  category: SelectItem<CategoryListResponse>;
}
