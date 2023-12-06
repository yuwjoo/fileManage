import type { useWarehouseTable } from '../hooks/warehouseTable';

export {};

export type UseWarehouseTableReturn = ReturnType<typeof useWarehouseTable>;

export interface Query {
  searchContent?: string;
  categoryId?: number;
  createDate?: [number, number];
}
