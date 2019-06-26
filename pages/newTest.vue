<template>
	<div>
		<Hearder :navActive='navActive' />
		<div class="brand-box-warp about-box">
			<div class="brand-box">
				<h1 class="brand-title">关于我们</h1>
				<p class="brand-desc">About us</p>

				

			</div>

			<img src="../assets/images/pic_about_pic@2x.png" class="about-posi1" />
			<div class="san-arrow1"></div>
			<div class="san-arrow2"></div>

		</div>
		<Footer :data="footers" />
	</div>
</template>

<script>
	import Hearder from '~/components/header.vue';
	import Footer from '~/components/footer.vue';
	 import Swiper from "swiper";
	import {
		getRequest
	} from '~/plugins/vue-axios';

	const getData = (params) => {
		return new Promise(resolve => {
			getRequest(`us_problem`, params).then(res => {
				resolve(res.data)
			})
		})
	}
	export default {
		async asyncData({
			params,
			error
		}) {
			let about = await getRequest(`us_problem?page=1&pageSize=6`);
			let footer = await getRequest(`footer`);
			return {
				aboutArr: about.data,
				lastpage: about.data.common_problem.last_page,
				footers: footer.data
			};

		},
		data() {
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'newTest',
				index: 1,
				problemIndex: 0,
				pageSize: 6,
				page: 1,
				is_end: false,
				is_start: false,
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
			};
		},
		components: {
			Hearder,
			Footer
		},
		methods: {
			change: function(x) {
				this.index = x
				let swiper = {
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
				}
				this.$nextTick(function() {
					new Swiper('.swiper-container', {
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
					});
				});

			},
			getProblem(index) {
				this.problemIndex = index
			},
			getPage(i) {
				let data = {
					page: i,
					pageSize: this.pageSize
				}

				getData(data).then(res => {
					this.aboutArr = res
					this.page = i



				})
			},
			getPrev() {
				if (this.page > 1) {
					let data = {
						page: this.page - 1,
						pageSize: this.pageSize
					}

					getData(data).then(res => {
						this.aboutArr = res
						if (this.page == 2) {
							this.page = 1
							this.is_start = false
							this.is_end = false
							return false
						} else {
							this.page = this.page - 1
						}

					})
				}

			},
			getNext() {
				if (this.page < this.lastpage) {
					const data = {
						page: this.page + 1,
						pageSize: this.pageSize
					}

					getData(data).then(res => {
						this.aboutArr = res
						if (res.total < (this.page + 1) * this.pageSize) {
							this.page = this.page + 1
							this.is_end = true
						} else {
							this.page = this.page + 1
						}
						this.is_start = true

					})
				}


			}
		}
	};
</script>

<style>
	.bannerss {
		width: 100%;
	}

	.bannerss img {
		width: 100%;
		height: auto;
	}
</style>
