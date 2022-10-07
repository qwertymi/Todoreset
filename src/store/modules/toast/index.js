export default {
  namespaced: true,
  state: {
    // toastBox 메시지 배열로 저장
    toasts: [],
  },
  actions: {
    triggerToast({ commit }, { message, color }) {
      // 메시지 및 색상 업데이트
      commit("ADD_TOAST", { message, color });
      // 타이머 업데이트
      setTimeout(() => {
        // tosats[0] 삭제
        commit("REMOVE_TOAST");
      }, 3000);
    },
  },
  mutations: {
    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
  },
};
