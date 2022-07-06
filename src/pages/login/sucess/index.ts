import { createApp } from 'vue'
import App from './index.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
         
    ],
})

createApp(App).use(router).mount('#app')
