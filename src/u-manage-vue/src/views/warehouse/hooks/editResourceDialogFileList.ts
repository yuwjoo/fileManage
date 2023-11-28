import type { UploadRequestOptions, UploadUserFile } from 'element-plus';

/**
 * @description: 编辑资源对话框-文件上传
 */
export function useEditResourceDialogFileList() {
  /**
   * @description: 处理删除
   * @param {Ref<UploadUserFile[]>} fileList 文件列表
   * @param {number} index 删除文件的下标
   */
  function handleDelete(fileList: UploadUserFile[], index: number): void {
    fileList.splice(index, 1);
  }

  /**
   * @description: 自定义上传文件逻辑
   * @param {UploadRequestOptions} option 配置
   */
  function handleHttpRequest(option: UploadRequestOptions): Promise<void> {
    option.onSuccess((option.file as any).path || option.file.name);
    return Promise.resolve();
  }

  return { handleDelete, handleHttpRequest };
}
