<template>
  <div class="container">
    <h2>Todo List</h2>
    <!-- 할일검색폼 -->
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
    />
    <!-- 할일입력 -->
    <TodoForm @add-todo="addTodo" style="margin-top: 10px" />
    <!-- 서버에러 출력 -->
    <div style="color: red">{{ error }}</div>
    <!-- 목록없음 안내 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 할일목록 -->
    <TodoList
      :todos="filterTodos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />
    <!-- Pagination -->
    <PagniationView :page="page" :totalPage="totalPage" @get-todo="getTodo" />
  </div>
</template>
<script>
import axios from "axios";
import { computed, ref, watch, watchEffect } from "vue";
import TodoForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";
import PagniationView from "./components/PagniationView.vue";
export default {
  components: {
    TodoForm,
    TodoList,
    PagniationView,
  },
  setup() {
    const todos = ref([]);

    // Pagination 구현
    // 전체목록수
    const totalCount = ref(0);
    // 페이지당 보여줄 개수
    const limit = 5;
    // 현재페이지
    const page = ref(1);
    // 총페이지수
    const totalPage = computed(() => {
      return Math.ceil(totalCount.value / limit);
    });

    const searchText = ref("");
    // ref, reactive, computed, props ... 가 변경될 때 마다 실행 => watchEffect
    watchEffect(() => {
      // console.log(page.value);
      // console.log(totalCount.value);
      // console.log(filterTodos.value);
      // console.log(totalPage.value);
    });
    // 이전 값 - 현재 값 을 동시에 감시
    watch(searchText, () => {
      // getTodo(1);
    });

    const filterTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    const getTodo = async (nowPage = page.value) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos?_page=${nowPage}&_limit=${limit}`
        );
        todos.value = response.data;
        // 총 목록수
        totalCount.value = response.headers["x-total-count"];
        page.value = nowPage;
      } catch (err) {
        error.value = "서버 목록 호출에 실패했습니다. 잠시 뒤 이용해주세요.";
      }
    };

    getTodo();

    const error = ref("");
    const addTodo = async (todo) => {
      try {
        await axios.post("http://localhost:3000/todos", {
          id: todo.id,
          subject: todo.subject,
          complete: todo.complete,
        });
        todos.value.push(todo);

        getTodo(1);
      } catch (err) {
        error.value = "서버 데이터 저장 실패";
      }
    };

    const deleteTodo = async (index) => {
      try {
        // 현재 index 는 배열 인덱스 번호 0, 1,2,3,4, 가 전송된다.
        // 실제 저장되어 있는 id 를 파악한다.
        const id = todos.value[index].id;
        await axios.delete("http://localhost:3000/todos/" + id);
        todos.value.splice(index, 1);

        getTodo(page.value);
      } catch (err) {
        error.value = "삭제 요청이 거부되었습니다.";
      }
    };

    const toggleTodo = async (index) => {
      try {
        // 어느 데이터를 수정할 것인가를 전달
        // 업데이트 할 내용을 전달합니다.
        const id = todos.value[index].id;
        const complete = !todos.value[index].complete;
        await axios.patch("http://localhost:3000/todos/" + id, {
          complete,
        });

        todos.value[index].complete = complete;
      } catch (err) {
        error.value = "업데이트에 실패하였습니다.";
      }
    };

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
      error,
      totalPage,
      page,
      getTodo,
    };
  },
};
</script>
<style>
#app {
}
.todostyle {
  text-decoration: line-through;
  color: gray;
}
</style>
