import { Plus, Collection } from '@element-plus/icons-vue';
import { editCategoryDialogRef } from '@/views/warehouse/hooks/editCategoryDialog';
import { editResourceDialogRef } from '@/views/warehouse/hooks/editResourceDialog';
import type { MenuItem } from '../types/dropdownMenu';

/**
 * @description: 下拉菜单 hook
 */
export function useDropdownMenu() {
  const menuList: MenuItem[] = [
    { icon: Plus, title: '新建资源', command: 'addResource' },
    { icon: Collection, title: '管理分类', command: 'manageCategory' }
  ];

  /**
   * @description: 处理指令
   * @param {string} command 指令名称
   */
  function handleCommand(command: string): void {
    switch (command) {
      case 'addResource':
        editResourceDialogRef.value?.open();
        break;
      case 'manageCategory':
        editCategoryDialogRef.value?.open();
        break;
    }
  }

  return { menuList, handleCommand };
}
