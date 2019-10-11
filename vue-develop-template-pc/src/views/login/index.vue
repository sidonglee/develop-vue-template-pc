<template>
    <div id="login">
        <!--<a href="javascript:void(0)" @click="logining">登录入口</a>-->
        <img src="/static/img/login/login.png" alt="" class="loginImg"/>
        <div class="box">
            <img src="/static/img/login/title.png" alt="" class="title"/>
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="usercode">
                    <img src="/static/img/login/user.png" alt=""/>
                    <el-input v-focus v-model="form.usercode" placeholder="请输入账号" class="usercode"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <img src="/static/img/login/mima.png" alt=""/>
                    <el-input v-model="form.password" v-on:keyup.native.enter="logining" type="password" placeholder="请输入密码" class="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="logining">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import login from './server/login-mixin'

    export default {
        name: 'login-page',
        mixins: [login]
    }
</script>

<style lang="less">
    /*a{*/
    /*position: absolute;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*}*/
    #login {
        width: 80%;
        margin: 0 auto;
        height: 100%;
        position: relative;
        min-width: 800px;
        .box {
            position: absolute;
            width: 440px;
            right: 50px;
            top: 25%;
            .el-form {
                width: 90%;
                margin: 0 auto;
                .el-form-item {
                    margin-bottom: 50px;
                    position: relative;
                    img{
                        position: absolute;
                        left: 0;
                        top: 7px;
                        display: block;
                        z-index: 3;
                        height: 26px;
                    }
                }
                .el-button {
                    width: 100%;
                }
                .el-input {
                    input {
                        border-width: 0 0 1px 0;
                        border-radius: 0;
                        padding-left: 60px;
                    }
                }
            }
            .title {
                display: block;
                width: 80%;
                margin: 0 auto 60px;
            }
        }
        .loginImg {
            display: block;
            position: absolute;
            width: 30%;
            top: 25%;
            left: 50px;
        }
    }
</style>
