import Vue from 'vue'
import App from './App.vue'
import router from '../router/router'
import store from '../vuex/store'
import './plugins/element'
import axios from 'axios'

Vue.config.productionTip = false
let loading
axios.defaults.baseURL='//tt.linweiqin.com/api/tt/'
axios.interceptors.request.use(config =>{
  console.log(config)
  loading = Vue.prototype.$loading({
    text: '加载数据中……',
    background: 'rgba(0, 0, 0, 0.8)',
    spinner:"el-icon-loading",
  })
  console.log(config.data)
  let data = config.data || {};
    //1. 获取用户本地数据
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))||{};
    // 2. 获取 token数据
    let oauth_token = userInfo["oauth_token"]||"";
    //3. 将token添加到 config.data 里面中
    if(oauth_token)
      data["oauth_token"] = oauth_token;
      console.log( data["oauth_token"])
    config.data = data;

  return config
})
Vue.prototype.$axios=axios
axios.interceptors.response.use(req=>{
  loading.close()
  return req.data
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')