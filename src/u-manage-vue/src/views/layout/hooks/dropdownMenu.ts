import { Plus, Collection } from '@element-plus/icons-vue';
import { useEditCategoryDialogOpen } from '@/views/warehouse/hooks/editCategoryDialog/editCategoryDialogOpen';
import { useEditResourceDialogOpen } from '@/views/warehouse/hooks/editResourceDialog/editResourceDialogOpen';
import type { MenuItem } from '@/types/views/layout/dropdownMenu';

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
        useEditResourceDialogOpen().open?.();
        break;
      case 'manageCategory':
        useEditCategoryDialogOpen().open?.();
        break;
    }
  }

  return { menuList, handleCommand };
}
