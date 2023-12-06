import type { FormInstance, UploadUserFile } from 'element-plus';
import type { Form, Rules } from '../types/editResourceDialogForm';
import type { UseEditResourceDialogReturn } from '../types/editResourceDialog';
import { saveResourceData } from '@/api/warehouse';
import { ref, toRaw } from 'vue';

/**
 * @description: 编辑资源对话框-表单数据
 */
export function useEditResourceDialogForm() {
  const form = ref<Form>({ tagList: [], resourceList: [], readmeList: [] }); // 列表数据
  const rules = {
    categoryId: [{ required: true, message: '请选择或输入分类', trigger: 'change' }],
    name: [{ required: true, message: '请输入名称', trigger: 'change' }],
    resourceList: [{ required: true, validator: resourceListValidator, trigger: 'change' }]
  } as Rules; // 校验规则
  const disabled = ref<boolean>(false); // 禁用
  const submitLoading = ref<boolean>(false); // 提交中
  const formRef = ref<FormInstance>(); // 表单ref

  /**
   * @description: 校验上传资源文件列表
   */
  function resourceListValidator(rule: any, value: any, callback: any) {
    if (value.length < 1) {
      callback(new Error('请添加文件'));
    } else {
      callback();
    }
  }

  /**
   * @description: 处理文件列表数据
   * @param {UploadUserFile} fileList 文件列表
   * @return {{ name: string; path: string }[]} 处理后的列表数据
   */
  function handleFileList(fileList: UploadUserFile[]): { name: string; path: string }[] {
    return fileList.map((item) => ({
      name: item.name,
      path: item.response as string
    }));
  }

  /**
   * @description: 重置form数据
   */
  function handleResetForm() {
    form.value = { tagList: [], resourceList: [], readmeList: [] };
  }

  /**
   * @description: 提交form数据
   * @param {(evt: 'change') => void} emits 事件
   * @param {Pick<UseEditResourceDialogReturn, 'handleClose'>} useEditResourceDialog 编辑资源对话框hook
   */
  async function handleSubmitForm(
    emits: (evt: 'change') => void,
    useEditResourceDialog: Pick<UseEditResourceDialogReturn, 'handleClose'>
  ) {
    const isValid = await formRef.value!.validate();
    if (isValid) {
      submitLoading.value = true;
      saveResourceData({
        categoryId: form.value.categoryId,
        name: form.value.name,
        describe: form.value.describe,
        resourceList: handleFileList(form.value.resourceList),
        readmeList: handleFileList(form.value.readmeList),
        tagList: toRaw(form.value.tagList)
      })
        .then(() => {
          emits('change');
          useEditResourceDialog.handleClose();
        })
        .finally(() => {
          submitLoading.value = false;
        });
    }
  }

  return {
    form,
    rules,
    submitLoading,
    disabled,
    formRef,
    handleResetForm,
    handleSubmitForm
  };
}
