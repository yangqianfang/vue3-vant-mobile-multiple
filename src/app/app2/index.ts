import { createApp } from 'vue'
import App from './app2.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/test',
            component: () => import('./test.vue'),
        },
    ],
})

createApp(App).use(router).mount('#app')
