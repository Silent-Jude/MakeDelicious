<template>
  <div class="app_home">
    <div
      class="shadow_wrap"
      :class="{'hide':cancelLog}"
    >
      <div class="shadow"></div>
      <div
        class="login"
        v-if="!$store.getters.getLogInfo"
      >
        <div
          class="close"
          @click="cancel"
        >x</div>
        <p>登录</p>
        <div class="logInfo">
          <div class="phone">
            <label>手机号
              <input
                type="text"
                id="phone"
                placeholder="请输入手机号"
                v-model="phone"
                @blur="checkPhone"
                maxlength="11"
              >
              <span
                class="icon"
                :class="{'right':isPhone,'err':!isPhone}"
                v-show="showIcon"
              ></span>
              <span class="warn">{{warnMessage}}</span>
            </label>
          </div>
          <div class="msg">
            <label>验证码
              <input
                type="text"
                id="msg"
                placeholder="请输入验证码"
                v-model="msg"
                @focus="clearErr"
              >
            </label>
            <span
              id="getMsg"
              :class="{'disabledMsg':disabledMsg,'useableMsg':!disabledMsg}"
              @click="getMsg"
            >获取验证码</span>
          </div>
        </div>
        <p class="warnMsg">{{warnMsg}}</p>
        <img
          class="submit"
          src="@/assets/img/H5_button_img_16@2x.png"
          @click="login"
        >

      </div>
      <div
        class="ensure"
        v-else
      >
        <p>确定退出登录？</p>
        <div class="btns">
          <button
            class="cancel"
            @click="cancel"
          >取消</button>
          <button
            class="exit"
            @click="logout"
          >确定退出</button>
        </div>
      </div>
    </div>
    <div class="bg_header">
      <i>&lt;</i>
      <span>一键省钱</span>
    </div>
    <div class="banner"></div>
    <div
      class="my_order"
      @click="orderCenter"
    ></div>
    <consume
      @login="orderCenter"
      @logout="show"
      :phone='$store.getters.getCurrentPhone'
    ></consume>
    <recommend :phone='$store.getters.getCurrentPhone'></recommend>
    <other-recommend></other-recommend>
  </div>
</template>

<script>
import consume from "./sub/Consume.vue";
import recommend from "./sub/Recommend.vue";
import otherRecommend from "./sub/otherRecommend.vue";

export default {
  name: "HelloWorld",
  components: {
    consume,
    recommend,
    otherRecommend
  },
  data() {
    return {
      showIcon: false,
      phone: "",
      warnMessage: "",
      disabledMsg: false,
      isPhone: false,
      cancelLog: false,
      msg: "",
      warnMsg: ""
    };
  },
  computed: {
    islogin() {
      if (this.$store.getters.getLogInfo) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {},
  created() {
    //根据session中的phone值，判断是否设置vuex中的登录手机号。
    if (sessionStorage.getItem("phone")) {
      // this.islogin = true;
      this.$store.commit("changeUserStatus", sessionStorage.getItem("phone"));
    }
    //根据登录状态判断是否开始显示登录模态框。
    if (this.islogin) {
      this.cancelLog = true;
    } else {
      this.cancelLog = false;
    }
  },
  mounted() {},
  methods: {
    checkPhone() {
      //显示icon
      this.showIcon = true;
      //这里只简单判断手机号是否合法。
      var reg = /^1[35789]\d{9}$/;
      if (reg.test(this.phone)) {
        //ok
        this.isPhone = true;
        this.warnMessage = "";
      } else {
        this.isPhone = false;
        this.warnMessage = "请输入11位手机号！";
      }
    },
    getMsg() {
      //获取验证码函数，控制60秒发送时间。
      if (this.isPhone) {
        //ok,send!
        this.disabledMsg = true;
        var getMsg = document.getElementById("getMsg");
        var seconds = 60;
        getMsg.innerHTML = `${seconds}s后重新发送`;
        var timer = setInterval(() => {
          seconds--;
          getMsg.innerHTML = `${seconds}s后重新发送`;
          if (seconds == -1) {
            this.disabledMsg = false;
            getMsg.innerHTML = "获取验证码";
            clearInterval(timer);
          }
        }, 1000);
        //这里写发送验证码请求
        var url = "user/getmsg";
        var params = { phone: this.phone };
        this.axios.post(url, this.qs.stringify(params)).then(res => {
          console.log(res.data);
          console.log(res);
          console.log("验证码发送成功！");
          if (res.data.code == -2) {
            this.Toast({
              message: res.data.msg,
              duration: 3000
            });
          }
        });
      }
    },
    login() {
      this.warnMsg = "";
      var reg = /^\d{5}$/;
      if ((this.isPhone && reg.test(this.msg)) || this.msg == 888) {
        var url = "user/login";
        this.axios
          .post(url, `phone=${this.phone}&msg=${this.msg}`)
          .then(res => {
            sessionStorage.setItem("phone", res.data[0].phone);
            this.$store.commit(
              "changeUserStatus",
              sessionStorage.getItem("phone")
            );
            this.cancelLog = true;
            this.isPhone = false;
          });
      } else {
        this.checkPhone();
        this.warnMsg = "验证码错误";
      }
    },
    cancel() {
      this.cancelLog = true;
    },
    show() {
      this.phone = "";
      this.msg = "";
      this.showIcon = false;
      this.cancelLog = false;
    },
    orderCenter() {
      this.phone = "";
      this.msg = "";
      this.showIcon = false;
      if (this.islogin) {
        //转到订单中心
        this.$router.push("/orderCenter");
      } else {
        this.cancelLog = false;
      }
    },
    clearErr() {
      this.warnMsg = "";
    },
    logout() {
      sessionStorage.removeItem("phone");
      this.$store.commit("changeUserStatus", null);
      this.phone = "";
      this.msg = "";
      this.showIcon = false;
      location.reload();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="stylus" >
.disabledMsg
  border: 1px solid #E6E6E6
  pointer-events: none
  color: #E6E6E6
.useableMsg
  border: 1px solid #ED792F
  color: #ED792F
.hide
  display: none
.app_home
  width: 100%
  height: 70rem
  background: #4b2e95
  .shadow_wrap
    .shadow
      position: fixed
      width: 100%
      height: 100%
      background: #000
      z-index: 2
      opacity: 0.7
    .login
      width: 300px
      height: 198px
      background: #fff
      border-radius: 10px
      position: fixed
      z-index: 3
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      .close
        width: 24px
        height: 24px
        border: 1px solid #fff
        border-radius: 50%
        color: #fff
        position: absolute
        top: -20%
        left: 100%
        transform: translate(-100%)
        z-index: 3
        cursor: pointer
      p
        font-size: 17px
        font-weight: 600
        color: #6A6A6A
      .logInfo
        font-size: 15px
        font-weight: 600
        color: #6A6A6A
        width: 280px
        margin: 0 auto
        text-align: left
        input
          color: #ed792f
          border: none
          outline: none
          width: 88px
          height: 20px
          opacity: 0.8
        .icon
          display: inline-block
          width: 17px
          height: 17px
          vertical-align: sub
        .right
          background: url('../assets/img/icon.png') 0 -453px
        .err
          background: url('../assets/img/icon.png') 0 -296px
        .warn
          color: red
          font-size: 12px
          font-weight: normal
        .msg, .phone
          padding-bottom: 6px
          padding-top: 6px
          border-bottom: 1px solid #CDCDCD
          #getMsg
            padding: 2px
            border-radius: 5px
            font-size: 15px
      .warnMsg
        margin: 5px
        font-size: 12px
        color: red
        height: 16px
      .submit
        width: 200px
        height: 37px
        cursor: pointer
    .ensure
      width: 300px
      height: 198px
      background: #fff
      border-radius: 10px
      position: fixed
      z-index: 3
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      display: flex
      flex-direction: column
      p
        font-size: 24px
        color: #6A6A6A
        margin-bottom: 40px
      .btns
        display: flex
        justify-content: space-around
        button
          width: 100px
          height: 37px
          border: 3px solid #4B2E95
          border-radius: 100px
          outline: none
          border: 2px solid
          cursor: pointer
        .cancel
          background: #fff
          font-size: 15px
          color: #4B2E95
        .exit
          background: #4B2E95
          font-size: 15px
          color: #fff
  .bg_header
    background: url('../assets/img/H5_background_img_1@2x.png') no-repeat 0 0 / cover
    font-size: 0.9rem
    color: #ffffff
    width: 100%
    height: 2.9rem
    line-height: 2.9rem
    position: relative
    i
      position: absolute
      left: 0
      padding-left: 5%
      cursor: pointer
  .banner
    height: 9.35rem
    background: url('../assets/img/H5_parts_img_1@2x.png') no-repeat 0 0 / cover
  .my_order
    width: 3.35rem
    height: 1.45rem
    background: url('../assets/img/H5_button_img_1@2x.png') no-repeat 0 0 / cover
    position: fixed
    top: 3.75rem
    left: 100%
    transform: translateX(-100%)
    cursor: pointer
    z-index: 1
</style>
