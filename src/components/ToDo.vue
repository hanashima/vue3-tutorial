<template>

    <label v-for="label in options">
        <el-radio v-model="current" v-bind:label="label.value">{{ label.label }}</el-radio>

    </label>

    <h2>新しい作業の追加</h2>
    <el-form v-model="form" label-width="120px">
        <!-- コメント入力フォーム -->
        <el-form-item>
            コメント <el-input v-model="form.comment" placeholder="new task"/>
        </el-form-item>
        <!-- 追加ボタンのモック -->
        <el-form-item>
            <el-button type="danger" @click="doAdd">追加</el-button>
        </el-form-item>
    </el-form>
    
    <el-table :data="computedTodos" stripe style="width:80%; margin: auto;">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="コメント" prop="comment" />
        <el-table-column label="状態">
            <template #default="scope">
                <el-button type="primary" @click="doChangeState(computedTodos[scope.$index])">
                    {{labels[computedTodos[scope.$index].state]}}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column label="-">
            <template #default="scope">
                <el-button type="warning" v-on:click="doRemove(computedTodos[scope.$index])">削除</el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script lang="ts">
import { ATodo, Form } from "../types/todos";
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
            current: -1,
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
        const form:Form = reactive<Form>({comment:''});

        const computedTodos = computed(()=> todos.filter((el)=>{
            return current.value < 0 ? true : current.value === el.state
        }));
        const labels = computed(():{[key:number]:string}=> options.reduce((a,b)=>{
            return Object.assign(a, {[b.value]:b.label})
        },{}));

        const doAdd = function() { doAddTodo(todos, form) };

        const doChangeState = function(item:ATodo) { item.state = item.state ? 0 : 1 };
        // 削除の処理
        const doRemove = function(item:ATodo) {
            let index = todos.indexOf(item)
            todos.splice(index, 1)
        };
        watch(todos, ()=>{ todoStorage.save(todos); });

        return { 
            todos, current, options, computedTodos, 
            labels, comment, doAdd, doRemove, doChangeState, form
        };
    },
});
</script>

<style scoped>
table.todo_tab{
    margin:auto;
}
</style>