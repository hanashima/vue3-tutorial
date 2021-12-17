<template>

    <label v-for="label in options">
    <input type="radio"
        v-model="current"
        v-bind:value="label.value">{{ label.label }}
    </label>

    <table class="todo_tab">
    <!-- テーブルヘッダー -->
        <thead>
            <tr>
                <th class="id">ID</th>
                <th class="comment">コメント</th>
                <th class="state">状態</th>
                <th class="button">-</th>
            </tr>
        </thead>
        <tbody>
        <!-- [1] ここに <tr> で ToDo の要素を1行づつ繰り返し表示したい -->
            <tr v-for="item in computedTodos" v-bind:key="item.id">
                <th>{{ item.id }}</th>
                <td>{{ item.comment }}</td>
                <td class="state">
                    <button v-on:click="doChangeState(item)">
                    {{ labels[item.state] }}</button>
                </td>
                <td class="button">
                    <button v-on:click="doRemove(item)">削除</button>
                </td>
            </tr>
        </tbody>
    </table>
    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
        <!-- コメント入力フォーム -->
        コメント <input type="text" ref="comment">
        <!-- 追加ボタンのモック -->
        <button type="submit">追加</button>
    </form>
</template>

<script lang="ts">
import { ATodo } from "../types/todos";
import { todoStorage } from '../libs/local_strage'
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { doAddTodo } from "../libs/AddToDo";
//defineProps<{todos:ATodo[]}>()
export default defineComponent({
    data(){
        return{
            options:[
                { value: -1, label: 'すべて' },
                { value: 0,  label: '作業中' },
                { value: 1,  label: '完了' }
            ],
            current: -1
        }
    },
    setup(_, context){
        let todos:ATodo[] = reactive<ATodo[]>([]);
        todos = todoStorage.fetch();
        let current = ref(-1);
        const options = [
            { value: -1, label: 'すべて' },
            { value: 0,  label: '作業中' },
            { value: 1,  label: '完了' }
        ];
        const comment = ref<HTMLInputElement>();

        const computedTodos = computed(()=> todos.filter((el)=>{
            return current.value < 0 ? true : current.value === el.state
        }));
        const labels = computed(():{[key:number]:string}=> options.reduce((a,b)=>{
            return Object.assign(a, {[b.value]:b.label})
        },{}));

        const doAdd = function() { doAddTodo(todos, comment) };

        const doChangeState = function(item:ATodo) { item.state = item.state ? 0 : 1 };
        // 削除の処理
        const doRemove = function(item:ATodo) {
            let index = todos.indexOf(item)
            todos.splice(index, 1)
        };
        watch(todos, ()=>{ todoStorage.save(todos); });

        return { 
            todos, current, options, computedTodos, 
            labels, comment, doAdd, doRemove, doChangeState 
        };
    },
});
</script>

<style scoped>
table.todo_tab{
    margin:auto;
}
</style>