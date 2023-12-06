import { type FormRules, type FormInstance } from 'element-plus';
import { ref, reactive, toRaw } from 'vue';
import { saveCategoryData } from '@/api/warehouse';
import type { UseCreateCategoryDialogReturn } from '../types/createCategoryDialog';
import type { Form } from '../types/createCategoryDialogForm';

/**
 * @description: 创建分类对话框-表单
 */
export function useCreateCategoryDialogForm() {
  const submitLoading = ref<boolean>(false); // 加载中
  const form = ref<Form>({ name: '', directory: '' }); // 表单数据
  const formRef = ref<FormInstance>(); // 表单 ref
  const rules = reactive<FormRules<Form>>({
    name: [{ required: true, message: '请输入分类名', trigger: 'change' }],
    directory: [{ required: true, message: '请输入目录名', trigger: 'change' }]
  }); // 校验规则

  /**
   * @description: 重置form数据
   */
  function handleResetForm() {
    form.value = { name: '', directory: '' };
  }

  /**
   * @description: 处理提交
   * @param {(evt: 'change', value: any) => void} emits 事件
   * @param {Pick<UseCreateCategoryDialogReturn, 'handleClose'>} useCreateCategoryDialog 创建分类对话框hook
   */
  async function handleSubmitForm(
    emits: (evt: 'change', value: any) => void,
    useCreateCategoryDialog: Pick<UseCreateCategoryDialogReturn, 'handleClose'>
  ) {
    const isValid = await formRef.value!.validate();
    if (isValid) {
      submitLoading.value = true;
      saveCategoryData(toRaw(form.value))
        .then((id) => {
          emits('change', { id, ...form.value });
          useCreateCategoryDialog.handleClose();
        })
        .finally(() => {
          submitLoading.value = false;
        });
    }
  }

  return { submitLoading, form, formRef, rules, handleResetForm, handleSubmitForm };
}
