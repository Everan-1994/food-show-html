<template>
	<div>

		<div class="brand-box-warp" style="overflow: unset;">
			<Hearder :navActive='navActive' />
			<div class="brand-box">
				<h1 class="brand-title">新闻中心</h1>
				<p class="brand-desc">Brand cooperation</p>
			</div>

			<div class="w1200 new-box">
				<div class="serch-box" v-if="ifshow">
					<input type="text" placeholder="请输入关键字" v-model="keyWords" />
					<img src="../../assets/images/ic_news_search1@2x.png" class="serch-icon" @click="getSearch" />
				</div>
				<div class="new-nav">
					<div class="new-serch" @click="ifshow = true">
						<img src="../../assets/images/ic_news_search2@2x.png" />
					</div>
					<ul>
						<li :class="new_id == 0 ? 'active' : ''">
							<nuxt-link to='0'>企业新闻</nuxt-link>
						</li>
						<li :class="new_id == 1 ? 'active' : ''">
							<nuxt-link to='1'>行业新闻</nuxt-link>
						</li>
						<li :class="new_id == 2 ? 'active' : ''">
							<nuxt-link to='2'>展会新闻</nuxt-link>
						</li>
					</ul>
				</div>
				<div class="new-content">
					<div v-for="(item,index) in newArr" :key="index" :class="index%2 != 0 ? 'new-list new-list-even' :'new-list' ">
						<div class="flex" v-if="index%2 != 1">
							<nuxt-link :to="'/news/'+new_id+'/'+item.id">
								<div class="new-info">
									<h1>{{item.title}}</h1>
									<p class="new-desc">{{item.intro}}</p>
									<p class="new-time">
										{{item.created_at}} /
										<span>{{item.from}} -></span>
									</p>
								</div>
							</nuxt-link>
							<div class="new-img" v-if="item.resource_type==1">
								<nuxt-link :to="'/news/'+new_id+'/'+item.id">
								<img :src="imgUrl+item.image" />
								</nuxt-link>
							</div>
							<div class="new-img" v-else>
								<video class="video-box" :src="imgUrl+item.video" :id="'video'+index" @click="getVideo(index)"></video>
								<img :id="'show'+index" src="../../assets/images/ic-ownbrand-videobutton@2x.png" class="video-play-btn" @click="getVideo(index)" />
							</div>
						</div>

						<div class="flex" v-if="index%2 != 0">
							
							<div class="new-img" v-if="item.resource_type==1">
								<nuxt-link :to="'/news/'+new_id+'/'+item.id">
								<img :src="imgUrl+item.image" />
								</nuxt-link>
							</div>
							
							<div class="new-img" v-else>			
								<video class="video-box" :src="imgUrl+item.video" :id="'video'+index" @click="getVideo(index)"></video>
								<img :id="'show'+index" src="../../assets/images/ic-ownbrand-videobutton@2x.png" class="video-play-btn" @click="getVideo(index)" />
							</div>
							<nuxt-link :to="'/news/'+new_id+'/'+item.id">
								<div class="new-info">
									<h1>{{item.title}}</h1>
									<p class="new-desc">{{item.intro}}</p>
									<p class="new-time">
										{{item.created_at}} /
										<span>{{item.from}} -></span>
									</p>
								</div>
							</nuxt-link>
						</div>








					</div>
					<!-- <div v-if="newArr.length==0" style="text-align: center;margin-top: 30px;">没有新闻了</div> -->

				</div>



			</div>
			<div class="loading" v-if="loading">
				<img src="~/assets/images/icon-loading.gif" />
			</div>
			<p v-if="noData" class="noData">没有更多内容了~</p>





			



			<img src="../../assets/images/pic_news_leaf2@2x.png" class="gray-yezi1" />
			<img src="../../assets/images/pic_news_leaf3@2x.png" class="gray-yezi2" />
			<img src="../../assets/images/pic_news_leaf4@2x.png" class="gray-yezi3" />
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
	const getData = (id, size) => {
		return new Promise(resolve => {
			getRequest(`news_list?type=${id}&page=${size}&pageSize=5`).then(res => {
				resolve(res.data)
			})
		})
	}
	export default {
		async asyncData({
			params,
			error
		}) {
			let news = await getRequest(`news_list?type=${params.id}&page=1&pageSize=5`);
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
				ifshow: false,
				new_id: 0,
				num: 2,
				loading: false,
				noData: false,
				keyWords: '',
				isShowVideo: true
			};
		},
		created() {
			this.new_id = this.$route.params.id
		},
		mounted() {
			window.addEventListener('scroll', this.getNewScroll)

		},
		components: {
			Hearder,
			Footer
		},
		methods: {
			getVideo(e) {
				let myVideo = document.getElementById('video'+e);
				let btn = document.getElementById('show'+e);
				if (this.isShowVideo) {
					myVideo.play()
					this.isShowVideo = false;
					btn.style.display = 'none'
				} else {
					myVideo.pause()
					this.isShowVideo = true;
					btn.style.display = 'inline-block'
				}

				let that = this
				myVideo.addEventListener('play', function() {
					that.isShowVideo = false;
					btn.style.display = 'none'
				});
				myVideo.addEventListener('pause', function() {
					that.isShowVideo = true;
					btn.style.display = 'inline-block'
				})

			},
			getSearch() {
				let id = this.$route.params.id
				getRequest(`news_list?keyword=${this.keyWords}&type=${id}`).then(res => {
					let data = res.data

					this.newArr = data
					window.removeEventListener('scroll', this.getNewScroll)
				})
			},
			getNewScroll() {
				let id = this.$route.params.id
				let that = this
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				if (scrollTop + window.innerHeight >= document.body.offsetHeight) {
					let par = that.num++
					this.loading = true
					let arr = []

					this.newArr.forEach(e => {
						arr.push(e)
					})

					getData(id, par).then(res => {
						let data = res


						data.forEach((e, i) => {
							arr.push(e)
							this.loading = false
						})
						this.newArr = arr
						if (data.length < 5) {
							this.noData = true
							this.loading = false
							window.removeEventListener('scroll', this.getNewScroll)
						}
					})
				}
			}
		},
		destroyed() {
			window.removeEventListener('scroll', this.getNewScroll)
		}
	};
</script>

<style>

</style>
