<template>
  <nav aria-label="Page navigation" style="margin-top: 10px">
    <ul class="pagination">
      <!-- 현재 1페이지라면 보여지지 않는다. 이전버튼은 -->
      <li class="page-item" v-if="page !== 1">
        <a class="page-link" style="cursor: pointer" @click="getTodo(page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!-- 페이지 링크 -->
      <li
        class="page-item"
        v-for="index in totalPage"
        :key="index"
        :class="page === index ? 'active' : ''"
      >
        <a class="page-link" style="cursor: pointer" @click="getTodo(index)">{{
          index
        }}</a>
      </li>

      <!-- 마지막 페이지라면 출력안함 -->
      <li class="page-item" v-if="page !== totalPage">
        <a class="page-link" style="cursor: pointer" @click="getTodo(page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["page", "totalPage"],
  setup(prop, { emit }) {
    const getTodo = (page) => {
      emit("get-todo", page);
    };
    return {
      getTodo,
    };
  },
};
</script>

<style></style>
