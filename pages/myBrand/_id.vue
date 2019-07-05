<template>
	<div style="position: relative;">
		<Hearder :navActive='navActive' />
		<div class="brand-box-warp big-bg">
			<div class="brand-box">
				<h1 class="brand-title">{{ownArr.goods_name}}</h1>
				<p class="brand-desc">Extruded Pellet</p>

				<div class="crumbs">
					<nuxt-link to='/myBrand/brand'>Lots of fun</nuxt-link>
					<nuxt-link to='/myBrand/brandlist'>产品列表</nuxt-link>
					<nuxt-link :to='id'>产品详情</nuxt-link>
				</div>

				<div id="carousel2" v-swiper:mySwiper1="swiperOption" class="brand-detail banner" ref="mySwiper1">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item in ownArr.images_url" :key="item.id">
							<a href="javascript:void(0)" class="banner-img">
								<img :src="imgUrl+item" />
							</a>
						</div>
					</div>
					<div class="swiper-button-prev" style="background-image: url('/images/icon-left2.png') !important;opacity: 1!important;margin-top: -100px !important;width: 47px !important;height: 100px!important;"></div>
					<div class="swiper-button-next" style="background-image: url('/images/icon-left2.png') !important;transform: rotate(180deg);margin-top: -100px !important;opacity: 1!important;width: 47px !important;height: 100px!important;"></div>

				</div>

				<div class="detail">
					<h3 class="detail-title">产品详情 </h3>

					<div v-html="ownArr.goods_content"></div>
					<div class="imgs-boxs" v-if="ownArr.detail_img != null">
						<img :src="imgUrl+ownArr.detail_img" />
					</div>
				</div>

			</div>

			<img src="../../assets/images/pic-home-leaf3.png" class="yezi5" />
			<img src="../../assets/images/pic_brankdetails_leaf@2x.png" class="left-yezi1" />
		</div>
		<div class="reture-list" @click="getReturn">
			<img src="/images/icon-left.png" />
			<p>返回</p>
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
			let own_brands = await getRequest(`own_brand/${params.id}`);
			let footer = await getRequest(`footer`);

			return {
				ownArr: own_brands.data,
				footers: footer.data
			};

		},
		data() {
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'brand',
				id: '',
				banners: [{
						url: '#',
						imagePath: 'http://pic40.nipic.com/20140331/9469669_142840860000_2.jpg'
					},
					{
						url: '#',
						imagePath: 'http://img.redocn.com/sheying/20140731/qinghaihuyuanjing_2820969.jpg'
					}
				],
				swiperOption: {

					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				}
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
		methods: {
			getReturn() {
				this.$router.push({
					path: '/myBrand/brandlist',
				})
			}
		}
	};
</script>

<style>
	.imgs-boxs {
		text-align: center;
		margin-top: 30px;
	}

	.imgs-boxs img {
		max-width: 100%;
		height: auto;
	}
</style>
