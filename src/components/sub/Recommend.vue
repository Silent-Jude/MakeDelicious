<template>
  <div class="app_recommend">
    <div
      class="set_name"
      v-if="recommend.length>0"
    >
      {{recommend[0].pname}}
    </div>
    <div class="data">
      <div class="flow">
        <p
          class="curent_flow"
          v-if="recommend.length>0"
        >{{avgs.flow}}M</p>
        <div class="rec_set">
          <p v-if="recommend.length>0">{{recommend[0].flow}}M</p>
        </div>
      </div>
      <div class="talk">
        <p
          class="current_talk"
          v-if="recommend.length>0"
        >{{avgs.talk}}分钟</p>
        <p
          class="rec_talk"
          v-if="recommend.length>0"
        >{{recommend[0].talk}}分钟</p>
      </div>
    </div>
    <img
      class="deal"
      src="@/assets/img/H5_button_img_10@2x.png"
      :data-pid="recommend.length>0?recommend[0].pid:0"
      @click="dealBusiness"
    >
  </div>
</template>

<script>
import Bus from "../../assets/js/bus.js";

export default {
  data() {
    return {
      avgs: {},
      firstRec: ""
    };
  },
  computed: {
    recommend() {
      //bus总线接收avgs数据，放在这里是因为此时确保已经接收到了。
      Bus.$on("busAvgs", val => {
        this.avgs = val;
      });
      return this.$store.state.recommend;
    }
  },
  watch: {},
  methods: {
    dealBusiness(e) {
      var pid = e.target.dataset.pid;
      if (pid > 0) {
        this.$router.push(`/business/${pid}`);
      }
    }
  },
  created() {}
};
</script>
<style scoped  lang="stylus">
.app_recommend
  width: 17.25rem
  height: 15.55rem
  background: url('../../assets/img/H5_background_img_4@2x.png') no-repeat 0 0 / contain
  margin: 20px auto
  position: relative
  .set_name
    text-align: center
    font-size: 18px
    font-weight: 600
    color: #371590
    width: 165px
    height: 42px
    position: absolute
    top: 47px
    left: 92px
  .data
    width: 238px
    height: 88px
    position: absolute
    top: 149px
    left: 77px
    display: flex
    flex-direction: column
    justify-content: space-between
    p
      margin: 0
    .flow
      font-size: 12px
      color: #E2854A
      height: 60px
      line-height: 60px
      font-weight: 700
      display: flex
      justify-content: space-between
      .curent_flow
        width: 90px
      .rec_set
        padding: 5px
        text-align: center
        width: 140px
        height: 50px
        line-height: 50px
        p
          display: inline-block
          line-height: 20px
          vertical-align: middle
    .talk
      font-size: 12px
      color: #952E88
      height: 26px
      line-height: 26px
      font-weight: 700
      display: flex
      justify-content: space-between
      .current_talk
        width: 90px
      .rec_talk
        width: 150px
  .deal
    width: 230px
    height: 38px
    position: absolute
    top: 255px
    left: 50%
    transform: translate(-50%)
    cursor: pointer
</style>