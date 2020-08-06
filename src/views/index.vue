<template>
	<div id="index">
		<div class="left_map">
			<baidu-map :data='map_data'></baidu-map>
		</div>
		<div class="right_tab">
			<v-tabs
				v-model="tab"
				fixed-tabs
				center-active

			>
				<v-tab
					v-for="item in tab_list"
					:key="item.tab"
				>
					{{ item.tab }}
				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="tab">
				<v-tab-item
					v-for="item in tab_list"
					:key="item.tab"
				>
					<v-list dense>
						<v-list-item-group color="primary">
							<v-list-item
								v-for="(list, i) in item.content"
								:key="i"
								@click="itemClick(list)"
							>
								<v-list-item-content>
									<v-list-item-title> {{list.plate}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-tab-item>
			</v-tabs-items>
		</div>
	</div>	
</template>
<script>
import BaiduMap from '../components/map_camera'
import {index_data} from '../api/index'
export default {
	name: "index",
	components: { BaiduMap },
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
				
				that.map_data.center = data.map_center
				that.map_data.zoom = data.map_zoom

				//tab 数据转换
				that.items = []
				let tab_title = [{name:'车牌',data:'plate'},{name:'人脸',data:'person'}]
				for (let i in tab_title) {
					let obj = {}
					obj.tab = tab_title[i].name
					obj.content = data[tab_title[i].data]
					that.tab_list.push(obj)
				}
							
				//存在记录的所有摄像头坐标获取
				that.get_camera_list(data)
			})
		},
		get_camera_list(data) {
			let that = this
			let camera_list = []

			// 存在记录的所有摄像头坐标获取
			for (let i in data.plate) {
				camera_list.push(data.plate[i].camera)
			}
			for (let i in data.person) {
					camera_list.push(data.person[i].camera)
			}
			
			that.map_data.camera_list =  that.fuc.deWeight(camera_list)
		},
		itemClick(data) {
			this.map_data.position_data = data
			this.map_data.timeDate = new Date()
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	#index {
		width:100%;
		height:100%;
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
		}
	}
</style>

<style  lang="less">

</style>
