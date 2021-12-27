import { Home, Product, Category, Card, Search, Success, Checkout, MyAccount, SignUp, LogIn } from '../views/index.js'

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
		path: '/cart/checkout',
		name: "Checkout",
		component: Checkout,
		meta: {
			requireLogin: true
		}
	},
	{
		path: '/cart/success',
		name: "Success",
		component: Success,
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

export default routes;