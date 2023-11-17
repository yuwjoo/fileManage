import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * @description: 对话框状态 hook
 */
export const useDialogStateStore = defineStore('dialogState', () => {
  const manageCategoryVisible = ref<boolean>(false); // 显示管理分类对话框
  const addResourceVisible = ref<boolean>(false); // 显示添加资源对话框

  return { manageCategoryVisible, addResourceVisible };
});
