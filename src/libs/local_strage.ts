// localStorage persistence
import { reactive } from "vue";
import { ATodo } from "../types/todos";
const STORAGE_KEY = "todos-vuejs-2.0";
export const todoStorage = {
    uid:0,
    fetch() {
        const jtodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        jtodos.forEach((todo:any, index:any) => {
            todo.id = index;
        });
        todoStorage.uid = jtodos.length;
        const todos:ATodo[] = reactive<ATodo[]>(jtodos);
        return todos;
    },
    save(todos:ATodo[]) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};