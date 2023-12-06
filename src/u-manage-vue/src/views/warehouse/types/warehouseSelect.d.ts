import type { Category } from '@/types/api/warehouse';
import type { useWarehouseSelect } from '../hooks/warehouseSelect';

export {};

export type UseWarehouseSelectReturn = ReturnType<typeof useWarehouseSelect>;

export interface SelectProp<T extends Record<string, any>> {
  list: T[];
  loading: boolean;
  option: { label: keyof T; value: keyof T };
}

export type CategorySelectProp = SelectProp<Partial<Pick<Category, 'id'>> & Omit<Category, 'id'>>;
