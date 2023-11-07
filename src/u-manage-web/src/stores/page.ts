import { defineStore } from "pinia";

export const usePageStore = defineStore("page", {
  state: () => {
    return {
      isDark: false, // 是否深色模式
    };
  },
  actions: {
    /**
     * @description: 切换深色模式
     * @param {boolean} isDark 是否深色模式
     */
    toggleDark(isDark?: boolean) {
      this.isDark = isDark ?? !this.isDark;
      document.documentElement.classList.toggle("dark", this.isDark);
    },
  },
});
