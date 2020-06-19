<template>
  <!-- 首页中的头部 -->
  <div class="nav">
    <div class="nav-box">
      <div class="nav-left">
        <div class="item-left">下载APP</div>
        <div class="item-left">注册头条号</div>
        <div class="item-left" >
            <div v-if="weatherData">
                <span>{{weatherData.city + " "}}</span>
                <span>{{weatherData.forecast[0].type + " "}}</span>
                <span>{{weatherData.forecast[0].high.substr(3)+"/"}}</span>
                <span>{{weatherData.forecast[0].low.substr(3)}}</span>
                <i class="el-icon-arrow-down icon" @click="switchCity($event)" ref="btn"></i>
            </div>
        </div>
        <div class="item-left">
             <input type="text" v-model="city" @keyup.enter="showweat" placeholder="请输入内容" @blur="setbtn" ref='cityInput'>
        </div>
      </div>
      <div class="nav-right">
        <div class="item-right">侵权投诉</div>
        <div class="item-right">头条产品</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
          weatherData:"" ,
          city:"",
          flag:"" 
        }
    },
    created() {
        this.$axios.get('http://wthrcdn.etouch.cn/weather_mini?city=北京市').then(res=>{
            this.weatherData = res.data
        })
    },
    
    methods: {
        switchCity(e){
            e.target.style='transform: rotateZ(-90deg);'
            this.flag = true
        },
        showweat(){
            if (!this.city)  
                return
            this.$axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' +this.city)
            .then((res)=>{
                if (res.data){
                    this.weatherData =res.data
                }else{
                     this.$message('输出有误')
                }
              this.setbtn()
              this.city =''
            })
           
        },
    setbtn(){
        this.$refs.btn.style ='transform:rotateZ(0deg)'
        this.flag =false
    }
    },
};
</script>

<style lang='less' scoped>
.nav {
  .nav-box {
      height: 60px;
      width: 100vw;
      background-color: #e7eaed;
      display: flex;
      justify-content: space-between;
    .nav-left {
        color: #b0c9e7;
        font-size: 16px;
        display: flex;
        line-height: 60px;
        text-align: center;

      .item-left {
          margin-left:35px ;
        
         input{
             height: 30px;
             width: 100px;
             line-height: 30px;
             text-align: center;
             background-color:#b0c9e7 ;
             border: none;
            
         }
      }
    }

    .nav-right {
        color: #b0c9e7;
        font-size: 16px;
        display: flex;
        line-height: 60px;
        text-align: center;
      .item-right {
          margin-right: 35px;
          
      }
    }
  }

}
 .icon{
             transition: all 0.3;
             
         }
</style>