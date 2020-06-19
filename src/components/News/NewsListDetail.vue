<template>
<!-- 刷新 -->
    <div class="newsDetail">
        <div class="new-list" @click.stop="refresh">点击刷新----</div>
        <div class="item-list" v-for="article in articles" :key="article.nid">
            <div class="left" v-if="article.img">
                <img :src="article.img" alt=""/>
            </div>
            <div class="right">
                <div class="wz">{{article.title}}</div>
                <div class="yohu">
                    <img :src="article.user.avator" alt="">
                    <div class="mz">{{article.user.nickname}}</div>
                </div>
                <div class="sj">{{article.created_at}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              lastid:0,// 最新一条咨询id
              articles:[]//文章列表
            }
        },
        methods: {
            refresh:function(){
                this.$axios
                .post("/getArticles",{
                    lastid: this.lastid
                })
                .then(res =>{
                    // console.log(res)
                    this.articles = (res.articles||[]).concat(this.articles)
                    if(this.articles.length>0){
                        this.lastid = this.articles[0].nid
                    }
                })
                
            }
        },
        mounted() {
              this.$axios
      .post("/getArticles", {
        lastid: this.lastid
      })
      .then(res => {
        console.log(res);

        this.articles = res.articles || [];
        if (this.articles.length > 0) {
          // 获取最后一条文章或头条的 id
          this.lastid = this.articles[0].nid;
        }
      });
        },
    }
</script>

<style lang='less'>
  .newsDetail {
    
  .new-list {
      height: 40px;
      width: 100%;
      background-color: #7cdcfe;
      text-align: center;
      line-height: 40px;
      border-radius:4px ;
  }

  .item-list {
      margin-top: 10px;
      
     border-bottom: 1px solid #ddd;
        display: flex;
    .left {
        margin: 10px;
      img {
          height: 100px;
          width: 150px ;
      }
    }

    .right {
        margin-top: 10px;
      .wz {
          margin-bottom: 10px;
      }

      .yohu {
        img {
            height: 30px;
            width: 30px;
            border-radius: 50%;
        }

        .mz {

        }
      }

      .sj {

      }
    }
  }
}
</style>