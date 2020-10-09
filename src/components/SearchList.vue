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
				ref="singleTable"
				@row-click="select_row"
				style="width:100%"
				highlight-current-row
    			@current-change="handleCurrentChange"
				>
				<el-table-column
					prop="img"
					label="摄像头类型"
					width="50"
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
							<!-- <span class="camera_title" :title="scope.row.name">名称:{{scope.row.name}}</span> -->
							<span class="camera_title" :title="scope.row.name" v-html="'名称：' + fullName(scope.row.name)"></span>
							<span  :title="scope.row.addr">地址:{{scope.row.addr}}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column
					prop="operation"
					label="操作"
					width="80"
					>
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
	computed: {
    	fullName() {
			return (name)=>{
				if (name.indexOf(this.search_input) > -1 && this.search_input != "") {
					console.log(name)
					console.log(this.search_input)
					return '<div style="color:red;">'+ this.search_input + '</div>'
				}else if (this.search_input == "") {
					return name
				}
			}
		}
	},
	data(){
		return {
			car_plate_img:require('../assets/car.png'),
			face_img:require('../assets/people.png'),
			search_input:'',
			tableData: [],
			search_listData:[],
			tab_color:false
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
		 handleCurrentChange(val) {
			this.currentRow = val;
		},
		open_video(data) {
			this.$parent.open_vlc(data)
			console.log(1)
		},
		select_row(row, column, event) {
			this.select_row = 0
			this.$parent.tab_select(row)
		},
		setCurrent(row) {
			this.$refs.singleTable.setCurrentRow(row);
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
				padding:0.5vw 1vw 0.5vw 1vw;
			}
		}
		.list {
			width: 100%;
			height: ceil(100%-10vw);
			-webkit-user-select:none;
			-moz-user-select:none;
			-ms-user-select:none;
			user-select:none;
			.camera_title {
				display: block;
				white-space:nowrap;
				overflow: hidden;
				text-overflow:ellipsis;
			}

		}
	}
</style>

<style  lang="less">
#search_list {
	.el-table__row {
		cursor: pointer;
	}
	/* 用来设置当前页面element全局table 选中某行时的背景色*/
	.el-table__body tr.current-row > td{
		background-color:rgba(0,0,0,0.3) !important;
		color: #fff;
	}
}

</style>
