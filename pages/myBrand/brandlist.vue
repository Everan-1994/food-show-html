<template>
	<div>
		<Hearder :navActive='navActive' />
		<div class="brand-box-warp">
			<div class="brand-box">
				<h1 class="brand-title">产品列表</h1>
				<p class="brand-desc">Extruded Pellet</p>

				<div class="crumbs">
					<nuxt-link to='/myBrand/brand'>自有品牌</nuxt-link>
					<nuxt-link to='/myBrand/brandlist'>产品列表</nuxt-link>
				</div>
				<div class="product-list-box">
					<div class="page-btn">
						<button :class="is_start ? 'prev-btn prev_start' : 'prev-btn' " :disabled="!is_start"  @click="getPrev"></button>
						<button :class="is_end ? 'next-btn next_end' : 'next-btn'" :disabled="is_end" @click="getNext"></button>
					</div>
					<div class="brand-list-group brand-product-group">
						<div class="brand-product-list" v-for="item in ownArr" :key="item.id">
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
				</div>

				<div class="bottom-bg">
					<img src="../../assets/images/pic_branklist_background@2x.png" />
				</div>
			</div>
			<div class="radio1"></div>
			<div class="radio2"></div>
			<div class="radio3"></div>
			<img src="../../assets/images/pic-home-leaf3.png" class="yezi5" />

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

	const getData = (params) => {
		return new Promise(resolve => {
			getRequest(`own_brand`, params).then(res => {
				resolve(res.data)
			})
		})
	}
	export default {
		async asyncData({
			params,
			error
		}) {

			let own_brands = await getRequest(`own_brand`, {
				pageSize: 6
			});
			let footer = await getRequest(`footer`);
			
			return {
				ownArr: own_brands.data.data,
				last_page:own_brands.data.last_page,
				is_end:own_brands.data.last_page>1 ? false : true,
				footers: footer.data
			};
		},
		data() {
			return {
				imgUrl: process.env.imgUrl,
				navActive: 'brand',
				pageSize:6,
				page:1,
				is_start:false
			};
		},
		created() {

		},
		components: {
			Hearder,
			Footer
		},
		methods: {
			getPrev(){
				let data = {
					page:this.page-1,
					pageSize:this.pageSize
				}
				
				getData(data).then(res=>{
					this.ownArr = res.data
					if(this.page == 2){
						this.page = 1
						this.is_start = false
						this.is_end = false
						return false
					}else{
						this.page = this.page - 1
					}
					
				})
			},
			getNext(){
				const data = {
					page:this.page +1,
					pageSize:this.pageSize
				}
				if(this.page<this.last_page){
					getData(data).then(res=>{
						this.ownArr = res.data
						if(this.page>=this.last_page){
							this.page=this.page+1
							this.is_end = true
						}else{
							this.page = this.page+1
						}
						this.is_start = true
						
					})
				}
				
				
			}
		}
	};
</script>

<style>

</style>
