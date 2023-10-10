import IconFont from "@/components/IconFont"; // svg图标组件

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
const req = require.context("@/assets/icons", true, /\.svg$/);
requireAll(req);

export function useIconFont(Vue) {
  Vue.component(IconFont.name, IconFont);
}
