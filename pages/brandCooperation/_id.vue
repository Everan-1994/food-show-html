<template>
	<div>
		<Hearder :navActive='navActive' />
		<div class="brand-box-warp">
			<div class="brand-box">
				<h1 class="brand-title">品牌合作</h1>
				<p class="brand-desc">Brand cooperation</p>

				<div class="crumbs">
					<nuxt-link to='/brand-cooperation'>品牌合作</nuxt-link>
					<nuxt-link :to='id'>详情</nuxt-link>
				</div>

				<div class="super-box">
					<h1 class="super-title">{{brand.name}}</h1>
					<main v-html="brand.content">
					</main>
				</div>


			</div>

			<img src="/images/pic_brandcoperation_bg5.png" class="brand-detail-bg" />
			<img src="~/assets/images/pic_brandcooperation_leaf2@2x.png" class="brand-pisi1" />
			<img src="~/assets/images/pic_brandcooperation_leaf@2x.png" class="brand-pisi2" />


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
			let id = params.id
			let brands = await getRequest(`brand/${id}`);
			let footer = await getRequest(`footer`);
			return {
				brand: brands.data,
				footers: footer.data
			};

		},
		data() {
			return {
				navActive: 'brand-cooperation',
				id: ""


			};
		},
		created() {
			let id = this.$route.params.id;
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
</style>
