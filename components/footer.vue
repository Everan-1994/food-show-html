<template>
	<footer class="footer">
		<img src="/images/pic-foot-pic.png" class="footer-bg" />
		<div class="footer-box">
			<div class="container">
				<div class="footer-link">
					<ul>
						<li>
							<a href='/'>首页</a>
						</li>
						<li>
							<a href='/brand-cooperation'>品牌合作</a>
						</li>
						<li>
							<a href='/businessSuperCooperation/default'>商超合作</a>
						</li>
						<li>
							<a href='/myBrand/brand'>Lots of fun</a>
						</li>
						<li>
							<a href='/news/0'>新闻中心</a>
						</li>
						<li>
							<a href='/aboutUs'>关于我们</a>
						</li>
					</ul>
				</div>
				<div class="footer-info">
					<img :src="imgUrl+data.logo" />
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
