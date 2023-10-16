<!--
 * @FileName: 
 * @FilePath: \fileManage\src\renderer\components\IconFont\index.vue
 * @Author: YH
 * @Date: 2023-07-08 09:04:26
 * @LastEditors: YH
 * @LastEditTime: 2023-10-16 14:04:19
 * @Description: 图标组件
-->
<script>
export default {
  name: "IconFont",
  functional: true,
  props: {
    // 图标
    icon: {
      type: String,
      required: true,
    },
    // 大小
    size: {
      type: String,
      required: false,
    },
    // 颜色
    color: {
      type: String,
      required: false,
    },
  },
  render(h, { props, data }) {
    // 提取props和data属性
    const { icon, size, color } = props;
    const { staticClass, staticStyle, attrs, nativeOn } = data;

    // 判断是否为字体图标和远程链接
    const isFontIcon = /^el-icon-/i.test(icon);
    const isHrefIcon = /^(http|https):\/\//i.test(icon);

    // 创建图标数据对象
    const iconData = {
      class: staticClass || data.class,
      style: { ...(staticStyle || data.style), fontSize: size, color },
      attrs,
      on: nativeOn,
    };

    if (isFontIcon) {
      // 字体图标
      return (
        <i {...iconData} class={icon} style={{ verticalAlign: "-0.1em" }} />
      );
    } else {
      // SVG图标
      return (
        <svg
          {...iconData}
          style={{
            fill: "currentColor",
            width: "1em",
            height: "1em",
            verticalAlign: "-0.2em",
          }}
          aria-hidden="true"
        >
          <use xlinkHref={isHrefIcon ? icon : `#${icon}`} />
        </svg>
      );
    }
  },
};
</script>
