import { computed } from "vue";
import { useStore } from "vuex";
export const useToast = () => {
  // vuex 접근 관리
  const store = useStore();
  // 안내창에 보여지는 목록 관리
  const toasts = computed(() => store.state.toast.toasts);
  const triggerToast = (message, color) => {
    store.dispatch("toast/triggerToast", { message, color });
  };

  return {
    toasts,
    triggerToast,
  };
};
