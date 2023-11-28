import { ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { Form } from '@/types/views/warehouse/hooks/editResourceDialogTable';

/**
 * @description: 编辑资源对话框-表单数据
 */
export function useEditResourceDialogForm() {
  const form = ref<Form>({
    categoryId: '',
    name: '',
    describe: '',
    tagList: [],
    resourceList: [],
    readmeList: []
  }); // 列表数据
  const rules = {
    categoryId: [{ required: true, message: '请选择或输入分类', trigger: 'change' }],
    name: [{ required: true, message: '请输入名称', trigger: 'change' }],
    resourceList: [{ validator: resourceListValidator, trigger: 'change' }]
  } as FormRules<Form>; // 表单校验规则
  const disabled = ref<boolean>(false); // 禁用表单
  const formRef = ref<FormInstance>(); // 表单 ref

  /**
   * @description: 校验上传资源文件列表
   */
  function resourceListValidator(
    _rule: any,
    value: any,
    callback: (error?: string | Error | undefined) => void
  ) {
    if (value.length < 1) {
      callback(new Error('请添加文件'));
    } else {
      callback();
    }
  }

  /**
   * @description: 处理提交
   */
  function handleSubmit() {}

  return {
    form,
    rules,
    disabled,
    formRef,
    handleSubmit
  };
}
