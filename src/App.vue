<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import sockjs from 'sockjs'
    export default {
        data(){
            return {

            }
        }
    }
</script>
<style>
    .footer {
        /*position: absolute;*/
        /*top: 97%;*/
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #aebdc9;
    }
    .footer .dot {
        margin: 0 3px;
    }
    a{
        color: #aebdc9;
        text-decoration:none;
    }
    a:hover{
        text-decoration:underline;
        color:#20A0FF;
    }
</style>

