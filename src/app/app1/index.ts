import { createApp } from 'vue'
import App from './app1.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/test',
            component: () => import('./test.vue'),
        },
    ],
})

createApp(App).use(router).mount('#app')
