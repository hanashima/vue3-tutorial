import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createRouter, createWebHistory} from 'vue-router'
import ToDo from './components/ToDo.vue'
import Home from './views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },{
        path:'/todo',
        name:'todo',
        component: ToDo
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

createApp(App).use(router).use(ElementPlus).mount('#app')
