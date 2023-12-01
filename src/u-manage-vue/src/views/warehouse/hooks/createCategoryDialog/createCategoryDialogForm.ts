import { type FormRules, type FormInstance } from 'element-plus';
import { ref, reactive, toRaw } from 'vue';
import { saveCategoryData } from '@/api/warehouse';
import type { Form, Options } from '@/types/views/warehouse/createCategoryDialogForm';

/**
 * @description: 创建分类对话框-表单
 */
export function useCreateCategoryDialogForm(options: Options) {
  const loading = ref<boolean>(false); // 加载中
  const form = ref<Form>({ name: '', directory: '' }); // 表单数据
  const formRef = ref<FormInstance>(); // 表单 ref
  const rules = reactive<FormRules<Form>>({
    name: [{ required: true, message: '请输入分类名', trigger: 'change' }],
    directory: [{ required: true, message: '请输入目录名', trigger: 'change' }]
  }); // 校验规则

  /**
   * @description: 重置form数据
   */
  function resetForm() {
    form.value = { name: '', directory: '' };
  }

  /**
   * @description: 处理提交
   */
  function submitForm() {
    formRef.value!.validate((isVaild) => {
      if (isVaild) {
        loading.value = true;
        saveCategoryData(toRaw(form.value))
          .then((id) => {
            options.submitSuccess({ id, ...form.value });
          })
          .finally(() => {
            loading.value = false;
          });
      }
    });
  }

  return { loading, form, formRef, rules, resetForm, submitForm };
}
