<template>
	<div>
		<Hearder :navActive='navActive' />
	<div class="brand-box-warp big-bg" style="overflow: unset;">
		<div class="brand-box">
			<h1 class="brand-title">商超合作</h1>
			<p class="brand-desc">Brand cooperation</p>
			<div class="business" v-swiper:mySwiper="swiperOption" >
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in superArr" :key="index">
						<div class="cooperation-group">
							<div class="cooperation-list" v-if="item[0]">
								<nuxt-link :to="'/businessSuperCooperation/'+item[0].id">
									<div class="logo-img">
										<img :src="imgUrl+item[0].logo" />
									</div>
									<h2 class="name">{{item[0].name}}</h2>
									<p class="desc">{{item[0].intro}}</p>
									<button class="c-btn">
										查看详情
										<span class="arrow"></span>
									</button>
								</nuxt-link>
							</div>
							<div class="cooperation-list second" v-if="item[1]">
								<nuxt-link :to="'/businessSuperCooperation/'+item[1].id">
									<div class="logo-img">
										<img :src="imgUrl+item[1].logo" />
									</div>
									<h2 class="name">{{item[1].name}}</h2>
									<p class="desc">{{item[1].intro}}</p>
									<button class="c-btn">
										查看详情
										<span class="arrow"></span>
									</button>
								</nuxt-link>
							</div>
							<div class="cooperation-list third" v-if="item[2]">
								<nuxt-link :to="'/businessSuperCooperation/'+item[2].id">
									<div class="logo-img">
										<img :src="imgUrl+item[2].logo" />
									</div>
									<h2 class="name">{{item[2].name}}</h2>
									<p class="desc">{{item[2].intro}}</p>
									<button class="c-btn">
										查看详情
										<span class="arrow"></span>
									</button>
								</nuxt-link>
							</div>
							<div class="cooperation-list four" v-if="item[3]">
								<nuxt-link :to="'/businessSuperCooperation/'+item[3].id">
									<div class="logo-img">
										<img :src="imgUrl+item[3].logo" />
									</div>
									<h2 class="name">{{item[3].name}}</h2>
									<p class="desc">{{item[3].intro}}</p>
									<button class="c-btn">
										查看详情
										<span class="arrow"></span>
									</button>
								</nuxt-link>
							</div>
						 
						</div>
					
					</div>
					
				</div>
				<div class="swiper-button-prev" style="background-image: url('/images/icon-left.png') !important;margin-top: 30px !important;opacity: 1!important;"></div>
				<div class="swiper-button-next" style="background-image: url('/images/icon-left.png') !important;transform: rotate(180deg);margin-top: 30px !important;opacity: 1!important;"></div>
					
			</div>
		
			<div class="idea">
				<div class="idea-title">
					<img src="~/assets/images/pic_cooperation_titie@2x.png" />
					我们的服务理念
					<img src="~/assets/images/pic_cooperation_titie2@2x.png" />
				</div>
				<div class="idea-desc" v-html="supers_server_arr.content">
					 
				</div>
				<div class="idea-swiper"  v-swiper:swiper="swiperOption1" ref="swiper">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,index) in supers_server_arr.images_url" :key='index'>			
								<img :src="imgUrl+item" />					
						</div>
						
					</div>
					<div class="swiper-pagination"></div>
					<div class="swiper-button-prev">
						<img src="~/assets/images/ic_coopertation_previous@2x.png" />
					</div>
					<div class="swiper-button-next">
						<img src="~/assets/images/ic_coopertation_next@2x.png" />
					</div>
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
			let supers = await getRequest(`super`,{chunk:true});
			let supers_server = await getRequest(`super_server`);	
			let footer = await getRequest(`footer`);
			
			return {
				superArr: supers.data,
				supers_server_arr:supers_server.data,
				footers: footer.data
			};

		},
		data() {
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'businessSuperCooperation',
				swiperOption: {
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
					
				},
				swiperOption1:{
					pagination: {
						el: '.swiper-pagination'
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					watchSlidesProgress: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					loopedSlides: 3,
					loop: true,
					on: {
						progress: function(progress) {
							for (let i = 0; i < this.slides.length; i++) {
								var slide = this.slides.eq(i);
								var slideProgress = this.slides[i].progress;
								var modify = 1;
								if (Math.abs(slideProgress) > 1) {
									modify = (Math.abs(slideProgress) - 1) * 0.1 + 1;
								}
								var translate = slideProgress * modify * 275+ 'px';
								
								var zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
								slide.transform('translateX(' + translate + ') ');
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
