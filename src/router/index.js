import Vue from 'vue'
import VueRouter from 'vue-router'
import SingleProduct from '../views/SingleProduct.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'SingleProduct',
      component: SingleProduct
    },
    {
      path: '/zoom-test',
      name: 'zoomTest',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/zoomTest.vue')
    },
  ]
})

export default router
