import { createApp } from 'vue'
import App from './index.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
const router = createRouter({
    history: createWebHistory(),
    routes: [],
}) 
createApp(App).use(router).use(createPinia())
.mount('#app')
