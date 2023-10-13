export default {
  name: "dargCardItem",
  data() {
    return {};
  },
  methods: {
    handleMousedown(ev) {
      console.log("点击");
    },
  },
  render() {
    return (
      <div class="dargCardItem" on={{ click: this.handleMousedown }}>
        <div class="dargCardItem_underlay"></div>
        <div class="dargCardItem_entity">{this.$slots.default}</div>
      </div>
    );
  },
};
