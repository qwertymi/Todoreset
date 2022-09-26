<template>
  <div class="container">
    <h2>Todo List</h2>
    <!-- 입력창 -->
    <input
      type="text"
      class="form-control mb-4"
      v-model="searchText"
      placeholder="검색"
    />
    <TodoForm @add-todo="addTodo" />
    <!-- 서버에러 -->
    <div style="color: red">{{ error }}</div>

    <!-- 경고메시지 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>

    <!-- 할일목록 -->
    <TodoList
      :todos="filterTodos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />
  </div>
</template>
<script>
import { computed, ref } from "vue";
import TodoForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";
import axios from "axios";
export default {
  components: {
    TodoForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const searchText = ref("");
    const filterTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    const getTodo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        todos.value = res.data;
      } catch (err) {
        error.value = "목록 호출 실패";
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
      } catch (err) {
        error.value = "목록 추가 실패";
      }
    };

    const deleteTodo = async (index) => {
      try {
        // 실제 id를 파악
        const id = todos.value[index].id;
        await axios.delete("http://localhost:3000/todos/" + id);
        todos.value.splice(index, 1);
      } catch (err) {
        error.value = "목록 삭제 실패";
      }
    };

    const toggleTodo = async (index) => {
      try {
        const id = todos.value[index].id;
        const complete = !todos.value[index].complete;
        await axios.patch("http://localhost:3000/todos/" + id, {
          complete,
        });
        todos.value[index].complete = complete;
      } catch (err) {
        err.value = "상태 업데이트 실패";
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
