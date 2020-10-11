<template>
  <div id="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="图片显示失败" title="this is you avatar">
      </div>
      <!-- ------------------------------------ -->
      <el-form ref="form" label-width="50px" label-position="center" hide-required-asterisk :model="user" :rules="user_form_rules" size="medium" class="user_form">
        <el-form-item label="账号" prop="username" >
          <el-input placeholder="请输入账号" class="username" ref="values1" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" class="password" ref="values2" v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="form_btn">
          <el-button type="primary" :plain="true" native-type="submit" size="medium" @click="user_login">登录</el-button>
          <el-button type="danger" :plain="true" native-type="reset" size="medium" @click="reset_info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: 'admin',
        password: '123456',
        plain: true
      },
      user_form_rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度为3-10位字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度为3-10位字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async user_login () {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        const res = await this.$axios.post('login', this.user)
        console.log(res.data.meta.status)
        if (res.data.meta.status !== 200) {
          console.log(123)
          this.$message({
            message: res.data.meta.msg,
            type: 'warning'
          })
        } else {
          this.$notify({
            title: '欢迎回来,' + this.user.username + '!',
            message: res.data.meta.msg,
            type: 'warning'
          })
          // console.log(res.data.data.token)
          localStorage.setItem('token', res.data.data.token)
          this.$router.push('/index')
        }
      })
    },
    reset_info () {
      if (!(this.$refs.values1.value && this.$refs.values2.value)) {
        this.$message({
          message: '无可重置的表单,请直接输入账号密码!',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '已重置表单, 请重新输入账号和密码!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  #login_container{
    height: 100%;
    background-color: #075072b9;
    overflow: hidden;
    position: relative;
    .login_box {
      width: 450px;
      height: 300px;
      background-color: #ccc;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 3px;
      transform: translate(-50%, -50%);
      .avatar_box{
        width: 130px;
        height: 130px;
        border-radius: 50%;
        padding: 5px;
        background-color: #f7f7f7;
        border: 1px solid #999;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user_form {
        width: 100%;
        margin-top: 120px;
        padding-right: 40px;
        // 因为组件默认是content-box, 是怪异盒子,需要设置boder-box盒模型
        box-sizing: border-box;
        /deep/.username :focus {
          outline: none;
          border: 0;
        }
        /deep/.password :focus {
          outline: none;
          border: 0;
        }
      }
      .form_btn {
        float: right;
        padding-right: 40px;
      }
    }
  }
</style>
