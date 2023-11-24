import { ref } from 'vue';

export const editResourceVisible = ref<boolean>(false); // 显示编辑资源对话框
export const editCategoryVisible = ref<boolean>(false); // 显示编辑分类对话框

/**
 * @description: 打开编辑资源对话框
 */
export function openEditResource() {
  editResourceVisible.value = true;
}

/**
 * @description: 打开编辑分类对话框
 */
export function openEditCategory() {
  editCategoryVisible.value = true;
}
