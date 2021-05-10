<template>
  <div class="home">
    {{$store.state.username}}
    <el-button type="primary" @click="logoff">退出</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import {state} from '../store'
export default {
  name: 'Home',
  components: {
  },
  methods:{
    logoff(){
      this.$store.commit('set_info',{
        username:"",
        token:""
      })
      this.$router.replace({name:"Login"})
    }
  },
  // beforeRouteEnter(to,form,next){
    
  // }
}
</script>
