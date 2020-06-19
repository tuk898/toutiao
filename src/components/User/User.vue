<template>
  <!-- index页面user模块 -->

  <div class="newsList">
    <div class="newlist">
      <!-- 搜索开始 -->
      <div class="ss-newList">
        <input type="text" placeholder="搜索站内资讯,视频或用户" />
        <div class="btn">搜索</div>
      </div>
      <!-- 搜索结束 -->
      <!-- 登入开始 -->
      <div class="dl">
        <div class="dl-list" v-if="!userInfo.oauth_token">
          <div class="dl-newsList">
            <div class="pinglun">登录后可以保存您的浏览喜好,评论,收藏,并于APP同步更可以发布微头条</div>
            <div class="bbtn" @click.stop="goToUserLogin">登录</div>
          </div>
        </div>
        <div v-else class="tt-index-login">
          <div class="top" @click="logout">退出登录</div>
          <div class="middle">
            <img :src="userInfo.avator" alt />
            <div class="nickname">{{userInfo.nickname}}</div>
          </div>
          <div class="bottom">
            <div class="bottom-left">
              <div class="cont">{{userInfo.tt_count}}</div>
              <div class="text">头条数</div>
            </div>
            <div class="bottom-right">
              <div class="cont">{{userInfo.article_count}}</div>
              <div class="text">文章数</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 登入结束 -->
    </div>
  </div>
</template>

<script >
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import { UPDATE_USER_INFO } from '../../../vuex/mutationsType'
export default {
  data() {
    return {};
  },
  methods: {
    // 点击退出接口
      logout:function(){
        this.$axios.post("/logout").then(res =>{
          this.$message({
            message:res.msg
          })
          this.$store.commit(UPDATE_USER_INFO,{})
        })
       
      },
    // 跳转到登录页
    goToUserLogin: function() {
      this.$router.push({
        path: "/login"
      });
    }
  },
  computed: {
    // 从vuex中获取用户数据
    userInfo: function() {
    return this.$store.state.userInfo;
     
    }
    
  }
};
</script>

<style lang='less' scoped>
.newsList {
  .newlist {
    .ss-newList {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px;
      input {
        height: 40px;
        width: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid #ddd;
        text-indent: 15px;
        background: #f5f6f7;
      }

      .btn {
        text-align: center;
        line-height: 42px;
        width: 60px;
        height: 42px;
        color: white;
        background: #428bd9;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }

    .dl {
      height: 100%;
      width: 100%;
      .dl-list {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f4f5f6;
        height: 240px;
        width: 360px;
        margin: 0 auto;
        padding-bottom: 20px;

        .dl-newsList {
          height: 200px;
          width: 300px;
          margin-top: 20px;
          background-color: white;

          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;

          .pinglun {
            margin-bottom: 20px;
          }

          .bbtn {
            background: #e43c46;
            width: 200px;
            height: 35px;
            border-radius: 5px;
            text-align: center;
            color: white;
            line-height: 35px;
          }
        }
      }
      .tt-index-login {
        background: #f4f5f6;
       
        width: 100%;
        
        .top {
          margin: 10px 10px 0 0;
            text-align: right;
            color:red;
        }   

        .middle {
          
          margin-top: 50px;
          text-align: center;
           
          img {
            height:60px;
            width: 60px;
            border-radius: 50%;
          }

          .nickname {
            text-align: center;
            margin-top: 15px;
          }
        }

        .bottom {
          display: flex;
          margin-top: 20px ;
          justify-content: space-around;
          align-items: center;
           
          .bottom-left {
            height: 50px;
            width: 100px;
            .cont {
              text-align: center;
            }

            .text {
              color: red;
              text-align: center;
            }
          }

          .bottom-right {
            height: 50px;
            width: 100px;
            .cont {
              text-align: center;
            }

            .text {
              color: red;
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>