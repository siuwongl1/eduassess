<template>
  <div id="app">
        <div class="app_content">
            <login></login>
        </div>
  </div>
</template>

<script>
import login from './components/Login.vue';

export default {
    name:'app',
    data(){
        return {
        }
    },
    components:{
        login
    }
}
</script>
<style>
    .app_content {
        position: absolute;
        top: 20%;
        width: 100%;
        text-align: center;
    }
</style>

