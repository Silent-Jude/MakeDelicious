<template>

  <div class="app_business">
    <div class="title">
      <div
        class="back"
        @click="goBack"
      >
        <span>&lt;返回</span>
      </div>
      <p class="provider">业务专区</p>
      <i class="icon">
        <i class="navIcon">
          <canvas
            id="point"
            width="44"
            height="20"
          >
          </canvas>
        </i>
        <i
          class="home"
          @click="turnHome"
        >
          <svg
            width="44"
            height="20"
          >
            <circle
              cx="22"
              cy="10"
              r="9"
              stroke-width="2"
              fill="transparent"
              stroke="black"
            ></circle>
            <circle
              cx="22"
              cy="10"
              r="3"
            ></circle>
          </svg>
        </i>
      </i>
    </div>
    <div class="business_variety">
      <i class="icon"></i>
      <span>套餐业务</span>
    </div>
    <div class="business_list">
      <div
        class="business_item"
        v-for="(item,i) of list"
        :key="i"
      >
        <p
          class="item_background"
          :class="{'selected':i===activeIndex}"
          @click="active(i);getData(item)"
        >
          <span>{{item.pname}}</span>
        </p>
      </div>
    </div>
    <div class="desc">
      <p>【资费标准】</p>
      <p>1、套餐包含{{currentItem.talk}}分钟国内通话、{{currentItem.flow}}MB国内流量、来电显示，流量执行不清零规则，国内被叫免费（不含港澳台）</p>
      <p>2、超出套餐包含通话时长后，长市漫一口价0.19元/分</p>
      <p>3、超出套餐流量不足1GB，按0.3元/MB计费，每超出200MB即按照60元/GB计费，以此类推。</p>

    </div>
    <div class="deal_service">
      <p @click="showToast">确认办理</p>
    </div>
    <div
      class="shadow_wrap"
      v-show="isShow"
    >
      <div class="shadow"></div>
      <div class="toast">
        <span
          class="close"
          @click="closeToast"
        >X</span>
        <p class="title">业务办理提示</p>
        <div>
          <p>业务名称：{{currentItem.pname}}</p>
          <p>办理号码：{{this.phone}}</p>
        </div>
        <p
          class="deal"
          @click="Handle"
        >确认办理</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      list: [
        { pname: "新飞享套餐18元档", talk: "30", flow: "100" },
        { pname: "新飞享套餐38元档", talk: "60", flow: "300" },
        { pname: "新飞享套餐58元档", talk: "90", flow: "500" },
        { pname: "新飞享套餐58元档", talk: "90", flow: "500" },
        { pname: "新飞享套餐58元档", talk: "90", flow: "500" },
        { pname: "新飞享套餐58元档", talk: "90", flow: "500" },
        { pname: "新飞享套餐58元档", talk: "90", flow: "500" },
        { pname: "新飞享套餐58元档", talk: "90", flow: "500" },
        { pname: "新飞享套餐58元档", talk: "90", flow: "500" }
      ],
      activeIndex: 0,
      currentItem: {},
      phone: sessionStorage.getItem("phone"),
      isShow: false,
      pid: ""
    };
  },
  methods: {
    closeToast() {
      this.isShow = false;
    },
    showToast() {
      this.isShow = true;
    },
    getData(item) {
      this.currentItem = item;
    },
    active(i) {
      this.activeIndex = i;
    },
    goBack() {
      history.go(-1);
    },
    turnHome() {
      this.$router.push("/home");
    },
    getProduct() {
      this.pid = this.$route.params.pid;
      if (this.pid === "all") {
        this.axios.get(`/user/getAllProducts`).then(res => {
          this.list = res.data;
          console.log(this.list);
          this.getData(this.list[0]);
        });
      } else {
        this.axios.get(`/user/getProduct?pid=${this.pid}`).then(res => {
          this.list = res.data;
          this.getData(this.list[0]);
        });
      }
    },
    //办理业务函数
    Handle() {
      var url = "/user/createOrder";
      var params = this.qs.stringify({
        ophone: this.phone,
        pid: this.currentItem.pid,
        sid: this.currentItem.sid
      });
      this.axios.post(url, params).then(res => {
        console.log(res.data);
        this.closeToast();

        var seconds = 3;
        var mytoast = this.Toast({
          message: `业务办理成功，${seconds}秒后返回首页！`,
          duration: 5000
        });
        var timer = setInterval(() => {
          seconds--;
          if (seconds == 0) {
            clearImmediate(timer);
            this.turnHome();
          }
        }, 1000);
      });
    }
  },
  created() {
    this.getProduct();
  },
  mounted() {
    function point(targetId) {
      var c = document.getElementById("point");
      var ctx = c.getContext("2d");
      ctx.clearRect(0, 0, 44, 20);
      ctx.beginPath();
      ctx.arc(14, 10, targetId == 1 ? 3 : 2, 0, 2 * Math.PI);
      ctx.arc(22, 10, targetId == 2 ? 3 : 2, 0, 2 * Math.PI);
      ctx.arc(30, 10, targetId == 3 ? 3 : 2, 0, 2 * Math.PI);
      ctx.fill();
    }
    point(2);
  }
};
</script>
<style scoped lang="stylus">
@import '../../assets/common/title.styl'
.app_business
  min-height: 700px
.title
  border-bottom: 1px solid #d1d1d1
  .back
    height: 64px
    line-height: 64px
    position: absolute
    top: 50%
    left: 0
    transform: translateY(-50%)
    cursor: pointer
    span
      padding-left: 10px
      letter-spacing: 8px
      font-size: 16px
.business_variety
  padding-top: 20px
  padding-left: 18px
  text-align: left
  i.icon
    display: inline-block
    width: 24px
    height: 24px
    background: url('../../assets/img/order_i_package.png') 0 0 / cover
    vertical-align: sub
  span
    font-size: 18px
.business_list
  border-top: 1px solid #e1e1e1
  margin-left: 18px
  margin-right: 18px
  padding-top: 10px
  margin-top: 10px
  display: flex
  flex-flow: row wrap
  justify-content: space-between
  .business_item
    margin-bottom: 10px
    .item_background
      margin: 0
      width: 105px
      height: 55px
      line-height: 55px
      background: url('../../assets/img/new4G_off.png') 0 0 / cover
      padding-left: 55px
      &.selected
        background: url('../../assets/img/new4G.png') 0 0 / cover
      span
        display: inline-block
        line-height: 16px
        font-size: 16px
        vertical-align: middle
.desc
  font-size: 14px
.deal_service
  position: fixed
  width: 100%
  height: 50px
  line-height: 50px
  top: 620px
  left: 0px
  p
    margin: 0
    background: #0084CF
    color: #fff
    cursor: pointer
.shadow_wrap
  width: 100%
  height: 100%
  position: fixed
  top: 0
  left: 0
  .shadow
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.3)
  .toast
    width: 300px
    background: #fff
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    .close
      width: 30px
      height: 30px
      line-height: 30px
      position: fixed
      top: 5%
      left: 95%
      transform: translate(-100%)
      z-index: 1
      cursor: pointer
    p.title
      margin: 0
      border-bottom: 1px solid #d1d1d1
      height: 50px
      line-height: 50px
    div
      padding: 10px 30px
      p
        font-size: 12px
        text-align: left
    .deal
      color: #7AB7DA
      border: 1px solid #7AB7DA
      width: 100px
      margin: 0 auto
      margin-bottom: 20px
      font-size: 18px
      cursor: pointer
</style>