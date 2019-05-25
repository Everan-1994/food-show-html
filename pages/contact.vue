<template>
	<div>
		<Hearder :navActive='navActive' />
		<div class="contact-bg">
			<div class="brand-box-warp">
				<div class="brand-box">
					<h1 class="brand-title">联系我们</h1>
					<p class="brand-desc">contact us</p>


				</div>
				<div class="address-box">
					<div class="address-head">
						门店地址
						<div class="right-search">
							<input type="text" placeholder="搜索" v-model="value"/>
							<img src="~/assets/images/ic_news_search1@2x.png" @click="serach"/>
						</div>
					</div>
					<div class="address-info">
						<div class="address-left">
							<div v-if="no_data" style="color: #3B3B3B;font-size: 16px;">没有查找到符合的结果 “{{value}}”。 </div>
							<div class="address-left-list" v-for="(item,index) in contactArr" :key="index" @click="getMap(item)">
								<h2>{{item.name}}</h2>
								<p>
									{{item.address}}

								</p>
								<p>
									{{item.tel}} {{item.contact}}
								</p>
							</div>
						</div>
						<div class="address-right">
							<douMap ref="my_map" :markerArr='allClinicInformation' :defaultPl='defaultCoordinates' />
						</div>
					</div>
				</div>
				<div class="contact-information">
					<h3 class="titles">
						如果你有兴趣可与我们取得联系或写下你的需求 <br />欢迎合作！
					</h3>
					<button class="contact-information-btn">合作提交</button>
					<img src="/images/pic_contact_pic.png" class="contact-information-bg" />
				</div>

			</div>
		</div>
		<Footer :data="footers" />
	</div>
</template>

<script>
	import DouMap from "~/components/map.vue";
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

			let contact_us = await getRequest(`contact_us`);
			let poit = []
			poit[0] = contact_us.data[0].longitude
			poit[1] = contact_us.data[0].latitude
			let address = [{
				"title": "名称：" + contact_us.data[0].name,
				"point":contact_us.data[0].longitude +','+ contact_us.data[0].latitude,
				"address": "地址：" + contact_us.data[0].address,
				"tel": "电话：" + contact_us.data[0].tel
			}]
			
			let footer = await getRequest(`footer`);
			
			return {
				contactArr: contact_us.data,
				defaultCoordinates: poit,
				allClinicInformation: address,
				footers: footer.data
			};

		},
		data() {
			return {
				navActive: 'contact',
				value: '',
				no_data:false
			};
		},
		created() {

		},
		components: {
			Hearder,
			DouMap,
			Footer
		},
		methods: {
			getMap(e) {
				
				let poit = []
				poit[0] = e.longitude
				poit[1] = e.latitude
				let address = [{
					"title": "名称：" + e.name,
					"point":e.longitude +','+ e.latitude,
					"address": "地址：" + e.address,
					"tel": "电话：" + e.tel
				}]
				
				this.defaultCoordinates = poit
				this.allClinicInformation = address
				this.$refs.my_map.getMap(poit,address)
			},
			serach() {
				console.log(this.value)
				getRequest(`contact_us`,{name:this.value}).then(res=>{
					if(res.length>0){
						let data = res.data
						let poit = []
						poit[0] = data[0].longitude
						poit[1] = data[0].latitude
						let address = [{
							"title": "名称：" + data[0].name,
							"point":data[0].longitude +','+ data[0].latitude,
							"address": "地址：" + data[0].address,
							"tel": "电话：" + data[0].tel
						}]
						this.contactArr = data
						this.defaultCoordinates = poit
						this.allClinicInformation = address
						this.$refs.my_map.getMap(poit,address)
						
					}else{
						this.no_data = true
						this.contactArr = []
					}
					
					
					
				})
				
			}
		}
	};
</script>

<style>

</style>
