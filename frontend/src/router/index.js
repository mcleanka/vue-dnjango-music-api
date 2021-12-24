import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Category from '../views/Category.vue'
import Search from '../views/Search.vue'
import Card from '../views/Card.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'

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
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
