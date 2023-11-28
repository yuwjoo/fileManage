import { ref } from 'vue';

const editResourceOpen = ref<(...arg: any[]) => void>(); // 打开编辑资源对话框函数
const editCategoryOpen = ref<(...arg: any[]) => void>(); // 打开编辑分类对话框函数

/**
 * @description: 打开对话框
 */
export function useOpenDialog() {
  return { editResourceOpen, editCategoryOpen };
}
