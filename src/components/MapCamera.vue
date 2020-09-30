<!--
data:{
	center:'',   // 地图中心点
	zoom:0,			// 缩放倍数
	camera_list:[], // 摄像头分布数据 [{name:''   //摄像头名称  ,psi:''  // 经纬度}]
	position_data:{}  // 当前标记信息组  {name:'',psi:''  同上},
	timeDate:new Data()  // 当前时间
},
-->
<template>
	<div id="map_camer">
		<baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler"   v-if="viewShow" :map-click="false" :double-click-zoom="false" :pinch-to-zoom="false" :dragging="true">
			<div  v-if="positionList">
				<div  v-for="(item,index)  in (data.camera_list ? data.camera_list : [])" :key="index">
					<bm-marker @click="is_click(item)" :position="crdFormation(item.psi)" animation="BMAP_ANIMATION_DROP" :icon="{url:(item.type?icon.url:icon.car_plate_url),size:{width:icon.size[0],height:icon.size[1]}}"></bm-marker>
				</div>
			</div>
			<bm-marker @click="this_psi_click(data.position_data)" :position="this_psi ? crdFormation(this_psi): ''"  animation="BMAP_ANIMATION_DROP" v-if="psiShow"></bm-marker>

			<bm-info-window :position="crdFormation(tsCamera_data.camera_psi)" :title="windowTitle" :show="windowShow" @close="infoWindowClose" @open="infoWindowOpen" :autoPan="true">
				<div class="cont">
					<div class="btn_list">
						<!-- <button v-if="(this.camera_psi == this.this_psi)">回看</button> -->
						<button @click="open_video()">查看实时画面</button>
					</div>
				</div>
			</bm-info-window>
		</baidu-map>
	</div>
</template>

<script>
export default {
	name: "map_camer",
	props:['data'],
	data(){
		return{
			map:null,
			BMap:null,
			windowTitle:'',
			windowShow:false,
			viewShow:true,
			psiShow:false,
			positionList:true,
			this_psi:'',
			tsCamera_data:{
				camera_psi:'',
				data:{}
			},
			camera_psi:'',
			center: {lng: 121.481977, lat: 31.235682},
			zoom: 11,
			icon:{
				url:require('../assets/people.png'),
				car_plate_url:require('../assets/car.png'),
				size:[40,40],
			},
			cameraList:[],
			timerOut:null,
			clientWidth:0,
			clientHeight:0

		}
	},
	watch:{
		"data.timeDate"() {
			clearTimeout(this.timerOut)
			this.timerOut = setTimeout(()=>{
				if (this.this_psi == this.data.position_data.psi) {
					this.this_psi = ''
				} else {
					this.this_psi = this.data.position_data.psi
				}
			},0)
		},
		"this_psi"(){
			if (!this.this_psi || this.this_psi == "") {
				this.psiShow = false
				this.setSourceCenter()
			} else {
				this.psiShow = false
				this.windowShow = false
				clearTimeout(this.timerOut)
				this.timerOut = setTimeout(()=>{
					this.psiShow = true
					this.setSourceCenter()
				},1)

			}
		}
	},
	mounted(){
		let w = document.body.clientWidth
		let h = document.body.clientHeight
		window.addEventListener('resize',()=>{
			let that = this
			that.clientWidth = document.body.clientWidth
			that.clientHeight = document.body.clientHeight

			// that.psiShow = false
			// that.viewShow = false
			// clearTimeout(this.timerOut)
			// this.timerOut = setTimeout(()=>{
			// 	that.viewShow = true
			// },1)
		})
	},
	methods:{
		infoWindowClose(e) {
			this.this_psi = ''
			this.windowShow = false;
			this.setSourceCenter()
		},
		infoWindowOpen(e) {
			this.windowShow = true
		},
		is_click(item) {
			this.tsCamera_data.camera_psi = item.psi
			this.tsCamera_data.data = item
			if (this.tsCamera_data.camera_psi != this.this_psi) {
				this.windowTitle = item.name
				this.infoWindowOpen()
			} else {
				// this.infoWindowClose()
			}
		},
		is_click_off() {
			this.infoWindowClose()
		},
		this_psi_click(data) {
			this.tsCamera_data.camera_psi = data.psi
			this.windowTitle = data.name
			this.infoWindowOpen()
		},
		handler ({BMap, map}) { // 打开地图，设置中心原点数据
			this.map = map
			this.BMap = BMap
			if (this.data.zoom) {
				this.zoom = this.data.zoom
			}
			if(this.data.center){
				this.center = this.crdFormation(this.data.center)
			}
		},
		setSourceCenter() {  // 回到中心原点
			clearTimeout(this.timerOut)
			this.timerOut = setTimeout(()=>{
				if (!this.windowShow) {
					const point = new this.BMap.Point(this.center.lng,this.center.lat) 
					this.map.panTo(point)
				}
			},1)
		},
		crdFormation(psi) {
			let arr = psi.split(',')
			let obj = {}
			if (arr.length > 1) {
				obj = {
					lng:arr[0],
					lat:arr[1]
				}
			} else {
				obj = {
					lng:0,
					lat:0
				}
			}
			return obj
		},
		open_video() {
			if (this.tsCamera_data.data != {}) {
				// this.infoWindowClose()
				this.$parent.open_vlc(this.tsCamera_data.data)
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#map_camer {
	width:100%;
	height:100%;
	.bm-view {
		width: 100%;
		height: 100%;
	}
	.cont{
		height:100%px;
		.btn_list {
			display: flex; 
			justify-content: center; 
			flex-direction: column;
			height:100%;
			margin-top:10px;
			button {
				margin: 5px;
				display: inline-block;
				border-radius: 3px;
				outline:none;
				box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.5), 0px 1px 2px rgba(0, 0, 0, 0.15);
				background-color: #eeeeee;
				background: linear-gradient(top, #fbfbfb, #e1e1e1);
				display: inline-block;
				vertical-align: middle;
				zoom: 1;
				border: 1px solid #d4d4d4;
				height: 32px;
				line-height: 32px;
				padding: 0px 25.6px;
				font-weight: 300;
				font-size: 14px;
				color: #666666;
				text-shadow: 0 1px 1px white;
				text-decoration: none;
				text-align: center;
			}

			button:hover,button:focus {
				background-color: red;
				background: linear-gradient(top, #ffffff, #dcdcdc);
			}
		}
	}
	

	
}
</style>

<style  lang="less">

</style>
