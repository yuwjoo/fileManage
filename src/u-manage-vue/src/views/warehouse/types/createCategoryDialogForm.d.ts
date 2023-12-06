import type { Category } from '@/types/api/warehouse';
import type { useCreateCategoryDialogForm } from '../hooks/createCategoryDialogForm';

export {};

export type UseCreateCategoryDialogFormReturn = ReturnType<typeof useCreateCategoryDialogForm>;

export type Form = Partial<Pick<Category, 'id'>> & Pick<Category, 'name' | 'directory'>;
