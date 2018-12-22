<template>
  <div class="app_consume">
    <div
      class="detail"
      v-if="$store.getters.getLogInfo"
    >
      <p class="title">您目前的消费情况</p>
      <div class="info">
        <div class="logInfo">
          <span>当前账号：<span class="tel">{{phone}}</span></span>
          <span
            class="logout"
            @click="logout"
          ></span>
        </div>
        <p>当前套餐：{{userInfo.pname}}</p>
        <p>当前服务店铺：{{userInfo.sname}}</p>
        <p>店长手机号：{{userInfo.sphone}}</p>
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
      <div class="avgDate">
        <p class="title">近五个月月均使用情况</p>
        <p class="remind">(仅供参考，实际发生费用以账单为准)</p>
        <div class="cost">
          <div
            class="flow"
            @click="showDate('this.details[i].flow','#E2854A','GB')"
          >
            <p v-if="$store.getters.getLogInfo">{{avgs.flow | getInteger}}M</p>
            <p v-else>——</p>
          </div>
          <div
            class="talk"
            @click="showDate('this.details[i].talk','#4B2E95','分钟')"
          >
            <p v-if="$store.getters.getLogInfo">{{avgs.talk|getInteger}}分钟</p>
            <p v-else>——</p>

          </div>
          <div
            class="charge"
            @click="showDate('this.details[i].cost','#952E88','元')"
          >
            <p v-if="$store.getters.getLogInfo">{{avgs.cost}}元</p>
            <p v-else>——</p>
          </div>
        </div>
      </div>

      <div class="detailDate">
        <div class="reminder">
          <i class="pointer"></i>
          <p>点击上方以查询近五个月消费情况</p>
        </div>
        <canvas
          id="latest_canvas"
          width="315"
          height="130"
        ></canvas>
      </div>
    </div>

  </div>
</template>

<script>
import Bus from "../../assets/js/bus.js";
export default {
  props: ["phone"],
  data() {
    return {
      userInfo: {
        pname: "",
        sname: "",
        sphone: ""
      },
      details: [],
      avgs: {},
      recommend: [],
      firstRec: {}
    };
  },
  watch: {
    phone(current, old) {
      if (current) {
        this.getUserInfo();
      } else {
      }
    }
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    login() {
      this.$emit("login");
    },
    getUserInfo() {
      if (this.$store.getters.getLogInfo) {
        this.axios
          .post("/user/getUserInfo", this.qs.stringify({ phone: this.phone }))
          .then(res => {
            this.userInfo = res.data[0];
            // console.log(this.userInfo);
            // console.log(res.data[0]);
          });
        this.getAvg();
        this.getDetails();
      }
    },
    getAvg() {
      this.axios.post("/user/getAvg", `phone=${this.phone}`).then(res => {
        this.avgs = res.data[0];
        this.setRec();
        //通过bus总线，发送用户月均数据到推荐组件。
        this.sendAvgs();
      });
    },
    getDetails() {
      this.axios
        .post("/user/getDetail", this.qs.stringify({ phone: this.phone }))
        .then(res => {
          this.details = res.data;
          this.showDate("this.details[i].flow", "#E2854A", "GB");
        });
    },
    showDate(item, color, unit) {
      if (this.phone) {
        var canvas = document.getElementById("latest_canvas");
        var brush = canvas.getContext("2d");
        var maxRate = 1;
        var minRate = 1;
        brush.clearRect(0, 0, 315, 130);

        brush.lineWidth = 2;
        brush.fillStyle = color;
        brush.strokeStyle = color;

        brush.beginPath();
        brush.moveTo(10, 114);

        brush.lineTo(10, 1);
        brush.stroke();
        brush.lineTo(15, 10);
        brush.lineTo(5, 10);
        brush.lineTo(10, 0);
        brush.fill();
        // brush.clearRect(0, 0, 315, 100);

        brush.moveTo(10, 113);
        brush.lineTo(315, 113);
        brush.stroke();
        brush.lineTo(305, 118);
        brush.lineTo(305, 108);
        brush.lineTo(315, 113);
        brush.clearRect(313, 0, 2, 150);
        brush.fill();

        //对传入的数据进行最大值预处理，找出最大值，避免柱状图超标。
        for (var i in this.details) {
          while (eval(item) * maxRate > 100) {
            maxRate *= 0.9;
          }
          while (eval(item) * minRate < 10) {
            minRate *= 1.3;
            // console.log(minRate);
          }
        }

        for (var i in this.details) {
          var w = 25;
          var h = parseFloat(eval(item).toFixed(1)) * maxRate * minRate;
          // if (h >= 100) {
          //   h *= 0.9;
          // }
          // console.log(h);
          var x = 34 + 56 * i;
          var y = 113 - h;
          brush.beginPath();
          brush.fillRect(x, y, w, h);
        }

        for (var i in this.details) {
          brush.font = "12px 黑体 bold";
          var str = parseFloat(eval(item).toFixed(1));
          var w = brush.measureText(str).width;
          var h = parseFloat(eval(item).toFixed(1)) * maxRate * minRate + 20;
          var x = 34 + i * 56 - w / 2 + 12;
          var y = 130 - h;
          brush.fillText(str, x, y);
        }

        for (var i in this.details) {
          brush.font = "12px 黑体 bold";
          var str = this.details[i].month + "月";
          var w = brush.measureText(str).width;
          var x = 34 + i * 56 - w / 2 + 12;
          var y = 129;
          brush.fillText(str, x, y);
        }
        brush.fillText(`单位：${unit}`, 20, 11);
      } else {
        this.login();
      }
    },
    setRec() {
      //这里取值1m流量0.01分
      var f_price = this.avgs.flow * 0.01;
      //这里取值1分钟通话0.1元
      var t_price = this.avgs.talk * 0.1;
      if (f_price > t_price) {
        this.axios.post("user/getRecFlow", `phone=${this.phone}`).then(res => {
          //多个模块需要用到推荐列表，将推荐列表数据放到vuex中去。
          this.$store.commit("setRecommend", res.data);
        });
      } else {
        this.axios.post("user/getRecTalk", `phone=${this.phone}`).then(res => {
          //多个模块需要用到推荐列表，将推荐列表数据放到vuex中去。
          this.$store.commit("setRecommend", res.data);
        });
      }
    },
    sendAvgs() {
      Bus.$emit("busAvgs", this.avgs);
    }
  },
  created() {
    this.getUserInfo();
  },
  mounted() {}
};
</script>
<style scoped lang="stylus">
.app_consume
  width: 17.25rem
  height: 22.9rem
  background: url('../../assets/img/H5_background_img_2@2x.png') no-repeat 0 0 / contain
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
          background: url('../../assets/img/H5_button_img_2@2x.png') no-repeat 0 0 / cover
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
    .avgDate
      margin-top: -30px
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
          background: url('../../assets/img/H5_parts_img_2@2x.png') no-repeat 0 0 / cover
        .talk
          color: #4B2E95
          background: url('../../assets/img/H5_parts_img_3@2x.png') no-repeat 0 0 / cover
        .charge
          color: #952E88
          background: url('../../assets/img/H5_parts_img_4@2x.png') no-repeat 0 0 / cover
    .detailDate
      .reminder
        margin-top: 20px
        height: 30px
        line-height: 30px
        margin-bottom: 10px
        i.pointer
          display: inline-block
          width: 20px
          height: 30px
          line-height: 30px
          vertical-align: top
          background: url('../../assets/img/point.png') 0 0 / cover
        p
          margin: 0
          display: inline-block
</style>