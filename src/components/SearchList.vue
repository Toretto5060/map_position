<template>
	<div id="search_list">
		<div class="search">
			<el-input v-model="search_input" @input="search_list" placeholder="全部"></el-input>
			<span>查询到{{tableData.length}}台设备</span>
		</div>
		<div class="list">
			<el-table
				:data="tableData"
				:show-header=false
				style="width: 100%"
				@row-click="select_row"
				>
				<el-table-column
					prop="img"
					label="摄像头类型"
					highlight-current-row=true
					>
					<!--插入图片链接的代码-->
					<template slot-scope="scope">
						<img  :src="(scope.row.type ? face_img : car_plate_img)" alt="" style="width: 40px;height: 40px">
					</template>
				</el-table-column>
				<el-table-column
					prop="name"
					label="摄像头名称"
					>
					<template slot-scope="scope">
						<div>
							<span class="camera_title">名称:{{scope.row.name}}</span>
							<span>地址:{{scope.row.addr}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="operation"
					label="操作">
					<!--插入图片链接的代码-->
					<template slot-scope="scope">
						<el-button type="text" @click="open_video(scope.row)">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
export default {
	name: "search_list",
	components: {},
	props:['data'],
	data(){
		return {
			car_plate_img:require('../assets/car.png'),
			face_img:require('../assets/people.png'),
			search_input:'',
			tableData: [],
			search_listData:[]
		}
	},
	watch:{
		'data'() {
			this.tableData = this.data
		}
	},
	mounted(){
		this.tableData = this.data
	},
	methods:{
		open_video(data) {
			this.$parent.open_vlc(data)
		},
		select_row(row, column, event) {
			this.$parent.tab_select(row)
		},
		search_list() {
			if (this.search_input == "") {
				this.tableData = this.data
				return
			}
			this.search_listData = []
			for(let i = 0; i < this.tableData.length; i++){
				if (this.tableData[i].name.indexOf(this.search_input) > -1) {
					let obj = this.tableData[i]
					this.search_listData.push(obj)
				}
			}
			this.tableData = this.search_listData
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	#search_list {
		position: relative;
		width: 100%;
		height: 100%;
		.search {
			width: 100%;
			height: 5vw;
			margin: auto;
			span {
				display: block;
				float: right;
			}
		}
		.list {
			height: ceil(100%-10vw);
			overflow: auto;
			.camera_title {
				display: block;
				white-space:nowrap;
			}

		}
	}
</style>

<style  lang="less">

</style>
