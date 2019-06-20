<template>
	<div class="contact-bg">
		<Hearder :navActive='navActive' />
		<div>
			<div class="brand-box-warp">
				<div class="brand-box">
					<h1 class="brand-title">联系我们</h1>
					<p class="brand-desc">contact us</p>


				</div>
				<div class="address-box">
					<div class="address-head">
						公司地址
						<!-- <div class="right-search">
							<input type="text" placeholder="搜索" v-model="value" />
							<img src="~/assets/images/ic_news_search1@2x.png" @click="serach" />
						</div> -->
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
					<button class="contact-information-btn" @click="getShow">合作提交</button>

				</div>

			</div>
		</div>
		<Footer :data="footers" />
		<div>
			
			<div class="food-mask" v-if="elastic_frame">
				<div class="food-mask-box">
					<div class="close" @click="getright"></div>
					<h1 class="mask-title">联络我们</h1>
					<div class="form-input">
						<div class="input-list">
							<label>姓名：</label>
							<input placeholder="您的姓名（必填）" v-model="name" />
						</div>
						<div class="input-list">
							<label>邮箱：</label>
							<input placeholder="您的邮箱" v-model="mailbox" />
						</div>
						<div class="input-list">
							<label>电话：</label>
							<input placeholder="您的电话号码" v-model="tel" />
						</div>
					</div>
					<div class="input-list2 input-list">
						<label>地址：</label>
						<input placeholder="您的详细地址" v-model="address" />
					</div>
					<div class="input-list2 input-list">
						<label>标题：</label>
						<input placeholder="标题" v-model="title" />
					</div>
					<div class="input-list2 input-list">
						<label>留言：</label>
						<textarea placeholder="您的留言（必填）" v-model="message"></textarea>
					</div>
			
					<div class="uplod-img">
						<div class="uplod-img-list" v-if="images.length >0" v-for="(item,index) in images">
							<img :src="imgUrl + item" class="img" />
							<img src="../assets/images/pic_contact_delet.png" class="delete-img" @click='delImage(index)' />
						</div>
						<div class="add">
							<div @click="fileClick">
								<img src="~/assets/images/pic_contact_add.png" />
								<input type="file" id="upload_file" ref="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" class="upload-input"
								 @change="onFileChange" />
							</div>
							<p>（{{images.length}}/5)</p>
						</div>
			
					</div>
					<div class="toast">{{toast_text}}</div>
					<button class="contact-submit" @click="getSubmit">提交</button>
				</div>
			</div>
			
		</div>
		
		<div class="food-mask" v-show="success">
			<div class="success-box">
				<img src="../assets/images/pic_contact_success.png" />
				<p>恭喜你！提交成功！</p>
			</div>
		</div>
		
		<div class="loading" v-if="loading">
			<img src="~/assets/images/icon-loading.gif" />
		</div>

		<img src="/images/pic_contact_pic.png" class="contact-information-bg" />
	</div>
</template>

<script>
	import DouMap from "~/components/map.vue";
	import Hearder from '~/components/header.vue';
	import Footer from '~/components/footer.vue';
	import {
		getRequest
	} from '~/plugins/vue-axios';

	import {
		postRequest
	} from '~/plugins/vue-axios';
	import {
		uploadFileRequest
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
				"point": contact_us.data[0].longitude + ',' + contact_us.data[0].latitude,
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
				imgUrl: process.env.imgUrl,
				navActive: 'contact',
				value: '',
				no_data: false,
				name: '',
				mailbox: '',
				tel: '',
				address: '',
				title: '',
				message: '',
				images: [],
				toast_text: '',
				elastic_frame: false,
				success:false,
				loading:false

			};
		},
		created() {

		},
		components: {
			Hearder,
			DouMap,
			Footer
		},
		mounted() {


		},
		
		methods: {
			getright(){
				
				this.elastic_frame = false
				console.log(this.elastic_frame)
			},
			getClose(e) {
				const cDom = document.querySelector(".food-mask-box");
				const tDom = e.target;
				if (cDom == tDom || cDom.contains(tDom)) {

				} else {
					this.elastic_frame = false;
				}
			},
			getShow() {
				this.elastic_frame = true
			},
			handleClose(e) {
				this.elastic_frame = false;
			},

			getMap(e) {
				let poit = []
				poit[0] = e.longitude
				poit[1] = e.latitude
				let address = [{
					"title": "名称：" + e.name,
					"point": e.longitude + ',' + e.latitude,
					"address": "地址：" + e.address,
					"tel": "电话：" + e.tel
				}]

				this.defaultCoordinates = poit
				this.allClinicInformation = address
				this.$refs.my_map.getMap(poit, address)
			},
			serach() {
				var that = this
				getRequest(`contact_us`, {
					name: this.value
				}).then(res => {
					if (res.data.length > 0) {						
						let data = res.data
						let poit = []
						poit[0] = data[0].longitude
						poit[1] = data[0].latitude
						let address = [{
							"title": "名称：" + data[0].name,
							"point": data[0].longitude + ',' + data[0].latitude,
							"address": "地址：" + data[0].address,
							"tel": "电话：" + data[0].tel
						}]
						that.contactArr = data
						that.defaultCoordinates = poit
						that.allClinicInformation = address
						that.$refs.my_map.getMap(poit, address)

					} else {
						that.no_data = true
						that.contactArr = []
					}

				})

			},
			fileClick() {
				document.getElementById('upload_file').click()
				this.loading = true
			},
			delImage: function(index) {
				this.images.shift(index);
			},
			onFileChange(e) {
				var files = e.target.files || e.dataTransfer.files;
				if (!files.length) return;
				this.createImage(files);
			},
			createImage(file) {
				if (typeof FileReader === 'undefined') {
					alert('您的浏览器不支持图片上传，请升级您的浏览器');
					return false;
				}
				var image = new Image();
				var vm = this;
				var leng = vm.images.length;
				if (leng >= 5) {
					this.toast_text = '最多只能上传5张图片'
				} else {
					
					let formData = new FormData()
					formData.append('images_url[]',file[0])
					uploadFileRequest('uploads', formData).then(res => {
						let data = res.data
						vm.images.push(data) 
						this.loading = false
					})
					// for (let i = 0; i < leng; i++) {
					// 	var reader = new FileReader();
					// 	reader.readAsDataURL(file[i]);
					// 	reader.onload = function(e) {
					// 		vm.images.push(e.target.result);
					// 	};
					// }
				}
			},
			getSubmit() {
				const title = this.title
				const user_tel = this.tel
				const user_name = this.name
				const user_email = this.mailbox
				const user_address = this.address
				const user_message = this.message
				const images_url = this.images
				const email_reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
				const tel_reg = /^1(3|4|5|7|8)\d{9}$/

				if (user_name == "") {
					this.toast_text = "请输入姓名"
					return false
				} else if (user_email == "") {
					this.toast_text = "请输入邮箱"
					return false
				} else if (!(email_reg.test(user_email))) {
					this.toast_text = "请输入正确的邮箱"
					return false
				} else if (user_tel == "") {
					this.toast_text = "请输入手机号"
					return false
				} else if (!(tel_reg.test(user_tel))) {
					this.toast_text = "请输入正确的手机号"
					return false
				} else if (user_address  == "") {
					this.toast_text = "请输入地址"
					return false
				} else if (title == "") {
					this.toast_text = "请输入标题"
					return false
				} else if (user_message == "") {
					this.toast_text = "请输入留言"
					return false
				} 
				// else if (images_url.length==0) {
				// 	this.toast_text = "请上传图片"
				// 	return false
				// } 
				else {
					this.toast_text = " "
				}
				const data = {
					title: title,
					user_tel: user_tel,
					user_name: user_name,
					user_email: user_email,
					user_address: user_address,
					user_message: user_message,
					images_url: images_url,
				}
				postRequest('submit_cooperation', data).then(res => {
					if(res.status>200){
						this.elastic_frame = false
						this.success = true
						let that = this
						setTimeout(function(){
							that.success = false
						},1500)
					}
					
				})
			}

		}
	};
</script>

<style>

</style>
