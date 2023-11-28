import type { CategoryListResponse } from '@/types/api/warehouse';
import type { FormRules } from 'element-plus';

export {};

export interface Options {
  status: {
    isEdit: boolean;
    loading: 'save' | 'delete' | 'no';
  };
}

export type ListData = Partial<CategoryListResponse[0]> & Options;

export type FormRule = FormRules<Omit<ListData, keyof Options>>;
