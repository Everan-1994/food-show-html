<template>
	<div>
		<Hearder :navActive='navActive' />

		<div class="brand-box-warp big-bg">
			<div class="left-img">
				<img src="~/assets/images/pic_brandcooperation_pic1@3x.png" />
			</div>
			<div class="brand-box min-brand-width">
				<h1 class="brand-title">品牌合作</h1>
				<p class="brand-desc">Brand cooperation</p>



				<div class="cooperation-box-logo">

					<div id="carousel2" v-swiper:mySwiper1="swiperOption" class="brand-detail banner" ref="mySwiper1">
						<div class="swiper-wrapper">
							<div class="swiper-slide"  v-for="(items,index) in brand" :key="index">
								<div class="logo-group">
									<div class="logo-list" v-for="item in items" :key="item.id">
										<nuxt-link :to="'/brandCooperation/'+item.id">
											<div class="logo-imgs">
												<img :src="imgUrl+item.logo" />
											</div>
											<div class="logo-hover-img">
												<img :src="imgUrl+item.logo_hover" />
											</div>
											<p>{{item.name}}</p>
											<div class="detail-btn">
												<img src="~/assets/images/right-whrite.png" />
											</div>
										</nuxt-link>

									</div>

								</div>
							</div>
						</div>
						<div class="swiper-button-prev" style="background-image: url('/images/icon-left2.png') !important;opacity: 1!important;margin-top: -68px !important;width: 47px !important;height: 100px!important;"></div>
						<div class="swiper-button-next" style="background-image: url('/images/icon-left2.png') !important;transform: rotate(180deg);margin-top: -68px !important;opacity: 1!important;width: 47px !important;height: 100px!important;"></div>

					</div>



				</div>

				<div class="w1200">
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
			let brands = await getRequest(`brand?pageSize=24`);
			let brand_server = await getRequest(`brand_server`);
			let brand_cooperation = await getRequest('brand_cooperation');
			let footer = await getRequest(`footer`);

			let brans_data = brands.data.data;			
			let arr = []
			let len = brans_data.length
			let n = 8
			let lineNum = len % 8 === 0 ? len / 8 : Math.floor((len / 8) + 1);//8的倍数
			for (let i = 0; i < lineNum; i++) {
				let temp = brans_data.slice(i * n, i * n + n);
				arr.push(temp);
			}
			return {
				brand: arr,
				servers: brand_server.data,
				cooperation: brand_cooperation.data,
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
				imgUrl: process.env.imgUrl,
				swiperOption: {

					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				}
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
