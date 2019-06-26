<template>
	<header class="header">
		<div class="container">
			<ul class="nav">
				<li :class="navActive == 'home' ? 'active' : ''">
					<nuxt-link to="/" >首页</nuxt-link>
				</li>
				<li :class="navActive == 'brand-cooperation' ? 'active' : ''">
					<nuxt-link to="/brand-cooperation">品牌合作</nuxt-link>
				</li>
				<li :class="navActive == 'businessSuperCooperation' ? 'active' : ''">
					<nuxt-link to="/businessSuperCooperation/default">商超合作</nuxt-link>
				</li>
				<li :class="navActive == 'brand' ? 'active' : ''">
					<nuxt-link to="/myBrand/brand">Lots of fun</nuxt-link>
				</li>
			</ul>
			<div class="logo-center">
				<nuxt-link to='/'>
					<img src="~/assets/images/pic_top_logo@2x.png" />
				</nuxt-link>
			</div>
			<ul class="nav right-nav">
				<li :class="navActive == 'news' ? 'active' : ''">
					<nuxt-link to="/news/0">新闻中心</nuxt-link>
				</li>
				<li :class="navActive == 'about' ? 'active' : ''">
					<a href="/aboutUs">关于我们</a>
				</li>
				<li :class="navActive == 'contact' ? 'active' : ''">
					<nuxt-link to="/contact">联系我们</nuxt-link>
				</li>
			</ul>
		</div>
	</header>
</template>

<script>
	export default {
		name: 'douHeader',
		data() {
			return {

			};
		},
		props: {
			navActive: {
				default:'home',
				type:String
			}
		},
		created() {

		},
		mounted() {
			
		},
		methods: {
			
		}
	};
</script>

<style lang="less" scoped="scoped">
	#ul {
		// height: 700px;
	}
</style>
