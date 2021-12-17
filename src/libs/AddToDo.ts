import { Ref } from "vue";
import { ATodo, Form } from "../types/todos";
import { todoStorage } from "./local_strage";
export function doAddTodo(todos:ATodo[],form:Form){
    if (!form.comment || !form.comment.length){
        return
    }
    // { 新しいID, コメント, 作業状態 }
    // というオブジェクトを現在の todos リストへ push
    // 作業状態「state」はデフォルト「作業中=0」で作成
    todos.push({
        id: todoStorage.uid++,
        comment: form.comment,
        state: 0
    });
    // フォーム要素を空にする
    form.comment = '';
    //return { todos, comment }
}