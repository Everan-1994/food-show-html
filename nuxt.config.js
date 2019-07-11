import pkg from './package'

export default {
	mode: 'universal',

	/*
	 ** Headers of the page
	 */
	head: {
		title: pkg.name,
		meta: [{
				charset: 'utf-8'
			},
			// {
			// 	name: 'viewport',
			// 	// content: 'width=device-width, initial-scale=1'
			// },
			{
				hid: 'description',
				name: 'description',
				content: pkg.description
			}
		],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}],
		script: [{
			src: 'http://api.map.baidu.com/api?v=2.0&ak=EAq0MkTzIBOK6hsTvKNhRgMEi7thLfjI'
		}],

	},

	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: '#fff'
	},

	/*
	 ** Global CSS
	 */
	css: [{
			src: 'assets/css/public.less'
		},
		{
			src: 'assets/css/common.less'
		},
		{
			src: 'swiper/dist/css/swiper.css'
		}
	],

	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [{
			src: '~plugins/vue-axios',
			ssr: true
		},
		{
			src: '~plugins/vue-swiper',
			ssr: true
		}
	],
	proxy: [
		[
			'/api',
			{
				target: 'http://food.lzdu.com/api/', // api主机
				pathRewrite: {
					'^/api': '/'
				}
			}
		]
	],
	env: {
		baseUrl: 'http://localhost:8000/api/',
		imgUrl: 'http://food.resource.lzdu.com/'
	},

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/proxy',
	],
	/*
	 ** Axios module configuration
	 */
	axios: {
		// See https://github.com/nuxt-community/axios-module#options
	},

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	},
	server: {
		port: 8000,
		host: 'localhost',
	},
}
