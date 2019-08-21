<template>
	<header class="header">
		<div class="container">
			<ul class="nav">
				<li :class="navActive == 'home' ? 'active' : ''">
					<a href="/" >首页</a>
				</li>
				<li :class="navActive == 'brand-cooperation' ? 'active' : ''">
					<a href="/brand-cooperation">品牌合作</a>
				</li>
				<li :class="navActive == 'businessSuperCooperation' ? 'active' : ''">
					<a href="/businessSuperCooperation/default">商超合作</a>
				</li>
				<li :class="navActive == 'brand' ? 'active' : ''">
					<a href="/myBrand/brand">Lots of fun</a>
				</li>
			</ul>
			<div class="logo-center">
				<a href='/'>
					<img src="~/assets/images/pic_top_logo@2x.png" />
				</a>
			</div>
			<ul class="nav right-nav">
				<li :class="navActive == 'news' ? 'active' : ''">
					<a href="/news/0">新闻中心</a>
				</li>
				<li :class="navActive == 'about' ? 'active' : ''">
					<a href="/aboutUs">关于我们</a>
				</li>
				<li :class="navActive == 'contact' ? 'active' : ''">
					<a href="/contact">联系我们</a>
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
