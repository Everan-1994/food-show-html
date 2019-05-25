<template>
	<!--地图容器-->
	<div id="XSDFXPage" class="XSDFXPage"></div>

</template>
<script>
	export default {
		data() {
			return {
				defaultPl1: [],
				markerArr1: []
			}
		},
		props: {
			mapHeight: {
				type: Number,
				default: 550
			},

			defaultPl: Array,
			markerArr: Array
		},
		mounted() {
			this.defaultPl1 = this.defaultPl
			this.markerArr1 = this.markerArr
			this.getMap(this.defaultPl1,this.markerArr1)

		},
		methods: {
			getMap(defaultPl1,markerArr1) {
				//创建Map实例
				var map = new BMap.Map("XSDFXPage");
				// 初始化地图,设置中心点坐标
				var point = new BMap.Point(defaultPl1[0], defaultPl1[1]); // 创建点坐标
				map.centerAndZoom(point, 18);
				//添加鼠标滚动缩放
				map.enableScrollWheelZoom();

				//添加缩略图控件
				map.addControl(new BMap.OverviewMapControl({
					isOpen: false,
					anchor: BMAP_ANCHOR_BOTTOM_RIGHT
				}));
				//添加缩放平移控件
				map.addControl(new BMap.NavigationControl());
				//添加比例尺控件
				map.addControl(new BMap.ScaleControl());
				//添加地图类型控件
				//map.addControl(new BMap.MapTypeControl());

				var point = new Array(); //存放标注点经纬信息的数组
				var marker = new Array(); //存放标注点对象的数组
				var info = new Array(); //存放提示信息窗口对象的数组
				if (markerArr1.length > 1) {
					for (var i = 0; i < markerArr1.length; i++) {
						var p0 = markerArr1[i].point.split(",")[0]; //
						var p1 = markerArr1[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
						point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
						marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记
						map.addOverlay(marker[i]);
						marker[i].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
						var label = new window.BMap.Label(this.markerArr1[i].title, {
							offset: new window.BMap.Size(20, -10)
						});
						marker[i].setLabel(label);
						info[i] = new window.BMap.InfoWindow("<p style=’font-size:12px;lineheight:1.8em;’>" + markerArr1[i].title +
							"</br>" + markerArr1[i].address + "</br> " + markerArr1[i].tel + "</br></p>"); // 创建信息窗口对象

						marker[i].addEventListener("mouseover", function() {
							this.openInfoWindow(info[i]);
						});
					}

				} else {
					var p0 = markerArr1[0].point.split(",")[0]; //
					var p1 = markerArr1[0].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
					point[0] = new window.BMap.Point(p0, p1); //循环生成新的地图点
					marker[0] = new window.BMap.Marker(point[0]); //按照地图点坐标生成标记
					map.addOverlay(marker[0]);
					//					marker[0].setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
					var label = new window.BMap.Label(markerArr1[0].title, {
						offset: new window.BMap.Size(20, -10)
					});
					//					marker[0].setLabel(label);//名称
					info[0] = new window.BMap.InfoWindow("<p style=’font-size:12px;lineheight:1.8em;’>" + markerArr1[0].title +
						"</br>" + markerArr1[0].address + "</br> " + markerArr1[0].tel + "</br></p>"); // 创建信息窗口对象
					//					marker[0].addEventListener("mouseover", function() {
					marker[0].openInfoWindow(info[0]);
					//					});
					marker[0].addEventListener("click", function() {
						marker[0].openInfoWindow(info[0]);
					});
				}

			}
		},
		watch:{
			defaultPl:function(val,old){
				if(val){
					this.defaultPl = val
				}
			},
			markerArr:function(val,old){
				if(val){
					this.markerArr = val
				}
			}
		}
	}
</script>
<style scoped>
	.XSDFXPage {
		width: 100%;
		height: 550px;
		overflow: hidden;
		margin: 0px auto;
		font-family: "微软雅黑";
	}
</style>
