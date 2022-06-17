import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/users',
    name:'users',
    component:() => import('../views/Users.vue') 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
