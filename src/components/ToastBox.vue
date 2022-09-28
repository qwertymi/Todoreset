<template>
  <div class="alert toast-box" :class="`alert-${color}`" role="alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "success",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style>
.toast-box {
  position: fixed;
  top: 8px;
  right: 10px;
  height: 40px;
  padding-top: 7px;
}
</style>
