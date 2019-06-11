<template>
	<div>
		<Hearder :navActive='navActive' />
		<div class="brand-box-warp">
			<div class="brand-box">
				<h1 class="brand-title">自有品牌</h1>
				<p class="brand-desc">lots of fun</p>
				<div class="brand-product-group">
					<div class="brand-product-list" v-for="item in ownArr" :data-id="item.id" :key="item.id">
						<nuxt-link :to="'/myBrand/'+item.id" class="warp">
							<div class="img">
								<img :src="imgUrl+item.goods_img" />
							</div>
							<div class="brand-product-info">
								<div class="product-name">{{item.goods_name}}</div>
								<div class="product-desc">{{item.goods_intro}}</div>
								<div class="detail-btn">

									<img src="../../assets/images/ic-ownbrand-enter@2x.png" />

								</div>
							</div>
						</nuxt-link>
					</div>
					
				</div>

				<div class="more-brand">
					<img src="~/assets/images/pic-ownbrand-line@2x.png" />
					<nuxt-link to='brandlist' class="footBtn">查看更多</nuxt-link>
				</div>

			</div>
			<img src="../../assets/images/pic-ownbrand-leaf1@2x.png" class="yezi4" />

			<div class="brand-introduce">
				<div class="left-brand-introduce">
					<div v-swiper:swipers="swiperOption" ref="swipers" class="box">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="(item,index) in brand_info.brand_intro" :key="index">
								<div class="brand-introduction">
									<h1>品牌介绍</h1>
									<p>{{item.intro}}</p>
								</div>
								<div class="brand-introduction">
									<h1>品牌特色</h1>
									<p>{{item.feature}}</p>
								</div>
								<div class="brand-introduction">
									<h1>品牌理念</h1>
									<p>{{item.idea}}</p>
								</div>
							</div>
							
						</div>

						<div class="swiper-pagination"></div>
						<div class="swiper-button-prev">
							<img src="~/assets/images/ic-ownbrand-previous@2x.png" />

						</div>
						<div class="swiper-button-next">
							<img src="~/assets/images/ic-ownbrand-next@2x.png" />
						</div>
						<div class="brand-introduce-number">
							<span>0{{activeIndexs}}</span> / 0{{brand_info.brand_intro.length}}
						</div>
					</div>
				</div>
				<div class="right-brand-instroduct">
					<div v-swiper:swiper="swiperOption1" ref="swiper" class="box right-swper">
						<div class="swiper-wrapper">
							<div class="swiper-slide brand-swipers" v-for="(item,index) in brand_info.picture_video" :key="index">								
								<div v-if='item.type==1' class="box">
									<img :src="imgUrl+item.url"/>
								</div>
								<div v-else class="box">
									<video class="brand-video" :src="imgUrl+item.url" id="video" @click="getVideo"></video>
									<img v-if="isShowVideo" src="~/assets/images/ic-ownbrand-videobutton@2x.png" class="video-play-btn"  @click="getVideo"/>
								</div>
							
							</div>
							
						</div>
						<div class="swiper-button-prev">

						</div>
						<div class="swiper-button-next">

						</div>
					</div>
				</div>
			</div>
			<div class="attract-investment" style="background-image: url(../images/pic-ownbrand-streak@2x.png);">
				<div class="attract-investment-box">
					<div class="attract-investment-left">
						<h1>招商代理</h1>
						<div class="left-info">
							<strong>{{merchants.name}}</strong><br />
							企业热线 :{{merchants.tel}} {{merchants.contact}} <br />
							企业地址 : {{merchants.address}}
						</div>
						<strong class="fanwei">经营范围：{{merchants.range}} </strong>
					</div>
					<div class="right-img">
						<img :src="imgUrl+merchants.business_license" />
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

			let own_brand = await getRequest(`own_brand`,{pageSize:3});
			let own_brand_info = await getRequest(`own_brand/intro`);
			let merchants_proxy = await getRequest(`merchants_proxy`);
			let footer = await getRequest(`footer`);
			
			return {
				ownArr: own_brand.data.data,
				brand_info:own_brand_info.data,
				merchants:merchants_proxy.data,
				footers: footer.data
			};
		},
		data() {
			let self = this
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'brand',
				allNum: 3,
				activeIndexs: 1,
				swiperOption: {
					pagination: {
						el: '.swiper-pagination',
						type: 'progressbar',
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					watchSlidesProgress: true,
					on:{
						transitionEnd:function(){
							self.activeIndexs = this.activeIndex + 1
						}
					}
				},
				swiperOption1: {
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					}
				},
				isShowVideo:true
			};
		},
		created() {

		},
		components: {
			Hearder,
			Footer
		},
		mounted() {
			
		},
		methods: {
			gotoDetail() {
				console.log(this.$refs.swipers.swiper)
				//this.activeIndexs = this.$refs.swipers.swiper.realIndex
				console.log(this.$refs.swipers.swiper.realIndex)
			},
			getVideo() {
				let myVideo = document.querySelector(".brand-video");							
				if(this.isShowVideo){
					myVideo.play()
					this.isShowVideo = false;
				}else{
					myVideo.pause()
					this.isShowVideo = true;
				}
				
				let that = this
				myVideo.addEventListener('play', function() {
					that.isShowVideo = false;
				});
				myVideo.addEventListener('pause', function() {
					that.isShowVideo = true;
				})
				
			},
		}
	};
</script>

<style>

</style>
