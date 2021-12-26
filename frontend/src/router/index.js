import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Card from '../views/Card.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import MyAccount from '../views/MyAccount.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:category_slug/:product_slug/',
    name: 'Product',
    component: Product
  },
  {
    path: '/:category_slug',
    name: "Category",
    component: Category
  },
  {
    path: '/search',
    name: "Search",
    component: Search
  },
  {
    path: '/cart',
    name: "Card",
    component: Card
  },
  {
    path: '/log-in',
    name: "LogIn",
    component: LogIn
  },
  {
    path: '/sign-up',
    name: "SignUp",
    component: SignUp
  },
  {
    path: '/my-account',
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'Login', query: { to: to.path } })
  } else {
    next()
  }
})

export default router
