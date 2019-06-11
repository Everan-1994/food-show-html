<template>
	<div>
		<Hearder :navActive='navActive' />
		<div class="brand-box-warp">
			<div class="brand-box">
				<h1 class="brand-title">商超合作</h1>
				<p class="brand-desc">Brand cooperation</p>
				
				<div class="crumbs">
					<nuxt-link to='/businessSuperCooperation/default'>商超合作</nuxt-link>
					<nuxt-link :to='id'>详情</nuxt-link>
				</div>
				
				<div class="super-box">
					<h1 class="super-title">{{superArr.name}} </h1>
					<main v-html="superArr.content"></main>
					
					<div class="img">
						<img :src="imgUrl+item" v-for="item in superArr.images_url " :key="item" />
					</div>
				</div>
			</div>
			
			
			<img src="~/assets/images/pic_cooperation_pic1@2x.png"  class="left-tu1"/>
			<img src="~/assets/images/pic_cooperation_pic2@2x.png"  class="left-tu2"/>
			<img src="~/assets/images/pic_cooperation_pic3@2x.png"  class="left-tu3"/>
			<img src="~/assets/images/pic-ownbrand-leaf1@2x.png"  class="left-tu4"/>
		</div>
		<Footer :data="footers" />
	</div>
</template>

<script>
	import Hearder from '~/components/header.vue';
	import Footer from '~/components/footer.vue';
	import {
		getRequest
	} from '~/plugins/vue-axios';

	export default {
		async asyncData({
			params,
			error
		}) {
			let supers = await getRequest(`super/${params.id}`);
			let footer = await getRequest(`footer`);
						
			return {
				superArr: supers.data,
				footers: footer.data
			};

		},
		data() {
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'businessSuperCooperation',
				id:""
				
				
			};
		},
		created() {
			let id= this.$route.params.id;
			console.log(id)
			this.id = id
		},
		components: {
			Hearder,
			Footer
		},
		methods: {}
	};
</script>


<style>
	main{
		min-height: auto;
	}
	.img{
		margin-top: 30px;;
		width: 100%;
	}
	.img img{
		max-width: 100%;
		height: auto;
	}
</style>
