<template>
  <div class="home">
    <svg>
      <use xlink:href="icon-close"></use>
    </svg>
  </div>
</template>

<script>
import CloseIcon from "@/assets/icons/close.svg";
export default {
  data() {
    return {
      CloseIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: orange;
}
</style>
