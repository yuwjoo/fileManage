import type { Form } from '@/types/views/warehouse/editResourceDialogForm';
import type { UploadRequestOptions } from 'element-plus';
import type { Ref } from 'vue';

/**
 * @description: 编辑资源对话框-文件上传
 */
export function useEditResourceDialogFileList(form: Ref<Form>) {
  /**
   * @description: 处理删除文件
   * @param {string} key 文件列表 key
   * @param {number} index 删除文件的下标
   */
  function handleDeleteFile(key: 'resourceList' | 'readmeList', index: number): void {
    form.value[key] = form.value[key].filter((_, i) => i !== index);
  }

  /**
   * @description: 自定义上传文件逻辑
   * @param {UploadRequestOptions} option 配置
   */
  function handleHttpRequest(option: UploadRequestOptions) {
    return Promise.resolve((option.file as any).path || option.file.name);
  }

  return { handleDeleteFile, handleHttpRequest };
}
