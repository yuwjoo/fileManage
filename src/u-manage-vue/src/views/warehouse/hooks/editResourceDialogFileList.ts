import type { UploadRequestOptions, UploadUserFile } from 'element-plus';

/**
 * @description: 编辑资源对话框-文件上传
 */
export function useEditResourceDialogFileList() {
  /**
   * @description: 处理删除文件
   * @param {UploadUserFile[]} fileList 文件列表
   * @param {number} index 删除文件的下标
   */
  function handleDeleteFile(fileList: UploadUserFile[], index: number): void {
    fileList = fileList.filter((_, i) => i !== index);
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
