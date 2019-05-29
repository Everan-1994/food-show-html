<template>
	<div>
		<div class="banner-warp">
			<div v-swiper:mySwiper1="swiperOption" class="banner" ref="mySwiper1">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="item in banners" :key="item.id">
						<a :href="item.jump_url" class="banner-img">
							<img :src="imgUrl+item.img_url" />
						</a>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<img src="/images/pic_home_banner_arc.png" class="home-banner-botton" />
		</div>


		<div class="brand" style="background-image: url(images/pic_home_bg1.png);">
			<img src="~/assets/images/pic_honme_leaf1.png" class="right-yezi" />
			<img src="~/assets/images/pic-_ome_leaf2.png" class="right-yezi2" />
			<div class="container">
				<div class="home-title">
					<div class="icon-img">
						<img src="~/assets/images/pic_honme_titlepic.png" />
					</div>
					<h1>他们选择了润昌</h1>
					<p>品牌种类</p>
				</div>

				<div class="brand-group">
					<div class="brand-list" v-for="item in brand" :key="item.id">
						<nuxt-link :to="'/brandCooperation/'+item.id">
							<div class="brand-logo">
								<img :src="imgUrl+item.logo" />
							</div>
							<p>{{item.name}}</p>
						</nuxt-link>
					</div>
					

				</div>
			</div>
		</div>

		<div class="shangChao">
			<img src="images/pic_home_bg2.png" class="shangchaobg" />
			<div class="shangchao-info">
				<div class="home-title">
					<div class="icon-img">
						<img src="~/assets/images/pic_honme_titlepic.png" />
					</div>
					<h1>我们合作的商超</h1>
					<p>商超合作</p>
				</div>
				<div v-swiper:mySwiper="swiper" class="shangChao-siper" ref="mySwiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="item in superArr" :key="item.id">
							<nuxt-link :to="'/businessSuperCooperation/'+item.id" class="shangchao-img" style="background-image: url(images/pic_home_round1.png);">
								<img :src="imgUrl+item.logo" />
							</nuxt-link>
						</div>
					</div>
					<div class="swiper-button-prev" style="background-image: url('/images/ic_home_back.png') !important;"></div>
					<div class="swiper-button-next" style="background-image: url('/images/ic_home_next.png') !important;"></div>

				</div>
			</div>


			<img src="images/pic_home_bg22.png" class="shangchaobg" />

		</div>
		<div class="corporate-culture">
			<img src="../assets/images/pic-home-leaf3.png" class="right-yeai3" />
			<div class="container">
				<div class="home-title">
					<div class="icon-img">
						<img src="~/assets/images/pic_honme_titlepic.png" />
					</div>
					<h1>他们为什么选择润昌隆</h1>
					<p>企业文化</p>
				</div>
				<div class="corporate-culture-info">
					<div class="corporate-culture-left">
						<h2>{{culture.name}}</h2>
						<p class="corporate-name-desc">{{culture.en_name}}</p>
						<div class="corporate-culture-desc" v-html="culture.content">
							
						</div>
					</div>
					<div class="corporate-culture-img">
						<img :src="imgUrl+culture.image_url" />
					</div>
				</div>

			</div>


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
			let banner = await getRequest(`banner`);
			let brands = await getRequest(`brand`,{pageSize:12});
			let supers = await getRequest(`super`);
			let company_culture = await getRequest(`company_culture`);
			let footer = await getRequest(`footer`);
			
			
			return {
				banners: banner.data,
				brand:brands.data.data,
				superArr:supers.data,
				culture:company_culture.data,
				footers: footer.data,
			};


		},
		data() {
			return {
				imgUrl:'',
				swiperOption: {
					pagination: {
						el: '.swiper-pagination'
					},
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					loop: true,
					autoplay: {
						delay: 4000,
						disableOnInteraction: false
					}
				},
				swiper: {
					watchSlidesProgress: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					loopedSlides: 5,
					loop: true,
					// autoplay: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					on: {
						progress: function(progress) {
							for (let i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i);
								var slideProgress = this.slides[i].progress;
								var modify = 1;
								if (Math.abs(slideProgress) > 1) {
									modify = (Math.abs(slideProgress) - 25) * 0.1 + 0;
								}
								var translate = -0.1 * slideProgress * modify * 124 + 'px';
								var scale = 1 - Math.abs(slideProgress) / 3;
								var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
								slide.transform('translateX(' + translate + ') scale(' + scale + ')');
								slide.css('zIndex', zIndex);
								slide.css('opacity', 1);
								if (Math.abs(slideProgress) > 3) {
									slide.css('opacity', 0);
								}
							}
						},
						setTransition: function(transition) {
							for (var i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i)
								slide.transition(transition);
							}

						}
					}


				}
			};
		},
		created() {
			this.imgUrl = process.env.imgUrl
			
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
