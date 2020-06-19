<template>
  <!--中间左边部分"今日头条" -->
  <div class="tt-list">
      <div class="list-box">
          <div class="toutiao" >今日头条</div>
          <div class="navlist">
            <div class="item-tt"  v-for="item,index in navs" :key="index" >{{item}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        navs:['推荐','西瓜视频','热点','直播','图片','科技','娱乐','游戏','体育','懂车帝','财经','搞笑','更多']
      }
    },
};
</script>

<style lang='less' scoped>
.tt-list {
  text-align: center;
  .list-box {
      margin-left: 20px;
     width: 150px;
    
    .toutiao {
       
     text-align: center;
     line-height: 50px;
     height: 50px;
      font-size: 30px;
      color: #e43c46;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .navlist {
      
      .item-tt{
        font-size: 20px;
        margin-bottom: 20px;
         transition: all 0.5s;
      }
       .item-tt:hover{
       color: white;
         height: 35px;
         background:  #e43c46;
         border-radius: 5px;
         line-height: 35px;
       }
    }
  }
}
</style>