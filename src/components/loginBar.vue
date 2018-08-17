<template>
  <div class="login">
    <div class='userInfo' v-if="currentUser">
      🎉用户名：{{ currentUser.username}}
      <button class="pure-button button-xsmall" @click="signOut()">
        <i class="fas fa-sign-out-alt"></i>
        注销
      </button>
    </div>
    <div class='inputBox' v-else>
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a href="#" class="pure-menu-link" @click="actionType = 'login'">登录</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link" @click="actionType = 'signUp'">注册</a></li>
        </ul>
      </div>

      <div class="pure-form">
        <section v-if="actionType === 'login'">
          <label for="">帐号</label>
          <input type="text" v-model="formData.account">
          <label for="">密码</label>
          <input type="password" v-model="formData.password">
          <button class="pure-button" type="submit" @click="login()">
            <i class="fas fa-sign-in-alt"></i>
            登录
          </button>
        </section>
        <section v-else>
          <label for="">帐号</label>
          <input type="text" v-model="formData.account">
          <label for="">密码</label>
          <input type="password" v-model="formData.password">
          <button class="pure-button" type="submit" @click="signUp()">
            <i class="fas fa-user-plus"></i>
            注册
          </button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import AV from "../lib/leancloud";
import pure from "../assets/pure-min.css"
export default {
  data() {
    return {
      formData: {
        account: "",
        password: ""
      },
      actionType: "login",
      currentUser: null
    };
  },
  methods: {
    signUp() {
      let user = new AV.User();
      user.setUsername(this.formData.account);
      user.setPassword(this.formData.password);
      user.signUp().then(function(user) {
        this.currentUser = this.getCurrentUser();
      });
    },
    login() {
      AV.User.logIn(this.formData.account, this.formData.password).then(
        user => {
          this.currentUser = this.getCurrentUser();
          this.$emit("hello", this.currentUser);
        },
        function(error) {
          console.log(error);
        }
      );
    },
    getCurrentUser() {
      let { id, createdAt, attributes: { username } } = AV.User.current();
      return { id, createdAt, username };
    },
    signOut() {
      AV.User.logOut();
      this.currentUser = null;
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.login {
  text-align: center;
}
.userInfo {
  font-size: 18px;
}

.button-xsmall {
  font-size: 80%;
}
</style>


