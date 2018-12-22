<template>

  <div class="app_store">
    <div class="title">
      <div
        class="back"
        @click="goBack"
      >
        <span>&lt;返回</span>
      </div>
      <p class="provider">店铺详情</p>
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
    <mt-swipe :auto='4000'>
      <mt-swipe-item
        v-for="(item,i) of banners"
        :key="i"
      >
        <img :src="item">
      </mt-swipe-item>
    </mt-swipe>
    <div class="info">
      <div class="store_name">
        <div class="title">
          <i class="storeIcon"></i>
          <span>店铺名称</span>
        </div>
        <div class="desc_wrap">
          <p class="desc">{{list[0].sname}}</p>
        </div>
      </div>
      <div class="store_desc">
        <div class="title">
          <i class="storeIcon"></i>
          <span>店铺介绍</span>
        </div>
        <div class="desc_wrap">
          <p class="desc">{{list[0].sdes}}</p>
        </div>
      </div>
      <div class="store_phone">
        <div class="title">
          <i class="storeIcon"></i>
          <span>店长号码</span>
        </div>
        <div class="desc_wrap">
          <p class="desc">{{list[0].sphone}}</p>
        </div>
      </div>
      <div class="store_address">
        <div class="title">
          <i class="storeIcon"></i>
          <span>店铺地址</span>
        </div>
        <div class="desc_wrap">
          <p class="desc">{{list[0].address}}</p>
        </div>
        <p class="contact">
          联系店长
        </p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          banner1: "http://onekey.applinzi.com/img/store/banner_1.png",
          banner2: "http://onekey.applinzi.com/img/store/banner_2.png",
          id: "1",
          sname: "中国移动华阳阳路营业厅中国移动华阳阳路营业厅",
          desc:
            "中国移动官方网站为您提供业务介绍,手机话费充值查询,套餐资费介绍及网上查询办理,号码购买,优惠购机,积分查询,优惠活动等网上自助服务。",
          sphone: 13244578524,
          saddress: "123123"
        }
      ],
      banners: []
    };
  },
  methods: {
    turnHome() {
      console.log(123);
      this.$router.push("/home");
    },
    goBack() {
      history.go(-1);
    }
  },
  created() {
    var sid = this.$route.params.sid;
    console.log(sid);
    var url = `/user/getStore?sid=${sid}`;
    this.axios.get(url).then(res => {
      console.log(res.data);
      this.list = res.data;
    });
    this.banners.push(this.list[0].banner1);
    this.banners.push(this.list[0].banner2);
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
@import '../assets/common/title.styl'
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
.mint-swipe
  height: 150px
  img
    width: 375px
    height: 150px
div.info
  padding-right: 10px
  div.store_name
    display: flex
    // justify-content: space-between
    div.title
      width: 100px
      height: 60px
      line-height: 60px
      flex: 0 0 100px
      i.storeIcon
        display: inline-block
        width: 20px
        height: 20px
        line-height: 20px
        background: url('../assets/img/i_store_shop_active.png') 0 0 / cover
        vertical-align: sub
      span
        white-space: nowrap
        font-size: 16px
        color: #414141
    div.desc_wrap
      padding-left: 10px
      height: 60px
      line-height: 60px
      p.desc
        display: inline-block
        line-height: 20px
        text-align: left
        font-size: 14px
        color: #999999
        vertical-align: middle
  div.store_desc
    display: flex
    // justify-content: space-between
    div.title
      width: 100px
      height: 90px
      line-height: 90px
      flex: 0 0 100px
      i.storeIcon
        display: inline-block
        width: 20px
        height: 20px
        line-height: 20px
        background: url('../assets/img/order@2x.png') 0 0 / cover
        vertical-align: sub
      span
        white-space: nowrap
        font-size: 16px
        color: #414141
    div.desc_wrap
      padding-left: 10px
      height: 90px
      line-height: 90px
      p.desc
        display: inline-block
        line-height: 20px
        text-align: left
        font-size: 14px
        color: #999999
        vertical-align: middle
  div.store_phone
    display: flex
    div.title
      width: 100px
      height: 60px
      line-height: 60px
      i.storeIcon
        display: inline-block
        width: 26px
        height: 26px
        line-height: 20px
        background: url('../assets/img/info_i_phone.png') 0 0 / cover
        vertical-align: sub
      span
        white-space: nowrap
        font-size: 16px
        color: #414141
    div.desc_wrap
      height: 60px
      line-height: 60px
      p.desc
        display: inline-block
        margin: 0
        padding-left: 10px
        height: 20px
        line-height: 20px
        text-align: left
        font-size: 14px
        color: #999999
        vertical-align: middle
  div.store_address
    display: flex
    justify-content: space-between
    div.title
      width: 100px
      height: 60px
      line-height: 60px
      flex: 0 0 100px
      i.storeIcon
        display: inline-block
        width: 20px
        height: 20px
        line-height: 20px
        background: url('../assets/img/info_i_address.png') 0 0 / cover
        vertical-align: sub
      span
        white-space: nowrap
        font-size: 16px
        color: #414141
    div.desc_wrap
      flex: 0 0 160px
      height: 60px
      line-height: 60px
      text-align: left
      p.desc
        display: inline-block
        line-height: 20px
        text-align: left
        font-size: 14px
        color: #999999
        vertical-align: middle
    p.contact
      flex: 0 0 82px
      align-self: center
      margin: 0
      width: 76px
      height: 25px
      line-height: 25px
      border: 1px solid #0084CF
      font-size: 12px
      border-radius: 100px
      color: #0084CF
</style>