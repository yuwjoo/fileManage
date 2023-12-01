import type { UploadUserFile } from 'element-plus';

export {};

export interface Form {
  categoryId: number | ''; // 分类id
  name: string; // 名称
  describe: string; // 描述
  tagList: string[]; // 标签列表
  resourceList: UploadUserFile[]; // 资源文件列表
  readmeList: UploadUserFile[]; // 说明文档列表
}

export interface Options {
  submitSuccess: () => void;
}
