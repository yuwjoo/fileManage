import type { UploadUserFile, FormRules } from 'element-plus';
import type { useEditResourceDialogForm } from '../hooks/editResourceDialogForm';

export {};

export type UseEditResourceDialogFormReturn = ReturnType<typeof useEditResourceDialogForm>;

export interface Form {
  categoryId?: number; // 分类id
  name?: string; // 名称
  describe?: string; // 描述
  tagList: string[]; // 标签列表
  resourceList: UploadUserFile[]; // 资源文件列表
  readmeList: UploadUserFile[]; // 说明文档列表
}

export type Rules = FormRules<Form>;
