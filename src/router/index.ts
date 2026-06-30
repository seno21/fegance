import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ProductListing from '@/views/ProductListing.vue'
import Linktree from '@/views/Linktree.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/product',
      name: 'product-listing',
      component: ProductListing
    },
    {
      path: '/product/:slug',
      name: 'product-detail',
      component: ProductDetail
    },
    {
      path: '/linktree',
      name: 'linktree',
      component: Linktree
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
