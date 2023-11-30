import type { CategoryListResponse } from '@/types/api/warehouse';

export {};

export type Form = Pick<CategoryListResponse[0], 'name' | 'directory'>;

export interface Options {
  submitSuccess: (res: any) => void;
}
