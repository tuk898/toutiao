<template>
  <!-- 注册用户 -->
  <div class="mask">
    <div class="logout">
      <div class="top">账户登录</div>
      <div class="middle">
        <input type="text" placeholder="账户" v-model="username"/>
        <input type="password" placeholder="密码" v-model="password"/>
      </div>
      
      <div class="bottom">
        <div class="bottom-dl" @click="config">确定</div>
        <div class="bottom-xy">
          <div class="bottom-left">
            登录/注册即表示同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </div>
          <div class="bottom-right">
            <a href="#" @click.prevent.stop="goToUserRegister">注册用户</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { UPDATE_USER_INFO } from '../../../vuex/mutationsType'

export default {
    data() {
        return {
            username:"",
            password:""
        }
  
    },

     methods: {
        //  跳转到登录页
        goToUserRegister:function(){
            this.$router.push({
                name:"usersign"
            })
        },
            // 1.获取输入框的值
           config:function(){
               let password = this.password;
               let username = this.username;
               if(!password || !username){
                  //  console.log(1)
                    this.$message({
                        message:"账号或密码不能为空!"
                    })
                    return false
               }
               this.$axios.post("/loginCheck",{
                   username,
                   password
               })
               .then(res => {
                  //  console.log(res)
                  //  this.$message({
                  //      message:res.msg  
                  //  })
                   this.$router.push({"name":"index"})
                    if(res.status === 0){
              // 登陆成功
              // a. 将用户信息保存到本地 localStorage
              // b. 将用户信息 使用 vuex 存起来 方便实现页面组件间的数据共享
              // c. 跳转到首页
              
              this.$store.commit(UPDATE_USER_INFO,res.wdata)
              // this.$router.push("/"); // 跳转回首页
                      // console.log(UPDATE_USER_INFO)
                     
          }
               })
               .catch(err => err)
           }
        },
};
</script>
<style lang="less" scoped>
* {
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
}
.mask {
  .logout {
     
    width: 440px;
    border: 1px solid #ddd;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    .top {
      height: 60px;
      width: 100%;
      text-align: center;
      line-height: 60px;
      border-bottom: 1px solid #ddd;
    }

    .middle {
      height: 50px;
      line-height: 50px;

      text-align: center;
      input {
        width: 430px;
        border: 1px solid #ddd;
        height: 40px;
        padding: 2px;
        margin-top: 10px;
      }
    }

    .bottom {
      width: 100%;
      .bottom-dl {
        margin-top: 64px;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 5px;
        background-color: #ea4245;
      }

      .bottom-xy {
          display: flex;
          justify-content: space-between;
        .bottom-left {
          a {
               color: blue;
                text-decoration: none;
          }
        }

        .bottom-right {
          a {
               text-decoration: none;
          }
        }
      }
    }
  }
}
</style>