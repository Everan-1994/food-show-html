<template>
	<div>
		
		<div class="brand-box-warp">
			<Hearder :navActive='navActive' />
			<div class="brand-box">
				<h1 class="brand-title">新闻中心</h1>
				<p class="brand-desc">Brand cooperation</p>

				<div class="crumbs">
					<nuxt-link :to='child'>新闻中心</nuxt-link>
					<nuxt-link :to='id'>详情</nuxt-link>
				</div>

			</div>
			<div class="container">
				<h1 class="news-detail-title">{{newArr.title}}</h1>
				<div class="time">
					{{newArr.created_at}} /
					<span>{{newArr.from}}</span>
				</div>
				<main v-html="newArr.content"></main>
				<!-- <div class="imgs-box" v-if="newArr.image != null">
					<img :src="imgUrl+newArr.image" />
				</div> -->
				<div class="new-video" v-if="newArr.video != null">
					<video class="video-box" :src="imgUrl+newArr.video" id="video" @click="getVideo"></video>
					<img v-if="isShowVideo" src="~/assets/images/ic-ownbrand-videobutton@2x.png" class="video-play-btn" @click="getVideo" />
				</div>
				<div class="imgs-box" v-if="newArr.detail_image && newArr.detail_image != null">
					<img :src="imgUrl+newArr.detail_image" />
				</div>
				<div class="end">END</div>
			</div>
			<Footer :data="footers" />
		</div>

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

			let news = await getRequest(`news_list/${params.id}`);
			let footer = await getRequest(`footer`);
			return {
				newArr: news.data,
				footers: footer.data
			};
		},
		data() {
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'news',
				child: '',
				id: '',
				isShowVideo: true
			};
		},
		created() {
			let child = this.$route.params.child
			let id = this.$route.params.id
			this.child = '/news/' + child
			this.id = '/news/' + child + '/' + id
		},
		components: {
			Hearder,
			Footer
		},
		methods: {
			getVideo() {
				let myVideo = document.querySelector(".video-box");
				if (this.isShowVideo) {
					myVideo.play()
					this.isShowVideo = false;
				} else {
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
	main img {
		max-width: 100%;
	}

	.imgs-box {
		text-align: center;
		margin-bottom: 30px;
	}

	.imgs-box img {
		max-width: 100%;
	}
</style>
