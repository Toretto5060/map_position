<template>
	<div id="index">
		<div class="navbar">
			<nav-bar :num = $store.state.machine_num></nav-bar>
		</div>
		<div class="content">
			<router-view/>
		</div>
	</div>
</template>
<script>
import NavBar from '../components/NavBar'
export default {
	name: "index",
	components: {NavBar},
	data(){
		return{
		}
	},
	watch:{
	},
	mounted(){
	
	},
	methods:{
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	#index{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		.navbar {
			width: 100%;
			height: 8%;
		}
		.content {
			width: 100%;
			height: 92%;
		}
	}
</style>

<style  lang="less">

</style>
