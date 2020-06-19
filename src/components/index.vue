<template>
<!-- index首页 -->
    <el-container>
        <el-header style="padding:0;" >
            <my-header></my-header>
        </el-header>
        <el-container>
            <el-aside width="170px" class="leftAside">
                <my-nav></my-nav>
            </el-aside>
            <el-main>
                <my-main></my-main>
                <my-list></my-list>
            </el-main>
            <el-aside width="400px" class="rigthAside">
                <my-user></my-user>
            </el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import MyHeader from './header'//顶部导航栏
    import MyNav from './Nav/Nav'//中间左边部分"今日头条"
    import MyUser from './User/User' //中间右边搜索栏
    import MyMain from './News/News' //中间中间内容
    import MyList from '../components/News/NewsListDetail'//刷新
    export default {
        name: 'index',
        components: {
            MyNav,
            MyUser,
            MyHeader,
            MyMain,
            MyList
        },
    }
</script>

<style>
    
    .el-main {
        min-width: 660px;
    }
    .el-input__inner{
        font-weight: 100;
    }
</style>