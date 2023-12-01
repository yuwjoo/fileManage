import type { Form } from '@/types/views/warehouse/editResourceDialogForm';
import type { ElInput } from 'element-plus';
import { nextTick, ref, type Ref } from 'vue';

/**
 * @description: 编辑资源对话框-标签组
 */
export function useEditResourceDialogTagGroup(form: Ref<Form>) {
  const isAdd = ref<boolean>(false); // 新增模式
  const inputValue = ref<string>(''); // 输入框绑定值
  const InputRef = ref<InstanceType<typeof ElInput>>(); // 输入框 ref

  /**
   * @description: 处理标签删除
   * @param {number} index 被删除的标签下标
   */
  function handleDeleteTag(index: number) {
    form.value.tagList = form.value.tagList.filter((_, i) => i !== index);
  }

  /**
   * @description: 处理输入完成
   * @param {boolean} isBlur 是否失去焦点
   */
  function handleInputConfirm(isBlur: boolean) {
    const value = inputValue.value.trim();
    if (value) form.value.tagList.push(value);
    isAdd.value = !isBlur;
    inputValue.value = '';
  }

  /**
   * @description: 进入编辑模式
   */
  function handleEntryAdd() {
    isAdd.value = true;
    nextTick(() => {
      InputRef.value!.input!.focus();
    });
  }

  return { isAdd, inputValue, InputRef, handleDeleteTag, handleInputConfirm, handleEntryAdd };
}
