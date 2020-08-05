<template>
	<div id="map_camer">
		<baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" v-if="viewShow">
			<div  v-for="(item,index)  in cameraList" :key="index">
				<bm-marker @click="is_click(index)" :position="fuc.crdFormation(item.psi)" animation="BMAP_ANIMATION_DROP" :icon="{url:icon.url,size:{width:icon.size[0],height:icon.size[1]}}"></bm-marker>
			</div>
			
			<bm-marker :position="fuc.crdFormation(this_psi)"  animation="BMAP_ANIMATION_DROP" v-if="psiShow"></bm-marker>
		</baidu-map>
	</div>
</template>

<script>
export default {
	name: "map_camer",
	data(){
		return{
			viewShow:true,
			psiShow:false,
			this_psi:'',
			center: {lng: 121.481977, lat: 31.235682},
			zoom: 11,
			icon:{
				url:require('../assets/camer.png'),
				size:[32,32],
			},
			cameraList:[
				{
					psi:'121.504997,30.960305',
					name:'摄像头1'
				},{
					psi:'121.503923,30.960478',
					name:'摄像头'
				},{
					psi:'121.506358,30.961192',
					name:'摄像头3'
				},{
					psi:'121.502109,30.961078',
					name:'摄像头4'
				},{
					psi:'121.506345,30.962812',
					name:'摄像头5'
				},
				{
					psi:'121.504192,30.961617',
					name:'摄像头6'
				},{
					psi:'121.506638,30.961495',
					name:'摄像头7'
				}
			],
			timerOut:null
		}
	},
	watch:{
		"this_psi"(){
			if (this.this_psi == "") {
				this.psiShow = false
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
			let that = this
			clearTimeout(that.timerOut)
			that.psiShow = false
			that.this_psi = this.cameraList[index].psi
			that.timerOut = setTimeout(()=>{
				that.psiShow = true
			},30)
		},
		handler ({BMap, map}) {
			this.center.lng = 121.504192
			this.center.lat = 30.961617
			this.zoom = 19
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
