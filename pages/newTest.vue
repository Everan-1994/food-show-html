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
		
	</div>
</template>

<script>
	import Hearder from '~/components/header.vue';
	import Footer from '~/components/footer.vue';
	 import Swiper from "swiper";
	import {
		getRequest
	} from '~/plugins/vue-axios';

	
	export default {
		
		data() {
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'newTest',
				index: 1,
				problemIndex: 0,
				
			};
		},
		components: {
			Hearder,
			Footer
		},
		methods: {
			
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
