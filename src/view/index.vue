<template>
	<div id="index">
		<div class="left_map">
			<baidu-map></baidu-map>
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
				console.log(res)
				let data = res.data
				let that = this;
		
				//tab 数据转换
				that.items = []
				let tab_title = [{name:'车牌',data:'plate'},{name:'人脸',data:'person'}]
				for (let i in tab_title) {
					let obj = {}
					obj.tab = tab_title[i].name
					obj.content = data[tab_title[i].data]
					that.tab_list.push(obj)
				}
				
				console.log(that.tab_list)
				
				// 存在记录的所有摄像头坐标获取
				that.get_camera_list(data)

			})
		},
		get_camera_list(data) {
			let that = this

			// that.cameraList.push(data.plate[0].camera)
			// // 存在记录的所有摄像头坐标获取
			// for (let i = 0; i < data.plate.length; i++) {
			// 	data.plate.forEach(item=>{
			// 		if(item.camera.psi != that.cameraList[i].psi){
			// 			that.cameraList.push(data.plate[i].camera)
			// 		}
			// 	})
			// 	// if (that.cameraList.indexOf(data.plate[i].camera.psi) < 0) {
			// 	// 	that.cameraList.push(data.plate[i].camera)
			// 	// }
			// }


			// for (let i in data.person) {
			// 	if (that.cameraList.indexOf(data.person[i].position) < 0) {
			// 		that.cameraList.push(data.person[i].position)
			// 	}
			// }

			console.log(that.cameraList)
		},
		itemClick(data) {
			console.log(data)
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
