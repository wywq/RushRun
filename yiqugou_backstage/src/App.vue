<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view />
  </div>
</template>
<script>
	export default {
		created(){
			if(!sessionStorage.getItem('token')){
				this.$router.push('/login')
			}
		}

	}
</script>
<style>

#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
}
#nav {
  
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-drawer :focus {
        outline: 0 !important;
}
</style>
