<template>
	<div>
		<Hearder :navActive='navActive' />

		<div class="brand-box-warp">
			<div class="brand-box">
				<h1 class="brand-title">品牌合作</h1>
				<p class="brand-desc">Brand cooperation</p>

				<div class="cooperation-box-logo">
					<div class="left-img">
						<img src="~/assets/images/pic_brandcooperation_pic1@3x.png" />
						<img src="~/assets/images/pic_brandcooperation_bg@2x.png" class="brand-left-bg" />

					</div>
					<div class="logo-group">
						<div class="logo-list"  v-for="item in brand" :key="item.id">
							<nuxt-link :to="'/brandCooperation/'+item.id">
								<div class="logo-imgs">
									<img :src="imgUrl+item.logo" />
								</div>
								<div class="logo-hover-img">
									<img :src="imgUrl+item.logo_hover" />
								</div>
								<p>{{item.name}}</p>
							</nuxt-link>

						</div>
						
					</div>
				</div>

				<div class="idea">
					<div class="idea-title">
						<img src="~/assets/images/pic_cooperation_titie@2x.png" />
						我们的服务理念
						<img src="~/assets/images/pic_cooperation_titie2@2x.png" />
					</div>
					<div class="brand-cooperation">
						<div class="brand-cooperation-left" v-html="cooperation.content">
						</div>
						<div class="brand-cooperation-right">
							<img :src="imgUrl+cooperation.image_url" />
						</div>
					</div>
				</div>

				<!-- <div class="swiper-warp-box">
					<div class="idea-swiper swiper-brand-warp" v-swiper:swiper="swiperOption1" ref="swiper">
						<div class="swiper-wrapper">
							<div class="swiper-slide">

								<div class="brand-cooperation swiper-brand">
									<div class="brand-cooperation-right">
										<img src="~/assets/images/pic_brandcooperation_pic3@2x.png" />
									</div>
									<div class="brand-cooperation-left">
										<p>
											深圳市润昌隆实业有限公司是一家专门从事快速消费品和品牌营销综合性多元化实业公司。</p>
										<p> 总部位于深圳罗湖、在广州、湖南等地拥有办事处和专业的营销团队，专注于工厂至零售平台销售服务，产品类型多样化、个性化。 行业积累沉淀了十多年，以安全、诚信、高效赢得合作商和消费者的认可。
											深圳市润昌隆实业有限公司是一家专门从事快速消费品和品牌营销综合性多元化实业公司。 </p>
										<p> 深圳市润昌隆实业有限公司是一家专门从事快速消费品和品牌营销综合性多元化实业公司。
										</p>
									</div>

								</div>

							</div>

						</div>
						<div class="swiper-pagination"></div>

					</div>
					<img class="right-bottom-img" src="/images/pic_brandcooperation_bg4@2x.png" />
				</div> -->
				
				<div class="server-box">
					<div class="brand-cooperation swiper-brand">
						<div class="brand-cooperation-right">
							<div class="idea-swiper swiper-brand-warp" v-swiper:swiper="swiperOption1" ref="swiper">
								<div class="swiper-wrapper">
									<div class="swiper-slide" v-for="item in servers.images_url" :key="item.id">
										<img :src="imgUrl+item" />
									</div>							
								</div>
								<div class="swiper-pagination"></div>
							</div>
						</div>
						<div class="brand-cooperation-left" v-html="servers.content"></div>
					</div>
				
					<img class="right-bottom-img" src="/images/pic_brandcooperation_bg4@2x.png" />
				</div>

			</div>
			<img src="~/assets/images/pic_brandcooperation_leaf@2x.png" class="posi-img" />
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
			let brands = await getRequest(`brand`);
			let brand_server = await getRequest(`brand_server`);
			let brand_cooperation = await getRequest('brand_cooperation');
			let footer = await getRequest(`footer`);
			
			return {
				brand: brands.data.data,
				servers:brand_server.data,
				cooperation:brand_cooperation.data,
				footers: footer.data
			};

		},
		data() {
			return {
				navActive: 'brand-cooperation',
				swiperOption1: {
					pagination: {
						el: '.swiper-pagination'
					}
				},
				imgUrl: process.env.imgUrl
			};
		},
		created() {
			
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
