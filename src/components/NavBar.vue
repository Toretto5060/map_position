<template>
	<div id="nav">
		<div class="nav-title">
			监控设备管理平台
		</div>

		<div class="nav-date">
			<p>
				<span class="head_title">当前日期</span>
				<span>{{week}}</span>
				<span>{{date}}</span>
			</p>
			<p>
				<span class="head_title">设备数量</span>
				<span>{{(num ? num  : '0')}}台</span>
			</p>
		</div>
	</div>
</template>
<script>

export default {
	name: "index",
	components: {},
	data(){
		return{
			week:'星期日',
			date:'xxxx.xx.xx'
		}
	},
	props:['num'],
	watch:{
	},
	mounted(){
		this.update_time()
		setInterval(() => {
			if (this.fuc.get_date().m == 0 && this.fuc.get_date().h == 0) {
				this.update_time()
			}
		}, 1000);
	},
	methods:{
		update_time() {
			let now_time = this.fuc.get_date()
			this.week = '星期' + now_time.week
			this.date = now_time.Y +'.'+ (now_time.M > 9 ? now_time.M : "0"+now_time.M)+'.' + (now_time.D > 9 ? now_time.D : "0"+now_time.D)
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	#nav {
		width: 90%;
		height: 100%;
		font-size: 1.4vw;
		margin: auto;
		position: relative;
		.nav-title {
			width: 50%;
			position: relative;
			top:50%;
  			transform:translateY(-50%);
		}
		.nav-date {
			width: 60%;
			height: 100%;
			position: absolute;
			right: 0;
			top: 0;
			font-size: 1.1vw;
			p {
				display: inline-block;
				position: relative;
				top:50%;
				transform:translateY(-50%);
				span{
					display: block;
					float: left;
				}
				.head_title {
					width: 3vw;
				}
			}
			p:nth-child(2) {
				// width: 40%;
				text-align: right;
				float: right;
				span:nth-child(2) {
					margin-left: 1vw;
					margin-top: 0.8vw;
				}
			}
			p:nth-child(1) {
				width: 9vw;
				margin-left: 2%;
				float: right;
			}

		}
	}
</style>

<style  lang="less">

</style>
