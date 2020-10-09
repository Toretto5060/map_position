<template>
	<div id="camrea_index">
		<div class="left_map">
			<baidu-map  ref="baidu_map" :data='map_data'></baidu-map>
		</div>
		<div class="right_tab">
			<search-list ref="search_list" :data='cameraList'></search-list>
		</div>
	</div>
</template>
<script>
import BaiduMap from '../components/MapCamera'
import SearchList from '../components/SearchList'
import {index_data} from '../api/index'
export default {
	name: "camrea_index",
	components: { BaiduMap , SearchList },
	data(){
		return{
			cameraList:[],
			map_data:{
				center:'',
				zoom:18,
				camera_list:[],
				position_data:{},
				timeDate: new Date()
			},
			tab: null,
			item: 1,
			tab_list: [],
		}
	},
	watch:{
	
	},
	mounted(){
		this.getData()
	},
	methods:{
		getData() {
			index_data().then((res)=>{
				let data = res.data
				let that = this;
				that.$store.state.machine_num = data.data.length  // navbar 设备数量
				that.map_data.center = data.map_center
				that.map_data.zoom = data.map_zoom

				// 接口参数对接
				let changeList = []
				for (let i = 0; i < data.data.length; i++) {
					let obj = {}
					obj.id = data.data[i].ID
					obj.name = data.data[i].DeviceName
					obj.psi = data.data[i].Location
					obj.addr = data.data[i].DeviceAddress
					obj.type = data.data[i].CameraType
					changeList.push(obj)
				}
				that.map_data.camera_list =  changeList  // 地图点标记列表
				that.cameraList = changeList // 摄像头列表
			})
		},
		tab_select(data) {  // 设置地图当前标点
			this.map_data.position_data = data
			this.map_data.timeDate = new Date()
			this.$refs.baidu_map.this_psi_click(data)
		},
		row_tabColor(row) {
			this.$refs.search_list.setCurrent(row)
		},
		open_vlc(data) {
			window.location.href="RealPlayAndPTZDemo:&"+data.id
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	#camrea_index {
		width:100%;
		height:100%;
		position: relative;
		.left_map {
			width: 80%;
			height: 100%;
		}
		.right_tab {
			width: 20%;
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
			overflow: hidden;
		}
	}
</style>

<style  lang="less">

</style>
