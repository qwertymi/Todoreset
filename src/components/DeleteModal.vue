<template>
  <ModalWin>
    <template #title>Todo Delete</template>
    <template v-slot:body>정말로 삭제하시겠습니까? </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" @click="onClose">
        Close
      </button>
      <button type="button" class="btn btn-danger" @click="onDelete">
        Delete
      </button>
    </template>
  </ModalWin>
</template>

<script>
import ModalWin from "@/components/ModalWin.vue";
export default {
  components: {
    ModalWin,
  },
  emits: ["close-modal", "delete"],
  setup(props, { emit }) {
    const onClose = () => {
      emit("close-modal", {});
    };
    const onDelete = () => {
      emit("delete", {});
    };
    return {
      onClose,
      onDelete,
    };
  },
};
</script>

<style></style>
