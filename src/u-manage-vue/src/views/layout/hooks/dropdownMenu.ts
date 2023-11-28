import { Plus, Collection } from '@element-plus/icons-vue';
import { useOpenDialog } from '@/views/warehouse/hooks/openDialog';
import type { MenuItem } from '@/types/views/layout/hooks/dropdownMenu';

/**
 * @description: 下拉菜单 hook
 */
export function useDropdownMenu() {
  const menuList: MenuItem[] = [
    { icon: Plus, title: '新建资源', command: 'addResource' },
    { icon: Collection, title: '管理分类', command: 'manageCategory' }
  ];
  const { editResourceOpen, editCategoryOpen } = useOpenDialog(); // 打开对话框

  /**
   * @description: 处理指令
   * @param {string} command 指令名称
   */
  function handleCommand(command: string): void {
    switch (command) {
      case 'addResource':
        editResourceOpen.value?.();
        break;
      case 'manageCategory':
        editCategoryOpen.value?.();
        break;
    }
  }

  return { menuList, handleCommand };
}
