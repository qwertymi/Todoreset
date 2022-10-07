<template>
  <div class="container">
    <div class="d-flex justify-content-between mb-3 mt-3">
      <h2>Todo List</h2>
      <button class="btn btn-primary btn-sm" @click="moveToCreate">
        Create Todo
      </button>
    </div>
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
    <ErrorBox :errtext="error" />
    <!-- 목록없음 안내 -->
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 할일목록 -->
    <TodoList
      :todos="todos"
      @delete-todo="deleteTodo"
      @toggle-todo="toggleTodo"
    />
    <!-- Pagination -->
    <PaginationView :page="page" :totalpage="totalPage" @get-todo="getTodo" />
    <!-- 안내상자 -->
    <ToastBox v-if="showToast" :message="toastMessage" :color="toastType" />
  </div>
</template>

<script>
import axios from "@/api/axios";
import { computed, ref, watch, watchEffect } from "vue";
import TodoList from "@/components/TodoList.vue";
import PaginationView from "@/components/PaginationView.vue";
import ErrorBox from "@/components/ErrorBox.vue";
import { useRouter } from "vue-router";
import { useToast } from "@/composables/toast";

export default {
  components: {
    TodoList,
    PaginationView,
    ErrorBox,
  },
  emits: [],
  setup() {
    const { triggerToast } = useToast();

    const todos = ref([]);

    const totalCout = ref(0);
    const limit = 5;
    const page = ref(1);
    const totalPage = computed(() => {
      return Math.ceil(totalCout.value / limit);
    });

    const searchText = ref("");

    // ref, reactive, computed, props 등이 변경될때 마다 실행
    // watchEffect 를 사용합니다.
    watchEffect(() => {});
    let timeout = null;

    watch(searchText, () => {
      clearTimeout(timeout);
      // 그리고 다시 타이머를 생성한다.
      timeout = setTimeout(() => {
        getTodo(1);
      }, 2000);
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
          `todos?_page=${nowPage}&_limit=${limit}&subject_like=${searchText.value}&_order=desc&_sort=id`
        );
        todos.value = response.data;
        // 총 목록수
        totalCout.value = response.headers["x-total-count"];
        page.value = nowPage;
        // triggerToast("Welcome :)");
      } catch (err) {
        error.value = "서버 목록 호출에 실패했습니다. 잠시 뒤 이용해주세요.";
        // emit("list-load-fail-toast", {});
        triggerToast("호출 실패!", "danger");
      }
    };

    getTodo();

    const error = ref("");

    const deleteTodo = async (index) => {
      try {
        const id = index;
        await axios.delete("todos/" + id);
        // todos.value.splice(index, 1);
        // 목록이 삭제되면 1페이지로 이동
        getTodo(page.value);
        // emit("delete-todo-toast", {});
        triggerToast("삭제 성공!", "success");
      } catch (err) {
        error.value = "삭제 요청이 거부되었습니다.";
        // emit("delete-todo-fail-toast", {});
        triggerToast("삭제 실패!", "danger");
      }
    };

    const toggleTodo = async (index) => {
      try {
        const id = todos.value[index].id;
        const complete = !todos.value[index].complete;
        await axios.patch("todos/" + id, {
          complete,
        });

        todos.value[index].complete = complete;
        // emit("update-todo-toast", {});
        triggerToast("업데이트 성공!", "success");
      } catch (err) {
        error.value = "업데이트에 실패하였습니다.";
        // emit("update-todo-fail-toast", {});
        triggerToast("업데이트 실패!", "danger");
      }
    };

    const router = useRouter();
    const moveToCreate = () => {
      router.push({ name: "TodoCreate" });
    };

    return {
      todos,
      deleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
      error,
      totalPage,
      page,
      getTodo,
      moveToCreate,
    };
  },
};
</script>

<style>
.todostyle {
  text-decoration: line-through;
  color: gray;
}
</style>
