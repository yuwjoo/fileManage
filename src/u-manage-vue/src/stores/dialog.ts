import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

class DialogProp {
  visible: Ref<boolean>;
  params: Ref<{ [key: string]: any }>;
  open: (params?: any) => void;
  close: () => void;

  constructor() {
    this.visible = ref(false);
    this.params = ref({});
    this.open = handleOpen.bind(this);
    this.close = handleClose.bind(this);
  }
}

/**
 * @description: 处理打开对话框
 * @param {DialogProp} this 当前对象
 * @param {{ [key: string]: any }} params 参数
 */
function handleOpen(this: DialogProp, params?: DialogProp['params']) {
  this.params.value = params || {};
  this.visible.value = true;
}

/**
 * @description: 处理关闭对话框
 * @param {DialogProp} this 当前对象
 */
function handleClose(this: DialogProp) {
  this.visible.value = false;
}

export const useDialogStore = defineStore('dialog', () => {
  const manageCategory = new DialogProp(); // 管理分类对话框
  const addResource = new DialogProp(); // 添加资源对话框

  return { manageCategory, addResource };
});
