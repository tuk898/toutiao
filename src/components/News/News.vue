<template>
  <!-- index的中间部分 -->
  <div class="main">
    <div class="main-content">
      <div class="content-top">
        <div
          @click="swithchTab(tab.id)"
          :class="['item-left',{'active':tab.id==activeTab}]"
          v-for="tab in tabs"
          :key="tab.id"
        >{{tab.text}}</div>
      </div>
      <!-- 发留言部分开始 -->
      <div class="tab-content">
        <div class="content-toutiao" v-show="activeTab=='1'">
          <textarea name id cols="30" v-model="tt_content" rows="10" placeholder="有什么新鲜事想告诉大家"></textarea>
          <div class="bottom-toutiao">
            <div class="left">
              <div class="left-title" @click.stop="toggleUploadArea">图片</div>
              <div class="upload-imgs" v-show="showUploadImgArea">
                <div class="upload">
                  <div class="title">+</div>
                  <input type="file" @change="handleImgsUpload" accept=".jpg, .png" />
                </div>
                 <!-- 上传的图片的地方开始 -->
                <div class="img-item" v-for="(img,index) in uploadImgs" :key="img">
                  <img :src="img" alt />
                  <div class="deleteImg" @click.stop="deleteImg(index)">X</div>
                </div>
                 <!-- 上传的图片的地方结束 -->
              </div>
            </div>
            <div class="right" @click.stop="publishTT">发布</div>
          </div>
        </div>
        <div class="content-liuyan" v-show="activeTab=='2'">
          <input type="text" v-model="article_title" placeholder="请输入内容" />
          <vue-editor 
          id="editor"
          use-custom-image-hander
          @image-add="handerImageAdded"
          v-model="richContent"
          class="rich-editor"
          />
          <div class="right-push" @click.stop="publishArticle">发布</div>
        </div>
      </div>
      <!-- 发留言部分结束 -->
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
    components:{
        VueEditor

    },
  data() {
    return {
        
      tabs: [
        { id: "1", text: "发头条" },
        { id: "2", text: "写文章" }
      ],
      article_title:"",
      tt_content:"",
      activeTab: "1",
      showUploadImgArea:false, //隐藏
      uploadImgs:[],
      richContent:""//富文本编辑器的内容值
    };
  },
  methods: {
    // 发布头条
    publishTT:function(){
      let content = this.tt_content;
      if(!content){
        this.$message({
          message:"头条内容不能为空"
        })
        return false
      }
      this.$axios
      .post("/createTT",{
        content: content,
        imgs:this.uploadImgs.join(",")
      })
      .then(res =>{
        this.$message({
          message:res.msg
        })
      })
      .catch(err => err)
    },

    //   发布文章文章
        publishArticle:function(){
          if (!this.article_title||!this.richContent) {
            this.$message({
              message:"标题不能为空"
            })
            return false
          }
          this.$axios.post("/createArticle",{
            content: this.richContent,
            img:"",
            title:this.article_title
          })
          .then(res =>{
            this.$message({
              message:res.msg
            })
          })
        },
    //   图片删除
    deleteImg:function(index){
        this.uploadImgs.splice(index, 1);
    },
    // 图片接口
    handerImageAdded:function(file,Editor){
        var forData = new FormData()
        forEach.append = ("file",file);
        this.$axios.post("/aliossUpload",formData).then(res =>{
            let url = res.url;
           Editor.insertEmbed(cursorLocation,"image",url)
             
        })
    },
    //   文件上传
       handleImgsUpload:function(e){
            // console.log(e)
        Array.from(e.target.files).forEach(f=>{
            // 1.构造请求参数
            // {file:文件的数据}
            let params = new FormData();
            params.append("file",f);
            // 2.发请求
             this.$axios.post("/aliossUpload",params).then(res=>{
                 this.uploadImgs.push(res.url)
                //  console.log(res.url)
             })
        })
        // console.log(f)
       },
    //   切换是否显示
    toggleUploadArea:function(){
        this.showUploadImgArea = !this.showUploadImgArea
    },
    // 跳转发头条,写文章信息
    swithchTab: function(id) {
      this.activeTab = id;
    }

  },

};
</script>

<style lang='less' >

.main {
    margin-bottom: 120px;
  // height: 300px;
  width: 100%;
  border: 1px solid #ddd;

  .main-content {
    .content-top {
      display: flex;
      height: 40px;
      border-bottom: 1px solid #ddd;
      font-weight: 500;

      .item-left {
        margin-left: 20px;
        height: 40px;
        width: 60px;
        text-align: center;
        line-height: 40px;
      }
      .active {
        color: #89bbff;
        border-bottom: 2px solid #f18d8d;
      }
    }
    .tab-content {
      .content-toutiao {
        textarea {
          height: 200px;
          width: 100%;
          resize: none;
          background-color: #f4f5f6;
          border: 0;
        }

        .bottom-toutiao {
          display: flex;
          justify-content: space-between;

          .left {
              position: relative;
            .left-title {
                   height: 50px;
            line-height: 50px;
           
            font-size: 16px;
            }

            .upload-imgs {
                   margin-top: 5px;  
                 background-color: #fff;
            display: flex;
            flex-wrap: wrap;
            width: 300px;
            position: absolute;
              .upload {
                   position: relative;
              width: 100px;
              height: 100px;
                .title {
                  font-size: 50px;
                line-height: 100px;
                text-align: center;
                width: 100px;
                height: 100px;
                border: 1px dashed #ddd;
                font-weight: 100;
                }

                input {
                    opacity: 0;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;  
                }
              }
               .img-item {
           
              width: 100px;
              height: 100px;
              position: relative;
              img {
                height: 100%;
                width: 100px;
              }
              .deleteImg {
                display: none;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              &:hover {
                background-color: #7f7f7f;
                opacity: 0.8;
                transition: all 0.5s;
                .deleteImg {
                  color: white;
                  display: block;
                }
              }
            }
            }
          }

          .right {
              width: 100px;
              height: 50px;
              line-height: 50px;
               text-align: center;
          color: white;
          font-size: 16px;
          background: #ed8b8e;
              
          }
        }
      }

      .content-liuyan {
         
        input {
            height: 40px;
            width: 100%;
            border: 0px;
        }

        vue-editor#editor.rich-editor {
        
        }
          .right-push {
           
              height: 50px;
              width: 100px;
              background-color: #ea4245;
              text-align: center;
              line-height: 50px;
              float: right;
              color: white;
          }
      }
    }
  }
}
</style>