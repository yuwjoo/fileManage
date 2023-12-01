import type { CategoryListResponse } from '@/types/api/warehouse';

export {};

export type Form = Partial<Pick<CategoryListResponse[0], 'id'>> &
  Pick<CategoryListResponse[0], 'name' | 'directory'>;

export interface Options {
  submitSuccess: (data: Form) => void;
}
