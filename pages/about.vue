<template>
	<div>
		<Hearder :navActive='navActive' />
		<div class="brand-box-warp about-box">
			<div class="brand-box">
				<h1 class="brand-title">关于我们</h1>
				<p class="brand-desc">About us</p>

				<div class="about-content">
					<img src="~/assets/images/pic_about_leaf@2x.png" class="about-yezi" />
					<div class="about-info-box">
						<div :class="index == (i+1) ? 'about-info-list current' : 'about-info-list'" v-for="(item,i) in aboutArr.about_us" :key="i">
							<h1>{{item.title}}</h1>
							<div v-html="item.content"></div>
						</div>
						

						<div  :class="index==5 ?'about-info-list current':'about-info-list'">
							<h1 class="common-problem">常见问题</h1>
							<div class="problem-box" v-for="(item,index) in aboutArr.common_problem.data" :key="index" @click="getProblem(index)" :class="problemIndex==index ? 'problem-box open' : 'problem-box' ">
								<div class="problem-name">
									Q:{{item.question}}
									<div class="problem-btn"></div>
								</div>
								<div class="problem-answer">
									A:{{item.answer}}
								</div>
							</div>
							
							<div class="page-box">
								<div class="prev-box num-list" @click="getPrev"></div>
								<div :class="page==count ? 'num-list active' : 'num-list' " v-for="count in aboutArr.common_problem.last_page" @click="getPage(count)">{{count}}</div>
								<div class="next-box num-list" @click="getNext"></div>
							</div>
						</div>
	 
					</div>
					<div class="about-title-box">
						<div :class="index==1 ? 'about-title-list active' : 'about-title-list'" @click="change(1)">企业介绍</div>
						<div :class="index==2 ? 'about-title-list active' : 'about-title-list'" @click="change(2)">董事长致辞</div>
						<div :class="index==3 ? 'about-title-list active' : 'about-title-list'" @click="change(3)">企业文化</div>
						<div :class="index==4 ? 'about-title-list active' : 'about-title-list'" @click="change(4)">企业理念</div>
						<div :class="index==5 ? 'about-title-list active' : 'about-title-list'" @click="change(5)">常见问题</div>
					</div>
					<img src="../assets/images/pic_about_bg1@2x.png" class="about-posi2" />
				</div>

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
				lastpage:about.data.common_problem.last_page,
				footers: footer.data
			};

		},
		data() {
			return {
				navActive:'about',
				index:1,
				problemIndex:0,
				pageSize:6,
				page:1,
				is_end:false,
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
			 change:function(x){
                this.index = x
                
            },
			getProblem(index){
				this.problemIndex = index
			},
			getPage(i){
				let data = {
					page:i,
					pageSize:this.pageSize
				}
				
				getData(data).then(res=>{
					this.aboutArr = res
					this.page = i
					
					
					
				})
			},
			getPrev(){
				if(this.page>1){
					let data = {
						page:this.page-1,
						pageSize:this.pageSize
					}
					
					getData(data).then(res=>{
						this.aboutArr = res
						if(this.page == 2){
							this.page = 1
							this.is_start = false
							this.is_end = false
							return false
						}else{
							this.page = this.page - 1
						}
						
					})
				}
				
			},
			getNext(){
				if(this.page<this.lastpage){
					const data = {
						page:this.page +1,
						pageSize:this.pageSize
					}
					
					getData(data).then(res=>{
						this.aboutArr = res
						if(res.total<(this.page+1)*this.pageSize){
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
