<template>
  <div class="app_consume">
    <div
      class="detail"
      v-if="$store.getters.getLogInfo"
    >
      <p class="title">您目前的消费情况</p>
      <div class="info">
        <div class="logInfo">
          <span>当前账号：<span class="tel">13277924031</span></span>
          <span
            class="logout"
            @click="logout"
          ></span>
        </div>
        <p>当前套餐：预付费4G尊享套餐38元档次全asdsadsadsadsadsadsad35465465464565654国流量不限量高端大气上档次会员尊享版</p>
        <p>当前服务店铺：一级代理商</p>
        <p>店长手机号：13277854214</p>
      </div>
    </div>
    <div
      class="no_detail"
      v-else
    >
      <p>您暂未登录，请先登录</p>
      <img
        class="login"
        src="@/assets/img/H5_button_img_3@2x.png"
        @click="login"
      >
    </div>
    <div class="data">
      <p class="title">近三个月月均使用情况</p>
      <p class="remind">(仅供参考，实际发生费用以账单为准)</p>
      <div class="cost">
        <div class="flow">
          <p v-if="$store.getters.getLogInfo">100M</p>
          <p v-else>——</p>
        </div>
        <div class="talk">
          <p v-if="$store.getters.getLogInfo">1000分钟</p>
          <p v-else>——</p>

        </div>
        <div class="charge">
          <p v-if="$store.getters.getLogInfo">500元</p>
          <p v-else>——</p>
        </div>
      </div>

      <div class="latest">
        <p>近五个月月均消费情况</p>
        <canvas
          id="latest_canvas"
          width="315"
          height="100"
        ></canvas>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { m: 1, num: 30 },
        { m: 2, num: 40 },
        { m: 3, num: 50 },
        { m: 4, num: 60 },
        { m: 5, num: 70 }
      ]
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    login() {
      
      this.$emit("login");
    }
  },
  mounted() {
    var canvas = document.getElementById("latest_canvas");
    var brush = canvas.getContext("2d");

    brush.lineWidth = 2;
    brush.fillStyle = "#4b2e95";
    brush.strokeStyle = "#4b2e95";

    brush.beginPath();
    brush.moveTo(10, 84);

    brush.lineTo(10, 1);
    brush.stroke();
    brush.lineTo(15, 10);
    brush.lineTo(5, 10);
    brush.lineTo(10, 0);
    brush.fill();
    // brush.clearRect(0, 0, 315, 100);

    brush.moveTo(10, 83);
    brush.lineTo(315, 83);
    brush.stroke();
    brush.lineTo(305, 88);
    brush.lineTo(305, 78);
    brush.lineTo(315, 83);
    brush.clearRect(313, 0, 2, 100);
    brush.fill();

    for (var i in this.list) {
      var w = 25;
      var h = this.list[i].num;
      var x = 34 + 56 * i;
      var y = 83 - h;
      brush.beginPath();
      brush.fillRect(x, y, w, h);
    }

    for (var i in this.list) {
      brush.font = "12px 黑体 bold";
      var str = this.list[i].num;
      var w = brush.measureText(str).width;
      var h = this.list[i].num + 20;
      var x = 34 + i * 56 - w / 2 + 12;
      var y = 100 - h;
      brush.fillText(str, x, y);
    }

    for (var i in this.list) {
      brush.font = "12px 黑体 bold";
      var str = this.list[i].m + "月";
      var w = brush.measureText(str).width;
      var x = 34 + i * 56 - w / 2 + 12;
      var y = 99;
      brush.fillText(str, x, y);
    }
    brush.fillText("单位：GB", 20, 11);
  }
};
</script>
<style scoped lang="stylus">
.app_consume
  width: 17.25rem
  height: 22.9rem
  background: url('../assets/img/H5_background_img_2@2x.png') no-repeat 0 0 / contain
  margin: 20px auto
  font-size: 0.65rem
  .detail
    height: 8rem
    padding: 0.5rem
    .title
      font-family: PingFangSC-Medium
      font-size: 0.7rem
      font-weight: 700
      color: #7B6E9C
      letter-spacing: 0
      margin: 0
    .info
      font-size: 0.65rem
      color: #7B6E9C
      letter-spacing: 0
      text-align: left
      p
        margin: 0.5rem 0
      .logInfo
        height: 1rem
        line-height: 1rem
        margin: 0.5rem 0
        display: flex
        justify-content: space-between
        .tel
          color: #ED792F
        .logout
          display: inline-block
          width: 3.25rem
          height: 1rem
          background: url('../assets/img/H5_button_img_2@2x.png') no-repeat 0 0 / cover
          cursor: pointer
  .no_detail
    height: 8rem
    padding: 0.5rem
    p
      font-weight: 600
      margin-top: 26px
      font-size: 18px
      color: #7B6E9C
    .login
      width: 200px
      margin-top: 24px
      cursor: pointer
  .data
    font-size: 0.75rem
    color: #7B6E9C
    letter-spacing: 0
    margin: 0.6rem
    .title
      margin: 0
      font-weight: 700
    .remind
      margin-top: 0
      font-size: 0.6rem
    .cost
      display: flex
      justify-content: space-between
      .flow, .talk, .charge
        font-weight: 700
        width: 5rem
        height: 2.67rem
        p
          padding-top: 0.5rem
      .flow
        color: #E2854A
        background: url('../assets/img/H5_parts_img_2@2x.png') no-repeat 0 0 / cover
      .talk
        color: #4B2E95
        background: url('../assets/img/H5_parts_img_3@2x.png') no-repeat 0 0 / cover
      .charge
        color: #952E88
        background: url('../assets/img/H5_parts_img_4@2x.png') no-repeat 0 0 / cover
</style>