import type { UploadRequestOptions, UploadUserFile } from 'element-plus';
import type { Ref } from 'vue';

/**
 * @description: 编辑资源对话框-文件上传
 */
export function useEditResourceDialogFileList(fileList: Ref<UploadUserFile[]>) {
  /**
   * @description: 处理删除文件
   * @param {number} index 删除文件的下标
   */
  function handleDeleteFile(index: number): void {
    fileList.value = fileList.value.filter((_, i) => i !== index);
  }

  /**
   * @description: 自定义上传文件逻辑
   * @param {UploadRequestOptions} option 配置
   */
  function handleHttpRequest(option: UploadRequestOptions): Promise<void> {
    option.onSuccess((option.file as any).path || option.file.name);
    return Promise.resolve();
  }

  return { handleDeleteFile, handleHttpRequest };
}
