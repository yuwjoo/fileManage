<script>
export default {
  props: {
    // 排列方向, toRight: 从左至右，toBottom: 从上到下
    toward: {
      type: String,
      default: "toRight",
    },
    // 最大可容纳元素个数
    maxNode: {
      type: Number,
      default: Infinity,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
  render() {
    console.log(this.$slots.default);
    return <div class="dragCard"></div>;
  },
};
</script>

<style lang="scss" scoped>
.dragCard {
  display: flex;
  flex-wrap: wrap;
}
</style>
