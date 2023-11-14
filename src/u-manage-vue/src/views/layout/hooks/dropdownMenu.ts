import { Plus, Collection } from '@element-plus/icons-vue';
import type { DefineComponent } from 'vue';
import { useDialogStore } from '@/stores/dialog';

interface MenuList {
  icon: DefineComponent;
  title: string;
  command: string;
}

const menuList = <Array<MenuList>>[
  { icon: Plus, title: '新建资源', command: 'addResource' },
  { icon: Collection, title: '管理分类', command: 'manageClass' }
];
const { manageCategory, addResource } = useDialogStore(); // 对话框 store

/**
 * @description: 处理指令
 * @param {string} command 指令名称
 */
function handleCommand(command: string): void {
  switch (command) {
    case 'addResource':
      addResource.open();
      break;
    case 'manageClass':
      manageCategory.open();
      break;
  }
}

/**
 * @description: 下拉菜单 hook
 */
export function useDropdownMenu() {
  return { menuList, handleCommand };
}
