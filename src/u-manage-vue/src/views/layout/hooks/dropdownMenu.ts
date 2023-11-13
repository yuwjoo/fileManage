import { Plus, Collection } from '@element-plus/icons-vue';
import type { DefineComponent } from 'vue';

interface MenuList {
  icon: DefineComponent;
  title: string;
  command: string;
}

const menuList = <Array<MenuList>>[
  { icon: Plus, title: '新建资源', command: 'addResource' },
  { icon: Collection, title: '管理分类', command: 'manageClass' }
];

/**
 * @description: 处理指令
 * @param {string} command 指令名称
 */
function handleCommand(command: string): void {
  switch (command) {
    case 'addResource':
      console.log('新建资源');
      break;
    case 'manageClass':
      console.log('管理分类');
      break;
  }
}

/**
 * @description: 下拉菜单 hook
 */
export function useDropdownMenu() {
  return { menuList, handleCommand };
}
