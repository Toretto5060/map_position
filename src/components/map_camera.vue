<!--
data:{
	center:'',   // 地图中心点
	zoom:0,			// 缩放倍数
	camera_list:[], // 摄像头分布数据 [{name:''   //摄像头名称  ,psi:''  // 经纬度}]
	map_position:{}  // 当前标记摄像头  {name:'',psi:''  同上},
	timeDate:new Data()  // 当前时间
},
-->
<template>
	<div id="map_camer">
		<baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" v-if="viewShow">
			<div  v-if="positionList">
				<div  v-for="(item,index)  in (data.camera_list ? data.camera_list : [])" :key="index">
					<bm-marker @click="is_click(index)" :position="crdFormation(item.psi)" animation="BMAP_ANIMATION_DROP" :icon="{url:icon.url,size:{width:icon.size[0],height:icon.size[1]}}"></bm-marker>
				</div>
			</div>
			<bm-marker :position="crdFormation(this_psi)"  animation="BMAP_ANIMATION_DROP" v-if="psiShow"></bm-marker>
		</baidu-map>
	</div>
</template>

<script>
export default {
	name: "map_camer",
	props:['data'],
	data(){
		return{
			viewShow:true,
			psiShow:false,
			positionList:true,
			this_psi:'',
			center: {lng: 121.481977, lat: 31.235682},
			zoom: 11,
			icon:{
				url:require('../assets/camer.png'),
				size:[32,32],
			},
			cameraList:[],
			timerOut:null
		}
	},
	watch:{
		"data.timeDate"() {
			this.this_psi = ""
			clearTimeout(this.timerOut)
			this.timerOut = setTimeout(()=>{
				this.this_psi = this.data.map_position.psi
			},1)
		},
		"this_psi"(){
			if (!this.this_psi || this.this_psi == "") {
				this.psiShow = false
			} else {
				this.psiShow = false
				clearTimeout(this.timerOut)
				this.timerOut = setTimeout(()=>{
					this.psiShow = true
				},1)
			}
		}
	},
	mounted(){
		window.addEventListener('resize',()=>{
			let that = this
			that.viewShow = false
			that.psiShow = false
			clearTimeout(this.timerOut)
			this.timerOut = setTimeout(()=>{
				that.viewShow = true
			},1)
		})
	},
	methods:{
		is_click(index) {
			
		},
		handler ({BMap, map}) {
			if (this.data.zoom) {
				this.zoom = this.data.zoom
			}
			if(this.data.center){
				this.center = this.crdFormation(this.data.center)
			}
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
}
</style>

<style  lang="less">

</style>
