import type { Category } from '@/types/api/warehouse';
import type { FormRules } from 'element-plus';
import type { useEditCategoryDialogTable } from '../hooks/editCategoryDialogTable';

export {};

export type UseEditCategoryDialogTableReturn = ReturnType<typeof useEditCategoryDialogTable>;

export interface Options {
  status: {
    isEdit: boolean;
    loading: 'save' | 'delete' | 'no';
  };
}

export type TableData = Partial<Category> & Options;

export type FormRule = FormRules<Omit<TableData, keyof Options>>;
