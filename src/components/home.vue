<template>
  <div id="home">

  </div>
</template>

<script>
import {get} from '../api/index'
export default {
  name: "home",
  data(){
    return{

    }
  },
  mounted(){
    this.getDatas();
  },
  methods:{
    getDatas() {
      get().then((res)=>{
        console.log(res)
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
