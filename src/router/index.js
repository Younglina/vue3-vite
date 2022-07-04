import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/home/index.vue'
import Info from '@/views/home/info.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router