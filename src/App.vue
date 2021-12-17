<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import ToDo from './components/ToDo.vue'
import { todoStorage } from './libs/local_strage';
import { ATodo } from './types/todos';

let todos:ATodo[] = [
  { "id": 0, "comment": "新しいToDo1", "state": 0 },
  { "id": 1, "comment": "新しいToDo2", "state": 0 }
];

todoStorage.save(todos);
todoStorage.uid = todos.length;

</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <ToDo></ToDo>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
