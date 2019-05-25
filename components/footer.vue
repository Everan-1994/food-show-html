<template>
	<footer class="footer">
		<img src="/images/pic-foot-pic.png" class="footer-bg" />
		<div class="footer-box">
			<div class="container">
				<div class="footer-link">
					<ul>
						<li>
							<nuxt-link to='/'>首页</nuxt-link>
						</li>
						<li>
							<nuxt-link to='#'>品牌合作</nuxt-link>
						</li>
						<li>
							<nuxt-link to='#'>超商合作</nuxt-link>
						</li>
						<li>
							<nuxt-link to='#'>自有品牌</nuxt-link>
						</li>
						<li>
							<nuxt-link to='#'>新闻中心</nuxt-link>
						</li>
						<li>
							<nuxt-link to='#'>关于我们</nuxt-link>
						</li>
					</ul>
				</div>
				<div class="footer-info">
					<img src="../assets/images/pic_foot_logo.png" />
					<p class="name">{{data.name}}</p>
					<p class="contact">
						企业热线 : {{data.tel}}
						<br />
						企业地址 : {{data.address}}
					</p>
				</div>
				<div class="qwcode">
					<div class="list">
						<img :src="imgUrl+data.wx_qrcode"/>
						<p>微信公众号二维码</p>
					</div>
					<div class="list">
						<img :src="imgUrl+data.kf_qrcode"/>
						<p>客服微信二维码</p>
					</div>
				</div>
				
			</div>
			<div class="copy">&#169 DANKAL . All rights reserved . 粤ICP备16007023号-1</div>
		</div>
		
	</footer>
</template>

<script>
	import {
		getRequest
	} from '~/plugins/vue-axios';
export default {
	name: 'douFooter',
	data() {
		return {
			imgUrl: process.env.imgUrl,
		};
	},
	props: {
			data:Object
		},
		created() {
			
		},
		mounted(){
			
		},
		methods:{
			
			
		}
};
</script>

<style lang="less" scoped="scoped">

</style>
