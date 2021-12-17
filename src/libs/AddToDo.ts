import { Ref } from "vue";
import { ATodo } from "../types/todos";
import { todoStorage } from "./local_strage";
export function doAddTodo(todos:ATodo[],comment:Ref<HTMLInputElement|undefined>){
    if (!comment.value || !comment.value.value.length){
        return
    }
    // { 新しいID, コメント, 作業状態 }
    // というオブジェクトを現在の todos リストへ push
    // 作業状態「state」はデフォルト「作業中=0」で作成
    todos.push({
        id: todoStorage.uid++,
        comment: comment.value.value,
        state: 0
    });
    // フォーム要素を空にする
    comment.value.value = '';
    //return { todos, comment }
}