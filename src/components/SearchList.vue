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
							<div class="camera_title" :title="scope.row.name" v-html="'名称:' + filterMark(scope.row.name)"></div>
							<div  :title="scope.row.addr"  v-html="'地址:' + filterMark(scope.row.addr)"></div>
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
    	filterMark() {
			return (name)=>{
				if (name.indexOf(this.search_input) > -1 && this.search_input != "") {
					let search_index = name.split(this.search_input)
					let txt_index = name.indexOf(this.search_input)
					let out_text = ""
					if (txt_index == 0 && search_index.length > 1) {
						return   '<span style="color:red">' + this.search_input + '</span>' + search_index[1]
					} else if (txt_index > 0  && search_index.length > 1) {
						return   search_index[0] + '<span style="color:red">' + this.search_input + '</span>' + search_index[1]
					} else {
						return  name
					}
				}else {
					return name
				}
			}
		},
	},
	data(){
		return {
			car_plate_img:require('../assets/car.png'),
			face_img:require('../assets/people.png'),
			search_input:'',
			tableData: [],
			search_name_list:[],
			search_addr_list:[],
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
			this.search_name_list = []
			this.search_addr_list = []
			for(let i = 0; i < this.data.length; i++){
				if (this.data[i].name.indexOf(this.search_input) > -1) {
					let obj = this.data[i]
					this.search_name_list.push(obj)
				}
				if (this.data[i].addr.indexOf(this.search_input) > -1) {
					let obj = this.data[i]
					this.search_addr_list.push(obj)
				}
			}
			let newArr =  this.search_name_list.concat(this.search_addr_list)
			this.tableData = this.fuc.deWeight(newArr)
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
