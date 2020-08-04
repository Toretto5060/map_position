<template>
	<div id="index">
		<baidu-map class="bm-view" :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" v-if="viewShow">
			<div  v-for="(item,index)  in cameraList" :key="index">
				<bm-marker :position="fuc.crdFormation(item.psi)" :dragging="true" animation="BMAP_ANIMATION_DROP" :icon="{url:icon.url,size:{width:icon.size[0],height:icon.size[1]}}"></bm-marker>
			</div>
			<bm-marker :position="{lng:0, lat: 0}" :dragging="true" animation="BMAP_ANIMATION_DROP"></bm-marker>
		</baidu-map>
	</div>
</template>

<script>
export default {
	name: "index",
	data(){
		return{
			viewShow:true,
			center: {lng: 121.481977, lat: 31.235682},
			zoom: 11,
			icon:{
				url:require('../assets/camer.png'),
				size:[32,32],
			},
			cameraList:[{
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
			},]
		}
	},
	mounted(){
		window.addEventListener('resize',()=>{
			let that = this
			that.viewShow = false
			setTimeout(()=>{
				that.viewShow = true
			},1)
		})
	},
	methods:{
		handler ({BMap, map}) {
			this.center.lng = 121.504192
			this.center.lat = 30.961617
			this.zoom = 18
		},
		
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#index {
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
