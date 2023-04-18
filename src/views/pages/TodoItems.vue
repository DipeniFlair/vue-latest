<template>
  <section class="py-20 text-center text-white">
    <div class="container">
      <h1 class="text-[50px] mb-5">Here you can create and manage To-Do</h1>
      <div class="bg-gray-800 max-w-5xl w-full mx-auto rounded-xl shadow-lg px-5 py-6">
        <div class="addTodoItem">
          <form action="addToDo" ref="addTodoForm" @submit.prevent="addToDo()" class="flex items-stretch justify-center">
            <div class="control">
              <input v-model="inputVal" type="text"
                class="rounded-lg outline-none focus:ring-0 border-primary-500 focus:border-primary-700 bg-transparent text-white border-r-0 rounded-r-none px-3.5 leading-4"
                placeholder="Add item" />
            </div>
            <div class="control flex gap-x-4">
              <button
                class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 rounded-l-none border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none"
                type="submit">
                Add Task
              </button>
              <button
                class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none"
                type="button" @click="showCompleted()">
                Show Completed
              </button>
              <button
                class="text-white font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 border-primary-500 bg-primary-600 hover:bg-primary-700 focus:outline-none"
                type="button" @click="showRemaining()">
                Show Remaining
              </button>
            </div>
          </form>
          <ul v-if="todos">
            <li v-for="todo in todos" :key="todo.id">
              <a href="javascript:void(0)" @click="toggleTodo(todo)"
                class="py-3 px-5 bg-gray-700 text-left hover:bg-gray-900 transition-all flex gap-4 items-center" :class="{
                  'bg-gray-900 line-through': todo.status == true,
                }"><input type="checkbox" id="" :checked="todo.status == true" class="checkboxDesign" />
                {{ todo.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "TodoItems",
  data() {
    return {
      inputVal: "",
      todos: [],
      finished: [],
      STORAGE_KEY: "vue-latest-todo-list",
    };
  },
  created() {
    document.title = "Todo Items";

    // retrieving our data and converting it back into an array
    let retrievedData = localStorage.getItem("todos");
    // console.log("retrievedData =>", JSON.parse(retrievedData));
    this.todos = JSON.parse(retrievedData);
  },
  mounted() {},
  watch: {},
  methods: {
    addToDo() {
      if (this.inputVal != "") {
        let newItem = this.inputVal.trim("");
        let results = false;

        if (this.todos != null) {
          results = this.todos.some(function (entry) {
            return entry.text === newItem;
          });
        }

        if (!results) {
          this.todos = this.todos ?? [];
          this.todos.push({
            text: newItem,
            status: false,
          });
        } else {
          console.log("new item exists already");
        }

        this.$refs.addTodoForm.reset();
        localStorage.todos = JSON.stringify(this.todos);
      } else {
        alert("Please add text")
      }

      this.inputVal = "";
    },
    toggleTodo(todo) {
      todo.status = !todo.status;
      localStorage.todos = JSON.stringify(this.todos);
    },
    showCompleted() {
      this.finished = this.todos.filter(todo => todo.status)
      console.log("here's completed tasks", this.finished);
      // localStorage.todos = JSON.stringify(this.todos);
    },
    showRemaining() {
      this.remaining = this.todos.filter(todo => !todo.status)
      console.log("showing remaining", this.remaining);
    },
  },
};
</script>
